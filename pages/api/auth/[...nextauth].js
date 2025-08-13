

import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions = {
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "public_profile email",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      console.log("JWT Callback:", token, account);
      if (account?.provider === "google" || account?.provider === "facebook") {
        token.idToken = account.id_token;
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session Callback:", session, token);
      session.user = {
        email: token.email,
        name: token.name,
        image: token.picture,
      };
      session.idToken = token.idToken;
      session.accessToken = token.accessToken;
      session.provider = token.provider;
      return session;
    },
  },
  debug: true, // bật verbose logs (server)
  logger: {
    debug: (code, ...args) => console.log("[NEXTAUTH][DEBUG]", code, ...args),
    warn:  (code, ...args) => console.warn("[NEXTAUTH][WARN]", code, ...args),
    error: (code, ...args) => console.error("[NEXTAUTH][ERROR]", code, ...args),
  },
  events: {
    signIn: (message) => console.log("[EVENT] signIn", message),
    signOut: (message) => console.log("[EVENT] signOut", message),
    session: (message) => console.log("[EVENT] session", message),
    linkAccount: (message) => console.log("[EVENT] linkAccount", message),
  },
  // cookies: {
  //   sessionToken: {
  //     name: "next-auth.session-token",
  //     options: {
  //       httpOnly: true,
  //       secure: process.env.NODE_ENV === "production",
  //       sameSite: "none",
  //       path: "/",
  //     },
  //   },
  // },
  pages: {
    signIn: "/dang-nhap",
  },
};

export default NextAuth(authOptions)
