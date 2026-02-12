import { X, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CartItem } from '@/hooks/useCart';
import { formatPrice } from '@/utils/formatters';
import { sendCartToWhatsApp } from '@/utils/whatsapp';

interface CartModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cart: CartItem[];
  onRemove: (index: number) => void;
  onClear: () => void;
  totalPrice: number;
}

export function CartModal({
  open,
  onOpenChange,
  cart,
  onRemove,
  onClear,
  totalPrice,
}: CartModalProps) {
  const handleSendToWhatsApp = () => {
    sendCartToWhatsApp(cart);
    onClear(); // Limpa após enviar
    onOpenChange(false); // Fecha modal
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Carrinho de Compras</DialogTitle>
        </DialogHeader>

        {cart.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            Seu carrinho está vazio
          </div>
        ) : (
          <>
            {/* Lista de itens */}
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 rounded-lg border p-4"
                >
                  {/* Imagem */}
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded bg-gray-100">
                    {item.product.imageUrl ? (
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-gray-400">
                        Sem foto
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.product.name}</h3>
                    <p className="text-sm text-gray-600">
                      Código: {item.product.sku || item.product.id.slice(0, 8)}
                    </p>
                    <div className="mt-1 flex gap-2">
                      <Badge variant="secondary">{item.selectedSize}</Badge>
                      <Badge variant="outline">{item.selectedColor}</Badge>
                      <Badge>Qtd: {item.quantity}</Badge>
                    </div>
                    <p className="mt-2 font-semibold text-pink-600">
                      R$ {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>

                  {/* Botão remover */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-pink-600">
                  R$ {formatPrice(totalPrice)}
                </span>
              </div>
            </div>

            {/* Botões */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={onClear}
                className="flex-1"
              >
                Limpar Carrinho
              </Button>
              <Button
                onClick={handleSendToWhatsApp}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Enviar para WhatsApp
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}