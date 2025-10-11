# 1. Configure the Azure Provider
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

# 2. Resource Group (RG) - The container for all resources
resource "azurerm_resource_group" "rg" {
  name     = "${var.project_prefix}-rg-${random_id.rg_suffix.hex}"  # Ensures uniqueness
  location = var.location
}

# Random suffix for uniqueness (prevents conflicts if RG already exists)
resource "random_id" "rg_suffix" {
  byte_length = 2
}

# 3. Azure Container Registry (ACR) - For storing Docker images
resource "azurerm_container_registry" "acr" {
  name                = "${var.project_prefix}acr${random_id.acr_suffix.hex}"  # Globally unique
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = var.acr_sku
  admin_enabled       = true
}

# Random suffix for ACR uniqueness
resource "random_id" "acr_suffix" {
  byte_length = 2
}

# 4. Azure Kubernetes Service (AKS) - The deployment target
resource "azurerm_kubernetes_cluster" "aks" {
  name                = "${var.project_prefix}-aks-${random_id.aks_suffix.hex}"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  dns_prefix          = "${var.project_prefix}-dns-${random_id.aks_suffix.hex}"

  default_node_pool {
    name       = "default"
    node_count = var.aks_node_count
    vm_size    = "Standard_A2_v2"
  }

  identity {
    type = "SystemAssigned"
  }

  # Ensure AKS is created after ACR
  depends_on = [azurerm_container_registry.acr]
}

# Random suffix for AKS uniqueness
resource "random_id" "aks_suffix" {
  byte_length = 2
}

# 5. Optional: Azure AI Service (Azure OpenAI Example)
# You can configure this later if needed
