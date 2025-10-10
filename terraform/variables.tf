variable "location" {
  description = "The Azure region to deploy resources in."
  type        = string
  default     = "eastus" # <-- Change this if you prefer a different region
}

variable "project_prefix" {
  description = "A unique prefix for all resources to ensure global uniqueness where required."
  type        = string
  default     = "counselorapp" # <-- IMPORTANT: Ensure this is unique (e.g., 'counselorapp-ra')
}

variable "acr_sku" {
  description = "The SKU (tier) for the Azure Container Registry."
  type        = string
  default     = "Standard" 
}

variable "aks_node_count" {
  description = "The number of nodes in the AKS cluster."
  type        = number
  default     = 2 
}

# The OpenAI model name used for GenAI integration
variable "ai_model_name" {
  description = "The name of the GenAI model to deploy (e.g., 'gpt-35-turbo')."
  type        = string
  default     = "gpt-35-turbo" # <-- Keep this unless you need a different model
}
