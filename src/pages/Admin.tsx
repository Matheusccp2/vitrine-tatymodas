import { useState } from "react";
import { Plus, ShoppingBag } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ProductCard";
import { ProductForm } from "@/components/ProductForm";
import { LoginForm } from "@/components/LoginForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useProducts } from "@/hooks/useProducts";
import { Product, ProductFormData } from "@/types";

export function Admin() {
  const {
    user,
    loading: authLoading,
    error: authError,
    login,
    logout,
  } = useAuth();
  const {
    products,
    loading: productsLoading,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const handleAddClick = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };
  const handleDelete = async (productId: string) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      await deleteProduct(productId);
    }
  };
  const handleFormSubmit = async (formData: ProductFormData) => {
    if (editingProduct) {
      await updateProduct(editingProduct.id, formData);
    } else {
      await addProduct(formData);
    }
  };

  if (!user && !authLoading) {
    return <LoginForm onLogin={login} error={authError} />;
  }

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col from-pink-50 via-white to-purple-50">
      <Header user={user} onLogout={logout} />

      <main className="container mx-auto flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {/* Botão Adicionar */}
        <div className="mb-8">
          <Button
            onClick={handleAddClick}
            size="lg"
            className="w-full sm:w-auto"
          >
            <Plus className="mr-2 h-5 w-5" />
            Adicionar Novo Produto
          </Button>
        </div>

        {/* Loading */}
        {productsLoading && (
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-500">Carregando produtos...</p>
          </div>
        )}

        {/* Lista Vazia */}
        {!productsLoading && products.length === 0 && (
          <Card className="py-12 text-center">
            <CardContent className="space-y-4">
              <ShoppingBag className="mx-auto h-16 w-16 text-gray-300" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Nenhum produto cadastrado
                </h3>
                <p className="text-sm text-gray-500">
                  Comece adicionando seu primeiro produto!
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Grid de Produtos */}
        {!productsLoading && products.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isAdmin
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />

      {/* Formulário de Produto (Modal) */}
      <ProductForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
        editingProduct={editingProduct}
      />
    </div>
  );
}
