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

# 2. Use existing Resource Group (RG) instead of creating a new one
data "azurerm_resource_group" "existing" {
  name = "${var.project_prefix}-rg"  # Name of your existing RG
}

# 3. Azure Container Registry (ACR) - For storing Docker images
resource "azurerm_container_registry" "acr" {
  name                = "${var.project_prefix}acr"
  resource_group_name = data.azurerm_resource_group.existing.name
  location            = data.azurerm_resource_group.existing.location
  sku                 = var.acr_sku
  admin_enabled       = true # Enable admin user for CI/CD authentication ease
}

# 4. Azure Kubernetes Service (AKS) - The deployment target
resource "azurerm_kubernetes_cluster" "aks" {
  name                = "${var.project_prefix}-aks"
  location            = data.azurerm_resource_group.existing.location
  resource_group_name = data.azurerm_resource_group.existing.name
  dns_prefix          = "${var.project_prefix}-dns"

  default_node_pool {
    name       = "default"
    node_count = var.aks_node_count
    vm_size    = "Standard_A2_v2"
  }

  identity {
    type = "SystemAssigned"
  }

  # Attach ACR to AKS for easy pulling of images
  depends_on = [azurerm_container_registry.acr]
}

# 5. Optional: Azure AI Service (Azure OpenAI Example) - For GenAI Integration
# You can configure this later if needed
