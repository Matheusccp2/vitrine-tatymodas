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
  onAddToCart?: (product: Product, size: string, color: string) => void;
}

export function ProductCard({
  product,
  isAdmin = false,
  onEdit,
  onDelete,
  onAddToCart,
}: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

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
              <span className="text-amber-600">Selecione um tamanho</span>
            )}
          </p>
          <div className="flex flex-wrap gap-1">
            {product.sizes.map((size) => (
              <Badge
                key={size}
                variant={selectedSize === size ? "default" : "outline"}
                className="cursor-pointer transition-all hover:scale-105 p-2 px-4"
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </Badge>
            ))}
          </div>
        </div>

        {/* Cores selecionáveis */}
        {product.colors && product.colors.length > 0 && (
          <div className="mb-3 space-y-2">
            <p className="text-xs font-medium text-gray-500">
              Cor:{" "}
              {selectedColor ? (
                <span className="text-pink-600 font-semibold">
                  {selectedColor}
                </span>
              ) : (
                <span className="text-amber-600">Selecione uma cor</span>
              )}
            </p>
            <div className="flex flex-wrap gap-1">
              {product.colors.map((color) => (
                <Badge
                  key={color}
                  variant={selectedColor === color ? "default" : "outline"}
                  className="cursor-pointer transition-all hover:scale-105 p-2 px-4"
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Preço */}
        <div className="mb-4 text-2xl font-bold text-pink-600">
          R$ {formatPrice(product.price)}
        </div>

        {/* Ações */}
        {!isAdmin ? (
          <div className="space-y-2">
            <div className="flex gap-2">
              <Button
                onClick={() =>
                  onAddToCart?.(product, selectedSize, selectedColor)
                }
                variant="outline"
                className="flex-1"
                disabled={!selectedSize || !selectedColor}
              >
                Adicionar ao Carrinho
              </Button>
              <Button
                onClick={() =>
                  sendProductWhatsApp(product, selectedSize, selectedColor)
                }
                className="flex-1 gap-2 bg-green-600 hover:bg-green-700"
                disabled={!selectedSize || !selectedColor}
              >
                <FaWhatsapp size={17} />
                WhatsApp
              </Button>
            </div>
            {(!selectedSize || !selectedColor) && (
              <p className="text-xs text-center text-amber-600 font-medium">
                ⚠️ Selecione tamanho e cor antes de continuar
              </p>
            )}
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
