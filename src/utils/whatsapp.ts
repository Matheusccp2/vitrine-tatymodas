import { Product } from "@/types";
import { WHATSAPP_NUMBER, STORE_INFO } from "@/config/constants";
import { formatPrice } from "./formatters";
import { CartItem } from "@/hooks/useCart";

export function sendProductWhatsApp(
  product: Product,
  selectedSizes: string[],
  selectedColors: string[],
): void {
  const message = createProductMessage(product, selectedSizes, selectedColors);
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  window.open(whatsappUrl, "_blank");
}

export function openStoreWhatsApp(): void {
  const message = `Olá ${STORE_INFO.name}! Gostaria de mais informações.`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  window.open(whatsappUrl, "_blank");
}

function createProductMessage(
  product: Product,
  selectedSizes: string[],
  selectedColors: string[],
): string {
  const totalQuantity = selectedSizes.length * selectedColors.length;
  const totalPrice = formatPrice(product.price * totalQuantity);
  const sizesText = selectedSizes.join(", ");
  const colorsText = selectedColors.join(", ");

  return `Olá! Tenho interesse neste item:

 *${product.name}*
------------------------------
• *Categoria*: ${product.category}
• *Tamanhos*: ${sizesText}
• *Cores*: ${colorsText}
• *Quantidade*: ${totalQuantity} unidade(s)
• *Valor total*: R$ ${totalPrice}
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

  window.open(whatsappUrl, "_blank");
}

/**
 * Cria mensagem do carrinho
 */
function createCartMessage(cart: CartItem[]): string {
  let message = `Olá! Gostaria de mais informações sobre:\n\n`;

  let total = 0;

  cart.forEach((item, index) => {
    const subtotal = item.product.price * item.quantity;
    total += subtotal;

    message += `*${index + 1}. ${item.product.name}*\n`;
    message += `   Tamanhos: ${item.selectedSizes.join(", ")}\n`;
    message += `   Cores: ${item.selectedColors.join(", ")}\n`;
    message += `   Quantidade: ${item.quantity} unidade(s)\n`;
    message += `   Subtotal: R$ ${formatPrice(subtotal)}\n\n`;
  });

  message += `━━━━━━━━━━━━━━━\n`;
  message += `💰 *TOTAL: R$ ${formatPrice(total)}*\n\n`;
  message += `Aguardo confirmação!`;

  return message;
}

// Não esqueça de importar o tipo CartItem no início do arquivo:
// import { CartItem } from '@/hooks/useCart';
