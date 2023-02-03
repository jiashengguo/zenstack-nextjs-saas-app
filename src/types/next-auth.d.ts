import { Session } from "next-auth";

/** Example on how to extend the built-in session types */
declare module "next-auth" {
  interface Session {
    user: { id: string; name: string; email: string; image?: string };
  }
}
