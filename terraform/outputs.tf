# ACR login server, needed by the CI/CD pipeline for image pushes
output "acr_login_server" {
  description = "The login server name of the Azure Container Registry."
  value       = azurerm_container_registry.acr.login_server
}

# AKS cluster name, useful for CI/CD deployment context
output "aks_cluster_name" {
  description = "The name of the Azure Kubernetes Service cluster."
  value       = azurerm_kubernetes_cluster.aks.name
}

# The endpoint for the AI Service, needed by the application code


# Resource Group name
output "resource_group_name" {
  value = data.azurerm_resource_group.existing.name
}
