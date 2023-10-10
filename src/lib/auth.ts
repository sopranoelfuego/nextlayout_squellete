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
      id:"credentials",
      name: "ziganya",

      credentials: {
        email: { label: "email", type: "text", placeholder: "eric" },
        password: { label: "Password", type: "password" },
      },
     async  authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        
        const res = await fetch(
          `${process.env.ROOT_API}/authenticate`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
               email: credentials?.email,
                password: credentials?.password,
            }),
          }
        );
        
          const user = await res.json();
          console.log("user:",res.ok,user)
        if (!res.ok) {
          throw new Error(user.message);
        }
        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }

        // Return null if user data could not be retrieved
        return null;
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
    error:"/login",
    // error:"error avec login"
  },
  secret: process.env.JWT_SECRET,
};
