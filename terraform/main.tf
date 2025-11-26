# Define the Azure Provider
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
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

# --- 1. Resource Group (RG) ---
resource "azurerm_resource_group" "rg" {
  name     = "${var.project_prefix}-rg-${random_id.rg_suffix.hex}"
  location = var.location
}

resource "random_id" "rg_suffix" {
  byte_length = 2
}

# --- 2. Azure Container Registry (ACR) ---
resource "azurerm_container_registry" "acr" {
  # ACR name must be globally unique, using prefix + random ID
  name                = "${lower(var.project_prefix)}acr${random_id.acr_suffix.hex}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = var.acr_sku
  admin_enabled       = false # Secure: AKS will use managed identity, not admin credentials
}

resource "random_id" "acr_suffix" {
  byte_length = 2
}

# --- 3. Azure Kubernetes Service (AKS) ---
resource "azurerm_kubernetes_cluster" "aks" {
  name                = "${var.project_prefix}-aks-${random_id.aks_suffix.hex}"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  dns_prefix          = "${var.project_prefix}-dns-${random_id.aks_suffix.hex}"
  kubernetes_version  = "1.28" # Use a stable version

  default_node_pool {
    name       = "default"
    node_count = var.aks_node_count
    vm_size    = "Standard_DS2_v2"
  }

  identity {
    type = "SystemAssigned"
  }

  # CRITICAL: Automatically grant AKS permission to pull images from the ACR
  acr_integration {
    acr_id  = azurerm_container_registry.acr.id
    enabled = true
  }
}

resource "random_id" "aks_suffix" {
  byte_length = 2
}