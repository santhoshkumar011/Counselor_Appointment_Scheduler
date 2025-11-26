# 1. Configure the Azure Provider
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
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

# 2. Resource Group (RG)
resource "azurerm_resource_group" "rg" {
  name     = "${var.project_prefix}-rg-${random_id.rg_suffix.hex}"
  location = var.location
}

resource "random_id" "rg_suffix" {
  byte_length = 2
}

# 3. Azure Container Registry (ACR)
resource "azurerm_container_registry" "acr" {
  name                = "${lower(var.project_prefix)}acr${random_id.acr_suffix.hex}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = var.acr_sku
  admin_enabled       = false 
}

resource "random_id" "acr_suffix" {
  byte_length = 2
}

# 4. Azure Kubernetes Service (AKS)
resource "azurerm_kubernetes_cluster" "aks" {
  name                = "${var.project_prefix}-aks-${random_id.aks_suffix.hex}"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  dns_prefix          = "${var.project_prefix}-dns-${random_id.aks_suffix.hex}"
  kubernetes_version  = "1.28"

  default_node_pool {
    name       = "default"
    node_count = var.aks_node_count
    vm_size    = "Standard_DS2_v2"
  }

  identity {
    type = "SystemAssigned"
  }
}

resource "random_id" "aks_suffix" {
  byte_length = 2
}

# 🛑 FIX: ACR-AKS Integration via Role Assignment (Solves the syntax error)
resource "azurerm_role_assignment" "aks_acrpull" {
  scope                = azurerm_container_registry.acr.id
  role_definition_name = "AcrPull" 
  principal_id         = azurerm_kubernetes_cluster.aks.kubelet_identity[0].object_id
  depends_on           = [azurerm_kubernetes_cluster.aks]
}