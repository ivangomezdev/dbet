import { useSetAtom } from "jotai";
import { oAuthAtom } from "./atom";
import { signToken } from "./joseToken";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      console.log("Perfil de Google recibido:", profile);
      
      if (!profile?.email) {
        console.error("No se recibió correo electrónico");
        return false;
      }

      try {
        // Guardar sesión en DB
        const [user, created] = await User.findOrCreate({
          where: { email: profile.email },
          defaults: {
            email: profile.email,
            name: profile.given_name || null,
            surname: profile.family_name || null,
            password: null,
            subscriptionStatus: "inactive"
          }
        });

        console.log(`Usuario ${created ? 'creado' : 'encontrado'}:`, user.get('id'));
   
        const myToken = await signToken(user.get("id"))
    
        return true;
      } catch (error) {
        console.error("Error detallado en OAuth signin:", error);
        // Registra el error completo para debugging
        return false;
      }
    },
    // Resto de tu configuración...
  },
  events: {
    // Añade manejo de eventos para más información
    async signIn(message) {
      console.log("Evento de inicio de sesión:", message);
    },
    async error(message) {
      console.error("Evento de error de autenticación:", message);
    }
  },
  // Configura páginas de error personalizada
  pages: {
    signIn: '/me',
    error: '/auth/register'
  }
};