import NextAuth from "next-auth";
import AppleProvider from "next-auth/providers/apple";
import { generateAppleClientSecret } from "../../../src/lib/apple-client-secret";

export default NextAuth({
  debug: true,
  providers: [
    AppleProvider({
  clientId: process.env.APPLE_CLIENT_ID,
  clientSecret: generateAppleClientSecret(),
  authorization: {
    params: {
      scope: 'name email',
      response_type: 'code id_token',
      response_mode: 'form_post',
    },
  },
}),
  ],
  callbacks: {
    async jwt({ token, account }) {
      console.log("TOKEN: ", token)
      console.log("ACCOUNT: ", account)
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  events: {
    error(error) {
      console.error("[NextAuth ERROR]", error);
    },
  },
});
