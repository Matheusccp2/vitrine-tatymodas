import { Product } from "@/types";
import { WHATSAPP_NUMBER, STORE_INFO } from "@/config/constants";
import { formatPrice } from "./formatters";

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
