'use client'
import { ReactNode, useEffect, } from 'react'
import { useRouter } from 'next/navigation'
import useAuth from '@/hooks/use_auth'

const Layout = ({ children }: { children: ReactNode }) =>{
    const router = useRouter()
    const user = useAuth().authStatus


    useEffect(() => {
        if (!user) {
            if (!user) {
              router.push('/tos');
            }
          }
      }, [user])

    if (user) {
        return children
    }
}

export default Layout