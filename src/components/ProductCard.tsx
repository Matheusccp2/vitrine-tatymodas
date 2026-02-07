import { Edit2, Trash2, ShoppingBag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types";
import { formatPrice } from "@/utils/formatters";
import { sendProductWhatsApp } from "@/utils/whatsapp";

interface ProductCardProps {
  product: Product;
  isAdmin?: boolean;
  onEdit?: (product: Product) => void;
  onDelete?: (id: string) => void;
}

export function ProductCard({
  product,
  isAdmin = false,
  onEdit,
  onDelete,
}: ProductCardProps) {
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

        {/* Tamanhos em Badges */}
        <div className="mb-3 space-y-2">
          <p className="text-xs font-medium text-gray-500">
            Tamanhos disponíveis:
          </p>
          <div className="flex flex-wrap gap-1">
            {product.sizes.map((size) => (
              <Badge key={size} variant="secondary" className="text-xs">
                {size}
              </Badge>
            ))}
          </div>
        </div>

        {/* Preço */}
        <div className="mb-4 text-2xl font-bold text-pink-600">
          R$ {formatPrice(product.price)}
        </div>

        {/* Ações */}
        {!isAdmin ? (
          // Botão WhatsApp para clientes
          <Button
            onClick={() => sendProductWhatsApp(product)}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            <svg
              className="mr-2 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Tenho Interesse
          </Button>
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
