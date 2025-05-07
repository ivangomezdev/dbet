// hooks/useUser.ts
import { useSession } from "next-auth/react"; // Ejemplo con NextAuth

export const useUser = () => {
  const { data: session } = useSession();
  return {
    user: session?.user || null, // user podría incluir subscriptionStatus
  };
};