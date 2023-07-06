import type { User } from "@prisma/client";
import type { DefaultSession, DefaultUser } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      image: User['image'];
      name: User['username'];
      follows: User['follows'];
      blockedUsers: User['blockedUsers'];
      starred: User['starred'];
      bookmarked: User['bookmarked'];
    } & DefaultSession["user"];
  }

  // Note: using "User" from prisma. not self referencing
  interface User {
    id: string;
    image: User['image'];
    name: User['username'];
    follows: User['follows'];
    blockedUsers: User['blockedUsers'];
    starred: User['starred'];
    bookmarked: User['bookmarked'];
  }
}
