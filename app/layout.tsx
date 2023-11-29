'use client'
import '@/styles/globals.css'
import { GlobalNav } from '@/components/layouts/sidenav'
import { Toaster } from "@/components/ui/toaster"
import { Providers } from '@/components/providers'
import React, { Suspense, useState, useEffect } from 'react'
import { AuthProvider } from '@/context/authContext'
import appwriteAuthService from "@/db/appwrite_auth"
import Nav from '@/components/layouts/sidedata'
import { ModalProvider } from '@/components/layouts/modal-provider'
import { Icons } from '@/components/icons'


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
            <div className='fixed hidden lg:flex h-16 -mt-20 pl-72 left-0 right-0'>
              <div className='bg-card ring-1 ring-border w-[500px] h-full mx-auto rounded-lg shadow-sm'>
                <div className="flex flex-row w-full items-center gap-x-2.5 mt-6 px-4 justify-evenly">
                  <div className='flex flex-row items-center'>
                    <Icons.awajlogocircle/>
                    <h3 className="font-semibold text-sm tracking-wide text-secondary ml-2">
                        Awaj Meda
                    </h3>
                  </div>
                  <p className='ring-1 ring-border px-4 py-1 text-sm text-muted-foreground rounded-sm'>
                  ለማጅ ነን | This is beta mode ...
                  </p>
                </div>
              </div>
            </div>
            <Suspense fallback = {<GlobalNav apiLimitCount = {0}/>}>
              {Nav()}
            </Suspense>
                <div className="fixed bottom-2 lg:bottom-8 left-2 lg:left-80 top-16 lg:top-24 right-2 lg:right-8">
                  <div className="bg-card h-full rounded-lg shadow-md ring-1 ring-border ring-inset overflow-auto">
                    {children}
                  </div>
                </div>
          </div>
          <ModalProvider/>
          </AuthProvider> 
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
