export interface Product {
  id: string; 
  name: string; 
  category: string; 
  sizes: string[]; 
  colors: string[];
  price: number; 
  description?: string; 
  imageUrl?: string; 
  createdAt: Date; 
  updatedAt: Date; 
}

export interface ProductFormData {
  name: string;
  category: string;
  sizes: string[];
  colors: string[];
  price: string;
  description: string;
  imageFile?: File; // Arquivo de imagem para upload
}

export interface User {
  uid: string; // ID único do usuário
  email: string; // Email do usuário
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface ProductFilters {
  category: string; // "all" ou nome da categoria
  searchTerm: string; // Termo de busca
}
