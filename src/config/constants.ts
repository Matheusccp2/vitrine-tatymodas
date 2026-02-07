export const FIREBASE_CONFIG = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const STORE_INFO = {
  name: import.meta.env.VITE_STORE_NAME || 'Moda Feminina',
  tagline: import.meta.env.VITE_STORE_TAGLINE || 'Promoções exclusivas',
};

export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '5515999999999';

export const COLLECTIONS = {
  PRODUCTS: 'products',
} as const;

export const STORAGE_PATHS = {
  PRODUCTS: 'products',
} as const;
