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

        
        const res = await fetch(
          `http://localhost:8081/gp-com/api/v1/authenticate`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
               username: credentials?.email,
            password: credentials?.password,
            }),
          }
        );
        
        // const user = await res.json();
        console.log("credentials:",res)
          const data=await  res.json()


        if (data) {
          return data;
        } else {
          return null;
        }
        {
  // "success": true,
  // "message": "Operation reussie",
  // "result": {
  //   "accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlcmljQGdtYWlsLmNvbSIsImlhdCI6MTY5NDUzNDQyMiwiZXhwIjoxNjk0NTM1ODYyfQ.igHAd1acIzhlGdYxGystF1ahHthH0Fxmq8V4be6ZIG8",
  //   "membre": null
  // }
 
}
       
      },
    }),
  ],
   pages: {
    signIn: "/login",
  },
  secret: process.env.JWT_SECRET,
};
