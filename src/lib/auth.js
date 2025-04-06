import { getServerSession } from "next-auth";
import { getUserIdFromToken } from "@/lib/joseToken";
import { User } from "@/models/user";
import { authOptions } from "@/lib/authOptions";

export async function getAuthenticatedUser(request) {
  console.log("Iniciando getAuthenticatedUser");
  try {
    // Verificar sesión de NextAuth
    console.log("Obteniendo sesión de NextAuth");
    const session = await getServerSession(authOptions);
    console.log("Sesión obtenida:", session);
    if (session?.user?.id) {
      console.log("Buscando usuario por ID:", session.user.id);
      const user = await User.findOne({ where: { id: session.user.id } });
      console.log("Usuario encontrado por sesión:", user);
      if (user) return user;
    }

    // Verificar token JOSE
    console.log("Verificando token JOSE");
    const authHeader = request.headers.get("authorization");
    console.log("Authorization header:", authHeader);
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      console.log("Token extraído:", token);
      const userByToken = await getUserIdFromToken(token);
      console.log("Resultado de getUserIdFromToken:", userByToken);
      if (userByToken?.userId?.email) {
        console.log("Buscando usuario por email:", userByToken.userId.email);
        const user = await User.findOne({ where: { email: userByToken.userId.email } });
        console.log("Usuario encontrado por token:", user);
        if (user) return user;
      }
    }

    console.log("No se encontró usuario autenticado");
    return null;
  } catch (error) {
    console.error("Error en getAuthenticatedUser:", error);
    throw error;
  }
}