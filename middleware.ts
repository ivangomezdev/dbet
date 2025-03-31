import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from "./src/lib/joseToken";
import { JWTPayload } from "jose";
import { getSession } from "next-auth/react"; // O la importación correcta según tu versión de NextAuth
import type { Session } from "next-auth";
import type { IncomingMessage } from "http";

export async function middleware(request: NextRequest) {
  // Obtener el token del encabezado Authorization (para JOSE)
  const header = request.headers;
  const token = header.get("Authorization")?.replace("Bearer ", "");

  let userId: string | null = null;

  // 1. Verificar token JOSE si existe
  if (token) {
    try {
      const verifiedToken = (await verifyToken(token)) as JWTPayload & { userId?: string };
      userId = verifiedToken?.userId ?? null;

      if (userId) {
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("x-user-id", userId);
        return NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        });
      }
    } catch (error) {
      console.error("Error verificando token JOSE:", error);
    }
  }

  // 2. Si no hay token JOSE o falla, intentar con la sesión de NextAuth
  try {
    const session = (await getSession({ req: { headers: Object.fromEntries(request.headers.entries()) } as IncomingMessage })) as Session | null;
    if (session && session.user && "id" in session.user) {
      userId = session.user.id as string;

      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-user-id", userId);
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }
  } catch (error) {
    console.error("Error obteniendo sesión de NextAuth:", error);
  }

  // 3. Si no hay ni token JOSE ni sesión válida, denegar acceso
  return NextResponse.json({ error: "No autorizado" }, { status: 401 });
}

// Configuración para aplicar el middleware a rutas específicas
export const config = {
  matcher: ["/api/me/:path*"],
};
