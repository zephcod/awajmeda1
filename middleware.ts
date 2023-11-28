import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import appwriteServerDBService from './db/appwrite_server_db'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    // const authStatus = appwriteServerDBService.isLoggedIn
    // if(!authStatus){
    //     return NextResponse.redirect(new URL('/tos', request.url))
    // }
}

export const config = {
    matcher: [
        '/image/:path*', 
        '/dashboard/:path*'
    ],
}