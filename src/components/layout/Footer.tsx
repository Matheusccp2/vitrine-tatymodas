import { Heart } from 'lucide-react';
import { STORE_INFO } from '@/config/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t bg-white">
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-sm text-gray-600">
            💖 Entre em contato pelo WhatsApp para mais informações
          </p>
          <p className="flex items-center gap-1 text-xs text-gray-500">
            Feito com <Heart className="h-3 w-3 fill-pink-500 text-pink-500" /> para {STORE_INFO.name}
          </p>
          <p className="text-xs text-gray-400">© {currentYear} Todos os direitos reservados</p>
        </div>
      </div>
    </footer>
  );
}
