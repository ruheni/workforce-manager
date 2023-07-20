import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/app/lib/prisma";

export const authOptions: NextAuthOptions = {
    
    providers: [
      CredentialsProvider({
        id: "credentials",
        name: "Credentials",
        type: "credentials",
        credentials: {
          name: { label: "Company", type: "text", placeholder: "demo-name" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
  
          const { name, password } = credentials as { name: string; password: string;};
         
          const company = await prisma.company.findUnique({
            where: { name },
          })
  
          if (company && company.password == password){
            return { id: company.id,
                     name: company.name,
                     role: "employee",
            }
          }
          if (company && company.adminPassword == password){
            return { id: company.id,
                     name: company.name, 
                     role: "admin",
            }
          }
          return null;  
        }
      })
  
    ],
  
    callbacks: {
      async signIn({ user, credentials }) {
        return true;
      },
      async jwt({ token, user, account}) {
        console.log("token from nextauthfile", token)	;
        if (user) {
          token = user as any;
        }
        return token;
      },
      async session({ session, token }) { 
          session.user = token;
          return session;
      },
      
      async redirect({ url, baseUrl }) {
         return '/admin';
      },
    }
  };
  