import { useState, useEffect } from "react";
import { Product, ProductFormData } from "@/types";
import * as productsService from "@/services/products";
import * as storageService from "@/services/storage";
import { parsePriceToCents } from "@/utils/formatters";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await productsService.getAllProducts();
      setProducts(data);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (formData: ProductFormData) => {
    setError("");

    try {
      // Converte preço de string para centavos
      const priceInCents = parsePriceToCents(formData.price);

      // Converte imagem para Base64 (se houver)
      let imageUrl = "";
      if (formData.imageFile) {
        // Valida a imagem
        if (!storageService.isValidImage(formData.imageFile)) {
          throw new Error(
            "Imagem inválida. Use JPG, PNG ou WebP com no máximo 2MB",
          );
        }

        // Comprime e converte para Base64
        imageUrl = await storageService.compressAndConvertImage(
          formData.imageFile,
        );
      }

      // Cria o produto no Firestore
      await productsService.addProduct({
        name: formData.name,
        category: formData.category,
        sizes: formData.sizes,
        price: priceInCents,
        colors: formData.colors, 
        description: formData.description,
        imageUrl, // Base64 string ou vazio
      });

      // Recarrega a lista
      await loadProducts();
    } catch (err: any) {
      setError(err.message || "Erro ao adicionar produto");
      throw err;
    }
  };

  const updateProduct = async (productId: string, formData: ProductFormData) => {
  setError('');

  try {
    const priceInCents = parsePriceToCents(formData.price);

    // Prepara os dados para atualização
    const updates: any = {
      name: formData.name,
      category: formData.category,
      sizes: formData.sizes,
      colors: formData.colors,     // ← ADICIONE ESTA LINHA
      price: priceInCents,
      description: formData.description,
    };

    // Se tem nova imagem, converte para Base64
    if (formData.imageFile) {
      if (!storageService.isValidImage(formData.imageFile)) {
        throw new Error('Imagem inválida. Use JPG, PNG ou WebP com no máximo 2MB');
      }
      
      const imageUrl = await storageService.compressAndConvertImage(formData.imageFile);
      updates.imageUrl = imageUrl;
    }

    // Atualiza no Firestore
    await productsService.updateProduct(productId, updates);

    // Recarrega a lista
    await loadProducts();
  } catch (err: any) {
    setError(err.message || 'Erro ao atualizar produto');
    throw err;
  }
};

  const deleteProduct = async (productId: string) => {
    setError("");

    try {
      // Deleta o produto do Firestore (imagem está dentro dele)
      await productsService.deleteProduct(productId);

      // Recarrega a lista
      await loadProducts();
    } catch (err: any) {
      setError(err.message || "Erro ao deletar produto");
      throw err;
    }
  };

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    refreshProducts: loadProducts,
  };
}
