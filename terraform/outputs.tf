# Resource Group Name
output "resource_group_name" {
  value = azurerm_resource_group.rg.name
}

# ACR Login Server
output "acr_login_server" {
  value = azurerm_container_registry.acr.login_server
}

# AKS Cluster Name
output "aks_cluster_name" {
  value = azurerm_kubernetes_cluster.aks.name
}

# AKS Cluster Kube Config (optional)
output "aks_kube_config" {
  value     = azurerm_kubernetes_cluster.aks.kube_config_raw
  sensitive = true
}
