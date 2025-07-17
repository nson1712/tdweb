import NextAuth from "next-auth";
import AppleProvider from "next-auth/providers/apple";

export default NextAuth({
  debug: true,
  providers: [
    AppleProvider({
  clientId: process.env.APPLE_CLIENT_ID,
  clientSecret: {
    clientId: process.env.APPLE_CLIENT_ID,
    teamId: process.env.APPLE_TEAM_ID,
    keyId: process.env.APPLE_KEY_ID,
    privateKey: process.env.APPLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
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
  pages: {
    signIn: '/dang-nhap',
    error: '/dang-nhap', // Error code passed in query string as ?error=
  },
});
