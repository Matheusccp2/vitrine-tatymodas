import { useState, useMemo } from "react";
import { ShoppingBag } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FilterBar } from "@/components/FilterBar";
import { ProductCard } from "@/components/ProductCard";
import { Card, CardContent } from "@/components/ui/card";
import { useProducts } from "@/hooks/useProducts";
import { ProductFilters } from "@/types";
import { useCart } from "@/hooks/useCart";
import { CartButton } from "@/components/CartButton";
import { CartModal } from "@/components/CartModal";

export function Home() {
  const { products, loading } = useProducts();
  const [filters, setFilters] = useState<ProductFilters>({
    category: "all",
    searchTerm: "",
  });

  const { cart, addToCart, removeFromCart, clearCart, totalItems, totalPrice } =
    useCart();
  const [cartOpen, setCartOpen] = useState(false);

  /**
   * Filtra produtos baseado nos filtros selecionados
   */
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Filtro de categoria
      const matchesCategory =
        filters.category === "all" || product.category === filters.category;

      // Filtro de busca por nome
      const matchesSearch =
        !filters.searchTerm ||
        product.name.toLowerCase().includes(filters.searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [products, filters]);

  return (
    <div className="flex min-h-screen flex-col from-pink-50 via-white to-purple-50">
      <Header
        cartButton={
          <CartButton
            itemCount={totalItems}
            onClick={() => setCartOpen(true)}
          />
        }
      />

      <main className="container mx-auto flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {/* Barra de Filtros */}
        <FilterBar filters={filters} onFiltersChange={setFilters} />

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-500">Carregando produtos...</p>
          </div>
        )}

        {/* Lista de Produtos */}
        {!loading && filteredProducts.length === 0 && (
          <Card className="py-12 text-center">
            <CardContent className="space-y-4">
              <ShoppingBag className="mx-auto h-16 w-16 text-gray-300" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {products.length === 0
                    ? "Nenhum produto em promoção"
                    : "Nenhum produto encontrado"}
                </h3>
                <p className="text-sm text-gray-500">
                  {products.length === 0
                    ? "Volte em breve para conferir nossas novidades!"
                    : "Tente buscar por outro termo ou categoria"}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {!loading && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        )}
      </main>

      <CartModal
        open={cartOpen}
        onOpenChange={setCartOpen}
        cart={cart}
        onRemove={removeFromCart}
        onClear={clearCart}
        totalPrice={totalPrice}
      />

      <Footer />
    </div>
  );
}
