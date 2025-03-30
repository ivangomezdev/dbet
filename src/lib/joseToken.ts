import { User } from "@/models/user";
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


  export async function getUserIdFromToken(token: string) {
    try {
      const secret = new TextEncoder().encode(process.env.SECRET);
      const { payload } = await jwtVerify(token, secret);
      console.log("ESTE ES EL PAYLOAD",payload);
      
      return payload
    } catch (error) {
      console.error("Token inválido:", error);
      return null; 
    }
  }

  export async function getUserFromIdAuth(id: number): Promise<any | null> {
    try {
      console.log("Buscando usuario con id:", id, "tipo:", typeof id); // Depuración
      const user = await User.findOne({ where: { id: id } });
      console.log("Resultado de la búsqueda:", user); // Depuración
      return user ? user : null;
    } catch (error) {
      console.error("Error al buscar usuario:", error);
      return null;
    }
  }