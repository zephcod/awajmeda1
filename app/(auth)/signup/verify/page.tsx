'use client'
import React from "react"
import appwriteAuthService from "@/db/appwrite_auth"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Shell } from "@/components/shells/shell"
import { Button, buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { toast } from "sonner"
import { Icons } from "@/components/icons"
import { useRouter } from "next/navigation"
import { absoluteUrl } from "@/lib/utils"



export default function VerifyEmailPage() {
  const [isPending, startTransition] = React.useTransition()
  const [isPending2, startTransition2] = React.useTransition()
  const router = useRouter()
  const verifyCodeUrl = absoluteUrl("/signup/verify/phone");
  
  async function verifyEmail() {
    startTransition(async () => {
    try {
      await appwriteAuthService.verifyEmail()
      toast.message("Email sent:", {
       description: 'Please check your email and follow the link.',
      })
    } catch (error) {
      toast.message("Error occured:", {
        description: `${error}`,
      })
    }
  })
}

async function verifyPhone() {
  startTransition2(async () => {
    try {
      await appwriteAuthService.verifyPhone()
      toast.message("SMS sent:", {
        description: 'Please check your phone and follow the link.',
      })
      router.replace(verifyCodeUrl)
    } catch (error) {
      toast.message("Error occured:", {
       description: `${error}`,
      })
    }
  })
  }

  return (
    <Shell className="w-full relative my-48 p-6 ">
      <Card className='m-auto max-w-lg shadow-none bg-accent'>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Verify Account</CardTitle>
          <CardDescription>
            Verify your account to gain full access to Awaj AI
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex ring-1 rounded-md ring-accent p-4 flex-row justify-between items-center">
            <p className="text-sm text-card-foreground">Verify your account via email</p>
            <Button 
              onClick={verifyEmail}disabled={isPending}>
              {isPending && (
                <Icons.spinner
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              )}Verify</Button>
          </div>
          <div className="flex ring-1 rounded-md ring-accent p-4 flex-row justify-between items-center">
            <p className="text-sm text-card-foreground">Verify your account via  SMS code</p>
            <Button 
              onClick={verifyPhone}disabled={isPending2}>
              {isPending && (
                <Icons.spinner
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              )}Verify</Button>
          </div>
            <div className="flex flex-row justify-end">
              <Link href="/">
                  <div
                    className={buttonVariants({
                      variant:'ghost',
                      size: "sm",
                    })}
                    >
                    Verify later
                    <span className="sr-only">Verify later</span>
                  </div>
                </Link>
              </div>
        </CardContent>
      </Card>
    </Shell>
  )
}
