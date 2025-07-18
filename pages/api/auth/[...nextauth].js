import NextAuth from "next-auth";
import AppleProvider from "next-auth/providers/apple";

export default NextAuth({
  providers: [
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID,
      clientSecret: process.env.APPLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      console.log("TOKEN:", token);
      console.log("ACCOUNT:", account);
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
  cookies: {
    csrfToken: {
      name: "next-auth.csrf-token",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

// export default NextAuth({
//   debug: true,
//   trustHost: true, // 👈 THÊM cái này nếu dùng vercel hoặc ngrok
//   providers: [
//     AppleProvider({
//       clientId: process.env.APPLE_CLIENT_ID,
//       clientSecret: async () => generateAppleClientSecret(),
//       authorization: {
//         params: {
//           scope: "name email",
//           response_type: "code id_token",
//           response_mode: "form_post",
//         },
//       },
//     }),
//   ],
//   cookies: {
//     pkceCodeVerifier: {
//       name: "__Secure-next-auth.pkce.code_verifier",
//       options: {
//         httpOnly: true,
//         sameSite: "none", // 👈 CỰC QUAN TRỌNG
//         path: "/",
//         secure: true,
//       },
//     },
//   },
//   callbacks: {
//     async jwt({ token, account }) {
//       if (account) {
//         token.accessToken = account.access_token;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.accessToken = token.accessToken;
//       return session;
//     },
//   },
//   events: {
//     error(error) {
//       console.error("[NextAuth ERROR]", error);
//     },
//   },
// });
