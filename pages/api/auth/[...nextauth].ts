import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@mail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BE_ROUTE}/auth/signin`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            }
          );

          const user = await res.json();

          if (res.ok && user) {
            return user;
          } else if (user.error) {
            throw new Error(user.error);
          } else {
            throw new Error("Login failed.");
          }
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async session({ session, token }: any) {
      if (token) session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
  },
};

export default function auth(req: NextApiRequest, res: NextApiResponse) {
  // Get the host from the request headers
  const host = req.headers.host;
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

  // Dynamically set NEXTAUTH_URL, but only if it's not already set
  if (!process.env.NEXTAUTH_URL) {
    process.env.NEXTAUTH_URL = `${protocol}://${host}`;
  }

  return NextAuth(req, res, authOptions);
}

// export default NextAuth(authOptions);
