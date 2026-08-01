import { Edit2, Trash2, ShoppingBag } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types";
import { formatPrice } from "@/utils/formatters";
import { sendProductWhatsApp } from "@/utils/whatsapp";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  isAdmin?: boolean;
  onEdit?: (product: Product) => void;
  onDelete?: (id: string) => void;
  onAddToCart?: (product: Product, sizes: string[], colors: string[]) => void;
}

export function ProductCard({
  product,
  isAdmin = false,
  onEdit,
  onDelete,
  onAddToCart,
}: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const [showSizeError, setShowSizeError] = useState(false);
  const [showColorError, setShowColorError] = useState(false);

  const validateSelection = (): boolean => {
    let isValid = true;

    if (!selectedSize) {
      setShowSizeError(true);
      isValid = false;
    }

    if (selectedColors.length === 0) {
      setShowColorError(true);
      isValid = false;
    }

    return isValid;
  };

  const toggleSize = (size: string) => {
    setSelectedSize(size);
    setShowSizeError(false);
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color)
        ? prev.filter((item) => item !== color)
        : [...prev, color],
    );
    setShowColorError(false);
  };

  const handleAddToCart = () => {
    if (!validateSelection()) {
      return;
    }

    onAddToCart?.(product, [selectedSize], selectedColors);
  };

  const handleSendWhatsApp = () => {
    if (validateSelection()) {
      sendProductWhatsApp(product, [selectedSize], selectedColors);
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      {/* Imagem do Produto */}
      <div className="relative aspect-square bg-gray-100">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <ShoppingBag className="h-16 w-16 text-gray-300" />
          </div>
        )}

        {/* Badge de Categoria */}
        <Badge className="absolute right-2 top-2 bg-pink-600 text-white">
          {product.category}
        </Badge>
      </div>

      {/* Conteúdo do Card */}
      <CardContent className="p-4">
        {/* Nome do Produto */}
        <h3 className="mb-2 text-lg font-semibold text-gray-900">
          {product.name}
        </h3>

        {/* Descrição (se houver) */}
        {product.description && (
          <p className="mb-3 line-clamp-2 text-sm text-gray-600">
            {product.description}
          </p>
        )}

        {/* Tamanhos selecionáveis */}
        <div className="mb-3 space-y-2">
          <p className="text-xs font-medium text-gray-500">
            Tamanho:{" "}
            {selectedSize ? (
              <span className="text-pink-600 font-semibold">
                {selectedSize}
              </span>
            ) : (
              <span className="text-gray-400">Selecione um tamanho</span>
            )}
          </p>
          <div className="flex flex-wrap gap-1">
            {product.sizes.map((size) => (
              <Badge
                key={size}
                variant={selectedSize === size ? "default" : "outline"}
                className="cursor-pointer transition-all hover:scale-105"
                onClick={() => toggleSize(size)}
              >
                {size}
              </Badge>
            ))}
          </div>
          {showSizeError && (
            <p className="text-xs text-red-600 font-medium animate-pulse">
              ⚠️ Selecione um tamanho antes de continuar
            </p>
          )}
        </div>

        {/* Cores selecionáveis */}
        {product.colors && product.colors.length > 0 && (
          <div className="mb-3 space-y-2">
            <p className="text-xs font-medium text-gray-500">
              Cor:{" "}
              {selectedColors.length > 0 ? (
                <span className="text-pink-600 font-semibold">
                  {selectedColors.join(", ")}
                </span>
              ) : (
                <span className="text-gray-400">
                  Selecione uma ou mais cores
                </span>
              )}
            </p>
            <div className="flex flex-wrap gap-1">
              {product.colors.map((color) => (
                <Badge
                  key={color}
                  variant={
                    selectedColors.includes(color) ? "default" : "outline"
                  }
                  className="cursor-pointer transition-all hover:scale-105"
                  onClick={() => toggleColor(color)}
                >
                  {color}
                </Badge>
              ))}
            </div>
            {showColorError && (
              <p className="text-xs text-red-600 font-medium animate-pulse">
                ⚠️ Selecione pelo menos uma cor antes de continuar
              </p>
            )}
          </div>
        )}

        {/* Preço */}
        <div className="mb-4 text-2xl font-bold text-pink-600">
          R$ {formatPrice(product.price)}
        </div>

        {/* Ações */}
        {!isAdmin ? (
          <div className="flex gap-2">
            <Button
              onClick={handleAddToCart} // ← Use a função de validação
              variant="outline"
              className="flex-1"
              // ← REMOVA: disabled={!selectedSize || !selectedColor}
            >
              Adicionar ao Carrinho
            </Button>
            <Button
              onClick={handleSendWhatsApp} // ← Use a função de validação
              className="flex-1 gap-2 bg-green-600 hover:bg-green-700"
              // ← REMOVA: disabled={!selectedSize || !selectedColor}
            >
              <FaWhatsapp size={14} />
              WhatsApp
            </Button>
          </div>
        ) : (
          // Botões de Editar/Excluir para admin
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit?.(product)}
              className="flex-1"
            >
              <Edit2 className="mr-1 h-4 w-4" />
              Editar
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete?.(product.id)}
              className="flex-1"
            >
              <Trash2 className="mr-1 h-4 w-4" />
              Excluir
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
