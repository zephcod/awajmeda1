'use client'
import { Button } from '@/components/UI/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/UI/card'
import { Icons } from '@/components/UI/icons'
import { Shell } from '@/components/shells/shell'
import appwriteAuthService from '@/db/appwrite_auth'
import useAuth from '@/hooks/use_auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const LogOut = () => {
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()
  const {setAuthStatus} = useAuth()

  async function logout (){
    startTransition(async () => {
    await appwriteAuthService.logOut()
    .then(()=>{
      setAuthStatus(false)
      router.replace('/')
    })
  })
  }

  function getback(){
    router.back()
  }

  return (
    <Shell className="max-w-lg my-auto relative h-screen p-6 md:pt-0">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Logging Out?</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
            <div className="text-sm text-muted-foreground">
              Before logging out, if there is any issue please reach{" "}
              <Link
                aria-label="Sign in"
                href="/company/help_center"
                className=" text-card-foreground underline-offset-4 transition-colors hover:underline"
              >
                support 🡥 
              </Link>
            </div>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground ">
              awaj ai
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className='justify-evenly'>
          <Button variant='destructive' onClick={logout} disabled={isPending}>
              {isPending && (
                <Icons.spinner
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"/>)}
                  Log Out</Button>
          <Button variant='outline' onClick={getback}>Get Back</Button>
        </CardFooter>
      </Card>
    </Shell>
  )
}

export default LogOut