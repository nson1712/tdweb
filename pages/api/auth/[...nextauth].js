

// import NextAuth, { NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import FacebookProvider from "next-auth/providers/facebook";

// export const authOptions = {
//   providers: [
//     // GoogleProvider({
//     //   clientId: process.env.GOOGLE_CLIENT_ID,
//     //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     // }),
//     FacebookProvider({
//       clientId: process.env.FACEBOOK_CLIENT_ID,
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//       authorization: {
//         params: {
//           scope: "email,public_profile",
//         },
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   callbacks: {
//     async jwt({ token, account }) {
//       console.log("JWT Callback:", token, account);
//       if (account?.provider === "google" || account?.provider === "facebook") {
//         token.idToken = account.id_token;
//         token.accessToken = account.access_token;
//         token.provider = account.provider;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       console.log("Session Callback:", session, token);
//       session.user = {
//         email: token.email,
//         name: token.name,
//         image: token.picture,
//       };
//       session.idToken = token.idToken;
//       session.accessToken = token.accessToken;
//       session.provider = token.provider;
//       return session;
//     },
//   },
//   // cookies: {
//   //   sessionToken: {
//   //     name: "next-auth.session-token",
//   //     options: {
//   //       httpOnly: true,
//   //       secure: process.env.NODE_ENV === "production",
//   //       sameSite: "none",
//   //       path: "/",
//   //     },
//   //   },
//   // },
//   pages: {
//     signIn: "/dang-nhap",
//   },
// };

// export default NextAuth(authOptions)


import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      authorization: {
        params: { scope: "public_profile,email" },
      },
      // Bảo đảm map đủ trường user kể cả khi Facebook ko trả email
      profile(profile) {
        // profile có thể là: { id, name, email?, picture? ... }
        return {
          id: profile.id?.toString(),
          name: profile.name || profile.first_name || profile.last_name || null,
          email: profile.email || null,
          image: profile.picture?.data?.url || profile.picture || null,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" }, // rõ ràng
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // Lần đăng nhập đầu sẽ có user/account/profile
      if (account && user) {
        token.user = {
          id: user.id,
          name: user.name ?? token.user?.name ?? null,
          email: user.email ?? token.user?.email ?? null,
          image: user.image ?? token.user?.image ?? null,
        };
        token.accessToken = account.access_token ?? token.accessToken;
        token.provider = account.provider ?? token.provider;
      }
      return token;
    },
    async session({ session, token }) {
      // Đừng overwrite mù quáng; merge từ token
      session.user = {
        ...session.user,
        ...(token.user || {}),
      };
      session.accessToken = token.accessToken ?? null;
      session.provider = token.provider ?? null;
      return session;
    },
  },
  pages: {
    signIn: "/dang-nhap",
  },
};

export default NextAuth(authOptions);
