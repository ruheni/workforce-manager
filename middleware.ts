
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getSession } from 'next-auth/react'
import { useSession } from "next-auth/react";

export async function middleware(request: NextRequest) {
  
    //const session = await getServerSession(authOptions); 
  

  // if (request.nextUrl.pathname.startsWith('/admin')) {
  //   return NextResponse.redirect(new URL('/admin', request.url))
  // }
 
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.rewrite(new URL('/dashboard/user', request.url))
  }

}