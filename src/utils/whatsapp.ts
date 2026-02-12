import { Product } from "@/types";
import { WHATSAPP_NUMBER, STORE_INFO } from "@/config/constants";
import { formatPrice } from "./formatters";
import { CartItem } from "@/hooks/useCart";

export function sendProductWhatsApp(product: Product): void {
  const message = createProductMessage(product);
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  // Abre em nova aba
  window.open(whatsappUrl, "_blank");
}

export function openStoreWhatsApp(): void {
  const message = `Olá ${STORE_INFO.name}! Gostaria de mais informações.`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  window.open(whatsappUrl, "_blank");
}

function createProductMessage(product: Product): string {
  const price = formatPrice(product.price);
  const sizes = product.sizes.join(", ");
  const colors = product.colors?.join(", ") || "Não especificado";

  // ← Personalize a mensagem como quiser aqui
  return `Olá! Tenho interesse neste item:

 *${product.name}*
------------------------------
• *Categoria*: ${product.category}
• *Tamanhos*: ${sizes}
• *Cores*: ${colors}
• *Valor*: R$ ${price}
------------------------------

Poderia me dar mais detalhes?`;
}

/**
 * Envia carrinho inteiro para WhatsApp
 */
export function sendCartToWhatsApp(cart: CartItem[]): void {
  const message = createCartMessage(cart);
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  
  window.open(whatsappUrl, '_blank');
}

/**
 * Cria mensagem do carrinho
 */
function createCartMessage(cart: CartItem[]): string {
  let message = `Olá! Gostaria de mais informações sobre:\n\n`;
  
  let total = 0;
  
  cart.forEach((item, index) => {
    const price = formatPrice(item.product.price);
    total += item.product.price * item.quantity;
    
    message += `*${index + 1}. ${item.product.name}*\n`;
    message += `   Tamanho: ${item.selectedSize}\n`;
    message += `   Cor: ${item.selectedColor}\n`;
    message += `   Preço unit.: R$ ${price}\n`;
  });
  
  message += `━━━━━━━━━━━━━━━\n`;
  message += `💰 *TOTAL: R$ ${formatPrice(total)}*\n\n`;
  message += `Aguardo confirmação!`;
  
  return message;
}

// Não esqueça de importar o tipo CartItem no início do arquivo:
// import { CartItem } from '@/hooks/useCart';