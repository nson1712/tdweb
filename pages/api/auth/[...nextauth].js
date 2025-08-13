import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      version: "v20.0",
      authorization: { params: { scope: "public_profile,email" } }, // chỉ scope
      // KHÔNG set authorization.url, KHÔNG response_type thủ công
      // KHÔNG bật OIDC ở Facebook
      checks: ["state"], // giữ mặc định cho FB
      profile(profile) {
        return {
          id: profile.id?.toString(),
          name: profile.name || null,
          email: profile.email || null,
          image: profile.picture?.data?.url || profile.picture || null,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.user = {
          id: user.id,
          name: user.name ?? null,
          email: user.email ?? null,
          image: user.image ?? null,
        };
        token.accessToken = account.access_token ?? token.accessToken;
        token.provider = account.provider ?? token.provider;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = { ...session.user, ...(token.user || {}) };
      session.accessToken = token.accessToken ?? null;
      session.provider = token.provider ?? null;
      return session;
    },
  },
  pages: { signIn: "/dang-nhap" },
  debug: true,
};

export default NextAuth(authOptions);