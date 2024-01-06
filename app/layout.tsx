'use client'
import '@/styles/globals.css'
import React, { useState, useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { AuthProvider } from '@/context/authContext'
import { Providers } from '@/components/providers'
import { ModalProvider } from '@/components/layouts/modal-provider'
import appwriteAuthService from "@/db/appwrite_auth"
import { Toaster } from "@/components/ui/toaster"
import { GlobalNav } from '@/components/layouts/sidenav'
import TronHeader from '@/components/layouts/tron-header'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const[authStatus, setAuthStatus] = useState(false)

  useEffect(()=>{
    appwriteAuthService.isLoggedIn()
    .then(setAuthStatus)
  }, [])

  return (
    <html lang="en">
      <body>
        <Providers attribute="class" defaultTheme="system" enableSystem>
        <AuthProvider value={{authStatus, setAuthStatus}}>
          <div className="bg-[url('/grid.svg')] pb-8 pt-16 min-h-screen bg-scroll">
            <TronHeader/>
            <GlobalNav/>
                <div className="fixed bottom-2 lg:bottom-8 left-2 lg:left-80 top-16 lg:top-24 right-2 lg:right-8">
                  <div className="bg-card h-full rounded-lg shadow-md ring-1 ring-border ring-inset overflow-auto">
                    {children}
                  </div>
                </div>
          </div>
          <ModalProvider/>
          </AuthProvider> 
          <Analytics />
          <SpeedInsights/>
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
