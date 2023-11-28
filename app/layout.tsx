import '@/styles/globals.css'
import { GlobalNav } from '@/components/layouts/sidenav'
import { Toaster } from "@/components/ui/toaster"
import { Providers } from '@/components/providers'
import { Suspense } from 'react'
import Nav from '@/components/layouts/sidedata'
import { Icons } from '@/components/icons'


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <div className="bg-[url('/grid.svg')] pb-36 pt-16 min-h-screen">
            <div className='hidden lg:flex h-16 -mt-20 pl-72'>
              <div className='bg-card ring-1 ring-border w-[500px] h-full mx-auto rounded-lg shadow-sm'>
                <div className="flex flex-row w-full items-center gap-x-2.5 mt-6 px-4 justify-evenly">
                  <div className='flex flex-row items-center'>
                    <Icons.awajlogocircle/>
                    <h3 className="font-semibold text-sm tracking-wide text-secondary ml-2">
                        Awaj Meda
                    </h3>
                  </div>
                  <p className='ring-1 ring-border px-4 py-1 text-sm text-muted-foreground rounded-sm'>
                    Learn more about Awaj AI from our resources...
                  </p>
                </div>
              </div>
            </div>
            <Suspense fallback = {<GlobalNav apiLimitCount = {0}/>}>
              {await Nav()}
            </Suspense>
              <div className="lg:pl-72">
                <div className="mx-auto max-w-7xl  space-y-8 px-2 lg:px-8 lg:py-8">
                  <div className="bg-card rounded-lg p-px shadow-md ring-1 ring-border">
                    <div className="rounded-lg p-3.5 lg:p-6">{children}</div>
                  </div>
                </div>
              </div>
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
