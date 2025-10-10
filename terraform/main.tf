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
resource "azurerm_role_assignment" "acr_pull_assignment" {
  scope                = azurerm_container_registry.acr.id
  role_definition_name = "AcrPull"
  principal_id         = azurerm_kubernetes_cluster.aks.kubelet_identity[0].object_id
}


# 5. Azure AI Service (Azure OpenAI Example) - For GenAI Integration
resource "azurerm_cognitive_account" "ai_service" {
  name                = "${var.project_prefix}-ai"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  kind                = "OpenAI"
  sku_name            = "F0" # Use S0 tier for production access
}

# Deploy a specific GenAI model (e.g., gpt-3.5-turbo)
resource "azurerm_cognitive_deployment" "ai_model" {
  name                 = "counselor-model" # Deployment name used in the API call
  cognitive_account_id = azurerm_cognitive_account.ai_service.id
  model {
    format  = "OpenAI"
    name    = var.ai_model_name
    version = "0301" # Specific version
  }
  scale {
    type = "Standard"
  }
}
