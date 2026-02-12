import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CartButtonProps {
  itemCount: number;
  onClick: () => void;
}

export function CartButton({ itemCount, onClick }: CartButtonProps) {
  return (
    <Button variant="outline" size="sm" onClick={onClick} className="relative">
      <ShoppingCart className="h-4 w-4" />
      {itemCount > 0 && (
        <Badge 
          className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-pink-600"
        >
          {itemCount}
        </Badge>
      )}
      <span className="ml-2 hidden sm:inline">Carrinho</span>
    </Button>
  );
}