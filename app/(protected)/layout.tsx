'use client'
import React, { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import appwriteAuthService from '@/db/appwrite_auth'
import useAuth from '@/hooks/use_auth'

const Layout = ({ children }: { children: ReactNode }) =>{
    const [user, setUser] = useState(false);
    const [loadingUser, setLoadingUser] = useState(true)
    const router = useRouter()

    const nigga = useAuth().authStatus

    // useEffect(() => {
    //     async function getUser(){
    //     //   setUser(await appwriteAuthService.isLoggedIn())
    //     setUser(useAuth().authStatus)
    //       setLoadingUser(false)
    //     }
    //     getUser();
    //   }, [])

    //   if (loadingUser){
    //     return (
    //       <div className="bg-gray-800 p-8 max-w-sm mx-auto rounded-lg shadow-md mt-10">
    //         <div className="flex items-center space-x-4">
    //           <svg className="animate-spin h-6 w-6 text-blue-500 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    //             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    //           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    //           </svg>
    //           <p className="text-white font-semibold text-lg">Loading user...</p>
    //         </div>
    //       </div>
    //     )
    //   }
    if (nigga) {
        return children
    }
    router.push('/tos')
    return(
    <div>Nada</div>
        )
}

export default Layout