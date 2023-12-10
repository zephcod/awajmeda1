'use client'
import { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useAuth from '@/hooks/use_auth'
import { toast } from 'sonner'
import LoadingRouteUI2 from '@/components/loading/loading_route2'
import appwriteAuthService from '@/db/appwrite_auth'
import { AwajUser } from '@/lib/validations/user'

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
        if (appuser) {
          setUser(appuser)
        }
    }) ();
        setLoadingUser(false)
      }, [])

      if (loadingUser){
        return (
          <LoadingRouteUI2/>
        )
      }

    if (user) {
        return children
    }
    if (!user) {
      return (
        <div>
          Please sign in to continiue
        </div>
      )
    }
}

export default Layout