import GoogleProvider from "next-auth/providers/google";
import { User } from "@/models/user";
import { Auth } from "@/models/auth";


export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({  profile }) {
      console.log("Perfil de Google recibido:", profile);

      if (!profile?.email) {
        console.error("No se recibió correo electrónico");
        return false;
      }

      try {
        const [user, created] = await User.findOrCreate({
          where: { email: profile.email },
          defaults: {
            email: profile.email,
            name: profile.given_name || null,
            surname: profile.family_name || null,
            password: null,
            subscriptionStatus: "FREE",
          },
        });

        console.log(`Usuario ${created ? "creado" : "encontrado"}:`, user.get("id"));

        await Auth.findOrCreate({
          where: { userId: user.get("id") },
          defaults: {
            email: profile.email,
            userId: user.get("id"),
            verificationCode: null,
            codeUsed: true,
          },
        });

        return true;
      } catch (error) {
        console.error("Error detallado en OAuth signin:", error);
        return false;
      }
    },
    async session({ session, token }) {
      if (token.sub && session.user.email) {
        try {
          const user = await User.findOne({
            where: { email: session.user.email },
            attributes: ["id", "email", "subscriptionStatus", "name", "surname"],
          });

          if (user) {
            session.user.id = user.get("id");
            session.user.subscriptionStatus = user.get("subscriptionStatus");
          }
        } catch (error) {
          console.error("Error en callback de sesión:", error);
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "development",
};
