import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from "./src/lib/joseToken";
import { JWTPayload } from "jose";

export async function middleware(request: NextRequest) {
  // Obtener el token del encabezado
  const header = request.headers;
  const token = header.get("Authorization")?.replace("Bearer ", "") as string;

  // Verificar el token
  const verifiedToken = (await verifyToken(token)) as JWTPayload;
  const userid = await verifiedToken.userId;

  // Si el token es válido, permitir que la solicitud continúe
  if (verifiedToken) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", String(userid));
    //adhiero el userID al header
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  if (!verifiedToken) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
}

// Configuración para aplicar el middleware a rutas específicas
export const config = {
  matcher: ["/api/me/:path*"], // Aplica el middleware a todas las rutas bajo /dashboard
};