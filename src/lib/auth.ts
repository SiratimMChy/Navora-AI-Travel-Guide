import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "./mongoose";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        await connectDB();
        const user = await UserModel.findOne({ email: credentials.email });
        if (!user || !user.password) return null;
        const valid = await bcrypt.compare(credentials.password as string, user.password);
        if (!valid) return null;
        return { id: user._id.toString(), name: user.name, email: user.email, image: user.image, role: user.role };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        await connectDB();
        const existing = await UserModel.findOne({ email: user.email });
        if (!existing) {
          await UserModel.create({ name: user.name, email: user.email, image: user.image, role: "user" });
        }
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        await connectDB();
        const dbUser = await UserModel.findOne({ email: token.email });
        token.role = dbUser?.role || "user";
        token.id = dbUser?._id?.toString();
        token.name = dbUser?.name || user.name;
        token.picture = dbUser?.image || user.image;
      }
      // Called when update() is invoked from the client
      if (trigger === "update" && session) {
        if (session.name) token.name = session.name;
        if (session.image) token.picture = session.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string; id?: string }).role = token.role as string;
        (session.user as { role?: string; id?: string }).id = token.id as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
});
