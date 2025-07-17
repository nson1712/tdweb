import NextAuth from "next-auth";
import AppleProvider from "next-auth/providers/apple";

export default NextAuth({
  providers: [
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID,
      clientSecret: {
        clientId: process.env.APPLE_CLIENT_ID,
        teamId: process.env.APPLE_TEAM_ID,
        privateKey: process.env.APPLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        keyId: process.env.APPLE_KEY_ID,
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
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
});
