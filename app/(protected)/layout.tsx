'use client'
import { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import appwriteAuthService from '@/db/appwrite_auth'
import LoadingSimple from '@/components/loading/loading_simple'
import Image from "next/image"
import logo from '@/public/logo/awaj_ai_logo_monochrome.png'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const Layout = ({ children }: { children: ReactNode }) =>{
    const router = useRouter()
    // const user = useAuth().authStatus
    const [loadingUser, setLoadingUser] = useState(true)
    const [user, setUser] = useState<boolean>(false)

  //   function delay(ms:any) {
  //     return new Promise((resolve) => {
  //        setTimeout(resolve, ms);
  //     })
  //  }

    useEffect(() => {
      (async ()=> {
        const appuser = await appwriteAuthService.isLoggedIn()
        setUser(appuser)
        setLoadingUser(false)
    }) ();
      }, [])

      if (loadingUser){
        return (
          <LoadingSimple/>
        )
      }

    if (user) {
        return children
    }
    if (!user) {
      return (
        <div className='w-full pt-12 mx-auto flex flex-col items-center justify-start'>
         <Image width='60' height='60' src={logo} alt={''}/>
          <p className='font-bold text-lg'>Authentication required</p>
          <p className='p text-muted-foreground pt-1'>Make sure you are connected to the internet and log in to continue.</p>
          <div className='flex flex-row gap-3 mt-6'>
          <Link
            href={`/signin`}
            className={cn(
              buttonVariants({
                variant: "outline",
                className: "w-24",
              })
            )}
          >
            Login
            <span className="sr-only"> login</span>
          </Link>
          <Link
            href={`/signup`}
            className={cn(
              buttonVariants({
                variant: "outline",
                className: "w-24",
              })
            )}
          >
            Sign up
            <span className="sr-only">signup</span>
          </Link>
          </div>
        </div>
      )
    }
}

export default Layout