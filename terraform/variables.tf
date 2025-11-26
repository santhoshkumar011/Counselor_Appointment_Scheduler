variable "project_prefix" {
  description = "A prefix used for naming all resources."
  type        = string
  default     = "counselorapp"
}

variable "location" {
  description = "The Azure region for all resources."
  type        = string
  # 🛑 FIX: Changed location to one permitted by Azure Policy.
  default     = "centralindia" 
}

variable "acr_sku" {
  description = "The SKU for the Azure Container Registry (Basic, Standard, Premium)."
  type        = string
  default     = "Basic"
}

variable "aks_node_count" {
  description = "The number of nodes in the default AKS node pool."
  type        = number
  default     = 2
}