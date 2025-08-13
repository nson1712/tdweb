import { NextAuthOptions } from "next-auth";
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
          scope: "email,public_profile",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "google" || account?.provider === "facebook") {
        token.idToken = account.id_token;
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
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
