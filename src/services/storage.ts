import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { storage } from './firebase';
import { STORAGE_PATHS } from '@/config/constants';

export async function uploadProductImage(
  file: File,
  productId: string
): Promise<string> {
  try {
    // Gera nome único para o arquivo: products/PRODUCT_ID_TIMESTAMP.extensão
    const timestamp = Date.now();
    const extension = file.name.split('.').pop();
    const fileName = `${productId}_${timestamp}.${extension}`;
    
    // Referência para o arquivo no Storage
    const storageRef = ref(storage, `${STORAGE_PATHS.PRODUCTS}/${fileName}`);
    
    // Faz upload do arquivo
    await uploadBytes(storageRef, file);
    
    // Obtém a URL pública
    const downloadURL = await getDownloadURL(storageRef);
    
    return downloadURL;
  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error);
    throw new Error('Não foi possível fazer upload da imagem');
  }
}

export async function deleteProductImage(imageUrl: string): Promise<void> {
  try {
    // Extrai o caminho da URL
    const imageRef = ref(storage, imageUrl);
    
    // Deleta o arquivo
    await deleteObject(imageRef);
  } catch (error) {
    console.error('Erro ao deletar imagem:', error);
    // Não lança erro aqui para não bloquear a exclusão do produto
    // A imagem órfã será removida manualmente se necessário
  }
}

export function isValidImage(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    return false;
  }

  if (file.size > maxSize) {
    return false;
  }

  return true;
}
