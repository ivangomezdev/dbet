
import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";


const handler = NextAuth(authOptions);

// Exportamos el handler para las rutas GET y POST
export { handler as GET, handler as POST };