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

      // Cria o produto no Firestore (sem imagem ainda)
      const productId = await productsService.addProduct({
        name: formData.name,
        category: formData.category,
        sizes: formData.sizes,
        price: priceInCents,
        description: formData.description,
        imageUrl: "",
      });

      // Se tem imagem, faz upload
      let imageUrl = "";
      if (formData.imageFile) {
        imageUrl = await storageService.uploadProductImage(
          formData.imageFile,
          productId,
        );

        // Atualiza o produto com a URL da imagem
        await productsService.updateProduct(productId, { imageUrl });
      }

      // Recarrega a lista
      await loadProducts();
    } catch (err: any) {
      setError(err.message || "Erro ao adicionar produto");
      throw err;
    }
  };

  const updateProduct = async (
    productId: string,
    formData: ProductFormData,
  ) => {
    setError("");

    try {
      const priceInCents = parsePriceToCents(formData.price);

      // Prepara os dados para atualização
      const updates: any = {
        name: formData.name,
        category: formData.category,
        sizes: formData.sizes,
        price: priceInCents,
        description: formData.description,
      };

      // Se tem nova imagem, faz upload
      if (formData.imageFile) {
        const imageUrl = await storageService.uploadProductImage(
          formData.imageFile,
          productId,
        );
        updates.imageUrl = imageUrl;
      }

      // Atualiza no Firestore
      await productsService.updateProduct(productId, updates);

      // Recarrega a lista
      await loadProducts();
    } catch (err: any) {
      setError(err.message || "Erro ao atualizar produto");
      throw err;
    }
  };

  const deleteProduct = async (productId: string) => {
    setError("");

    try {
      // Busca o produto para pegar a URL da imagem
      const product = products.find((p) => p.id === productId);

      // Deleta a imagem do Storage (se existir)
      if (product?.imageUrl) {
        await storageService.deleteProductImage(product.imageUrl);
      }

      // Deleta o produto do Firestore
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
