import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      user: {
        name: string;
        email: string;
        propic: number;
        _id: string;
        createdAt: Date;
        updatedAt: Date;
      };
    };
  }
}
