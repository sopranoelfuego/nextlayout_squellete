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
<<<<<<< HEAD
        email: { label: "email", type: "text", placeholder: "eric" },
        password: { label: "Password", type: "password" },
      },
     async  authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        const res = await fetch(`http://192.168.40.53:8081/gp-com/api/v1/login`, {
=======
        username: { label: "Username", type: "text", placeholder: "eric" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        const res = await fetch("http://localhost:8000/auth/login", {
>>>>>>> bec97b11628c2faddebb1d98d28b2f219618e956
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
<<<<<<< HEAD
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
=======
            username: credentials?.username,
            password: credentials?.password,
          }),
        });
        const user = await res.json();

        if (user) {
          return user;
        } else {
          return null;
        }
>>>>>>> bec97b11628c2faddebb1d98d28b2f219618e956
      },
    }),
  ],
   pages: {
    signIn: "/login",
  },
  secret: process.env.JWT_SECRET,
};
