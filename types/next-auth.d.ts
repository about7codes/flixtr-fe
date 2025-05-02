import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      authToken: string;
      user: {
        name: string;
        email: string;
        propic: number;
        isAdmin: boolean;
        _id: string;
        createdAt: Date;
        updatedAt: Date;
      };
    };
  }
}
