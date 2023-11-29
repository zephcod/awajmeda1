"use client"
import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"

import { resetPasswordSchema } from "@/lib/validations/auth"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Icons } from "@/components/icons"
import { PasswordInput } from "@/components/password_input"
import appwriteAuthService from "@/db/appwrite_auth"
import { absoluteUrl } from "@/lib/utils"

type Inputs = z.infer<typeof resetPasswordSchema>
interface ResetProps {
  user:string
  sec:string
}
export function ResetPasswordStep2Form({user,sec}:ResetProps){
  const router = useRouter()
  const loginUrl = absoluteUrl("/signin");
  const [isPending, startTransition] = React.useTransition()

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        if (user && sec) {
          await appwriteAuthService.resetPasswordSecond(user,sec,data.password,data.confirmPassword)
          toast.message("Password Updated:", {
            description: 'Please reach support if there is any issue with your account',
           })
           router.push(loginUrl)
        }
      } catch (err) {
        toast.message("Error occured:", {
          description: `${err}`,
         })
      }
    })
  }


  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="*********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="*********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Reset password
          <span className="sr-only">Reset password</span>
        </Button>
      </form>
    </Form>
  )
}
