"use client"

import * as React from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import appwriteAuthService from "@/db/appwrite_auth"
import useAuth from "@/hooks/use_auth"
import Image from "next/image"
import Content from "@/public/logo/google-logo.png"


export function OAuthSignIn() {
  // const [isLoading, setIsLoading] = React.useState(null)
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const {setAuthStatus} = useAuth()

  async function oauthSignIn(provider: string) {
  }

  async function onSubmit(data: string) {
    startTransition(async () => {
      try {
        const session = await appwriteAuthService.oauthSession(data)
        if (session) {
          setAuthStatus(true)
          router.back()
        }
      } catch (err) {
        toast.message("Error occured while logging in", {
          description: `${err}`,
        })
      }
    })
  }

  return (
    <div className="grid grid-cols-1 sm:gap-4 m-auto">
          <Button
            aria-label={`Sign in with Google`}
            variant="outline"
            className="w-full bg-background sm:w-auto"
            onClick={() => void onSubmit('google')}
            disabled={isPending}
          >
            {isPending ? (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            ) : (
              <Image className="mr-3" src={Content} width={30} height={30} alt='Google Icon'/>
            )}
            Continue with Google
          </Button>
    </div>
  )
}
