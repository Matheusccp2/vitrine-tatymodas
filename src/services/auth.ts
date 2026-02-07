import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { auth } from "./firebase";
import { User, LoginCredentials } from "@/types";

export async function login(credentials: LoginCredentials): Promise<User> {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password,
    );

    return {
      uid: userCredential.user.uid,
      email: userCredential.user.email!,
    };
  } catch (error: any) {
    // Traduz erros comuns do Firebase
    if (error.code === "auth/user-not-found") {
      throw new Error("Usuário não encontrado");
    }
    if (error.code === "auth/wrong-password") {
      throw new Error("Senha incorreta");
    }
    if (error.code === "auth/invalid-email") {
      throw new Error("Email inválido");
    }

    throw new Error("Erro ao fazer login. Tente novamente.");
  }
}

export async function logout(): Promise<void> {
  await signOut(auth);
}

export function onAuthChange(
  callback: (user: User | null) => void,
): () => void {
  return onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
    if (firebaseUser) {
      callback({
        uid: firebaseUser.uid,
        email: firebaseUser.email!,
      });
    } else {
      callback(null);
    }
  });
}

export function getCurrentUser(): User | null {
  const firebaseUser = auth.currentUser;

  if (firebaseUser) {
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email!,
    };
  }

  return null;
}