// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "../../../lib/db.js";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: "2.0",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Faltan credenciales");
        }
        const user = await User.findOne({ where: { email: credentials.email } });
        if (!user || !user.password) {
          throw new Error("Usuario no encontrado o no registrado con contraseña");
        }
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Contraseña incorrecta");
        }
        return { id: user.id.toString(), email: user.email };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials" && user.email) {
        const existingUser = await User.findOne({ where: { email: user.email } });
        if (!existingUser) {
          await User.create({
            email: user.email,
            subscriptionStatus: "pending",
          });
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user.email) {
        const dbUser = await User.findOne({ where: { email: session.user.email } });
        if (dbUser) {
          session.user.id = dbUser.id.toString();
          session.user.subscriptionStatus = dbUser.subscriptionStatus;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/signup",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };