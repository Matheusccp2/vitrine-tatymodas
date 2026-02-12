import { MessageCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { STORE_INFO } from '@/config/constants';
import { openStoreWhatsApp } from '@/utils/whatsapp';
import { User } from '@/types';

interface HeaderProps {
  user?: User | null;
  onLogout?: () => void;
  cartButton?: React.ReactNode;
}

export function Header({ user, onLogout, cartButton }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo e informações */}
          <div className="flex items-center gap-3">
            <img src="/icon-logo.svg" alt="Logo do site" className='w-12 h-8'/>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{STORE_INFO.name}</h1>
              <p className="text-xs text-gray-500">{STORE_INFO.tagline}</p>
            </div>
          </div>

          {/* Ações do header */}
          <div className="flex items-center gap-3">
            {cartButton}
            {/* Botão WhatsApp (sempre visível) */}
            <Button
              variant="outline"
              size="sm"
              onClick={openStoreWhatsApp}
              className="gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </Button>

            {/* Badge e botão de logout para admin */}
            {user && (
              <>
                <Badge variant="default" className="bg-purple-600 p-2 px-4">
                  Admin
                </Badge>
                <Button variant="outline" size="sm" onClick={onLogout} className="gap-2">
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Sair</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
