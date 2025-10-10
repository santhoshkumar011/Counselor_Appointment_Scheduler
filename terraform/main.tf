# 1. Configure the Azure Provider
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

# Note: Authentication is typically handled by the CI/CD pipeline 
# using the Service Principal (AZURE_CLIENT_ID, etc.)

provider "azurerm" {
  features {}
}

 


# 2. Resource Group (RG) - The container for all resources
resource "azurerm_resource_group" "rg" {
  name     = "${var.project_prefix}-rg"
  location = var.location
}


# 3. Azure Container Registry (ACR) - For storing Docker images
resource "azurerm_container_registry" "acr" {
  name                = "${var.project_prefix}acr"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = var.acr_sku
  admin_enabled       = true # Enable admin user for CI/CD authentication ease
}


# 4. Azure Kubernetes Service (AKS) - The deployment target
resource "azurerm_kubernetes_cluster" "aks" {
  name                = "${var.project_prefix}-aks"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  dns_prefix          = "${var.project_prefix}-dns"

  default_node_pool {
    name       = "default"
    node_count = var.aks_node_count
    vm_size    = "Standard_A2_v2"
  }
  
  identity {
    type = "SystemAssigned"
  }
}

# Attach ACR to AKS for easy pulling of images


# 5. Azure AI Service (Azure OpenAI Example) - For GenAI Integration


# Deploy a specific GenAI model (e.g., gpt-3.5-turbo)

