import { SignJWT, jwtVerify } from "jose";

export const signToken = async (userId:string) => {
    const secret = new TextEncoder().encode(process.env.SECRET)



const token = await new SignJWT({userId})
  .setProtectedHeader({alg:"HS256"})
  .setIssuedAt()
  .sign(secret)

  return token
}

export const verifyToken = async (token: string) => {
    try {
      const secret = new TextEncoder().encode(process.env.SECRET); // Convierte el secreto a Uint8Array
      const { payload } = await jwtVerify(token, secret); // Verifica el token
      console.log(payload);
      
      return payload; // Devuelve los datos decodificados
    } catch (error) {
      console.error("Error al verificar el token:", error);
      return null; // Devuelve null si el token no es válido
    }
  };    


  export async function getUserIdFromToken(token: string): Promise<string | null> {
    try {
      const secret = new TextEncoder().encode(process.env.SECRET); // Convierte el secreto a Uint8Array
      const { payload } = await jwtVerify(token,secret);
      return payload.userId as string;
    } catch (error) {
      console.error("Token inválido:", error);
      return null; // Si el token no es válido, retorna null
    }
  }