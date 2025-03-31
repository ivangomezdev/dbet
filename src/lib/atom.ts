import { atom } from "jotai";
interface User {
  id?: number;
  email?: string;
  name?: string | null;
  surname?: string | null;
  phone?: string | null;
  address?: string | null;
  subscriptionStatus?: string;
  createdAt?: string;
  updatedAt?: string;
  iat?: number;
  userId?: any; 
}
// Átomo para el estado global 
export const userAtom = atom<User | null>(null);
export const oAuthAtom = atom(null);