# 1. Configure the Azure Provider
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      # Version updated to ensure compatibility with all syntax
      version = "~> 3.80" 
    }
    random = {
      source = "hashicorp/random"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

# 2. Resource Group (RG) - The container for all resources
resource "azurerm_resource_group" "rg" {
  name     = "${var.project_prefix}-rg-${random_id.rg_suffix.hex}"
  location = var.location
}

# Random suffix for uniqueness
resource "random_id" "rg_suffix" {
  byte_length = 2
}

# 3. Azure Container Registry (ACR) - For storing Docker images
resource "azurerm_container_registry" "acr" {
  name                = "${lower(var.project_prefix)}acr${random_id.acr_suffix.hex}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = var.acr_sku
  admin_enabled       = false 
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
  kubernetes_version  = "1.28" # Using a stable version

  default_node_pool {
    name       = "default"
    node_count = var.aks_node_count
    vm_size    = "Standard_DS2_v2"
  }

  identity {
    type = "SystemAssigned"
  }

  # 🛑 IMPORTANT: acr_integration block has been permanently REMOVED to fix the error.
}

# Random suffix for AKS uniqueness
resource "random_id" "aks_suffix" {
  byte_length = 2
}

# --- CRITICAL FIX: Explicit Role Assignment for ACR-AKS Integration ---
# This resource explicitly grants the AKS Kubelet Identity AcrPull permissions on the ACR.
resource "azurerm_role_assignment" "aks_acrpull" {
  # Scope is the ACR resource ID
  scope                = azurerm_container_registry.acr.id
  # Role needed to pull images
  role_definition_name = "AcrPull" 
  # Principal is the AKS Kubelet Identity (System Assigned)
  principal_id         = azurerm_kubernetes_cluster.aks.kubelet_identity[0].object_id
  # Ensure AKS is created before trying to assign the role to its identity
  depends_on           = [azurerm_kubernetes_cluster.aks]
}