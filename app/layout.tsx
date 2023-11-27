import '@/styles/globals.css'
import { GlobalNav } from '@/components/layouts/sidenav'
import { Toaster } from "@/components/ui/toaster"
import { Providers } from '@/components/providers'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <div className="bg-[url('/grid.svg')] pb-36 pt-16 min-h-screen">
              <GlobalNav />
              <div className="lg:pl-72">
                <div className="mx-auto max-w-7xl  space-y-8 px-2 lg:px-8 lg:py-8">
                  <div className="bg-card rounded-lg p-px shadow-md">
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
