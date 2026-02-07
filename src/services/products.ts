import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import { Product } from "@/types";
import { COLLECTIONS } from "@/config/constants";

function firestoreToProduct(id: string, data: any): Product {
  return {
    id,
    name: data.name,
    category: data.category,
    sizes: data.sizes,
    price: data.price,
    description: data.description || "",
    imageUrl: data.imageUrl || "",
    createdAt: data.createdAt?.toDate() || new Date(),
    updatedAt: data.updatedAt?.toDate() || new Date(),
  };
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    const productsRef = collection(db, COLLECTIONS.PRODUCTS);
    const q = query(productsRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => firestoreToProduct(doc.id, doc.data()));
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw new Error("Não foi possível carregar os produtos");
  }
}

export async function addProduct(
  product: Omit<Product, "id" | "createdAt" | "updatedAt">,
): Promise<string> {
  try {
    const productsRef = collection(db, COLLECTIONS.PRODUCTS);
    const now = Timestamp.now();

    const docRef = await addDoc(productsRef, {
      ...product,
      createdAt: now,
      updatedAt: now,
    });

    return docRef.id;
  } catch (error) {
    console.error("Erro ao adicionar produto:", error);
    throw new Error("Não foi possível adicionar o produto");
  }
}

export async function updateProduct(
  id: string,
  updates: Partial<Omit<Product, "id" | "createdAt" | "updatedAt">>,
): Promise<void> {
  try {
    const productRef = doc(db, COLLECTIONS.PRODUCTS, id);

    await updateDoc(productRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    throw new Error("Não foi possível atualizar o produto");
  }
}

export async function deleteProduct(id: string): Promise<void> {
  try {
    const productRef = doc(db, COLLECTIONS.PRODUCTS, id);
    await deleteDoc(productRef);
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    throw new Error("Não foi possível deletar o produto");
  }
}
