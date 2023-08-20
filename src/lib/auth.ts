import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_AUTH_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_AUTH_SECRET_ID!,
    }),
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "email", type: "text", placeholder: "eric" },
        password: { label: "Password", type: "password" },
      },
     async  authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        const res = await fetch(`http://192.168.40.53:8081/gp-com/api/v1/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials?.email,
            password: credentials?.password,
          }),
        });
        
        // const user = await res.json();
        console.log("credentials:",res)
        return res
        // const user={email:"eric@gmail.com",password:"123"}

        // if (credentials?.email === user.email && user?.password === credentials?.password) {
        //   return user;
        // } else {
        //   return null;
        // }
      },
    }),
  ],
   pages: {
    signIn: "/login",
  },
  secret: process.env.JWT_SECRET,
};
