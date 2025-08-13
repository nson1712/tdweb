// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";

export default NextAuth({
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
       checks: ["state"], 
      // để mặc định, không custom scope/checks
    }),
  ],
  session: { strategy: "jwt" },

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

  secret: process.env.NEXTAUTH_SECRET,

  // Bật debug qua env: NEXTAUTH_DEBUG=true
  debug: process.env.NEXTAUTH_DEBUG === "true",

  // Logger để xem trong Vercel Logs
  logger: {
    error(code, metadata) {
      // Tránh log thông tin nhạy cảm trong production
      console.error("NextAuth error:", code, metadata?.error ?? metadata);
    },
    warn(code) {
      console.warn("NextAuth warn:", code);
    },
    debug(code, metadata) {
      console.debug("NextAuth debug:", code, metadata);
    },
  },
});
