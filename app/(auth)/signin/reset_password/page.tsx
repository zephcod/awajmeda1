"use client"

import * as React from "react"
import appwriteAuthService from "@/db/appwrite_auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/UI/card"
import { Shell } from "@/components/shells/shell"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/UI/form"
import { Input } from "@/components/UI/input"
import { Button } from "@/components/UI/button"
import { Icons } from "@/components/UI/icons"
import { checkEmailSchema } from "@/lib/validations/auth"

type Inputs = z.infer<typeof checkEmailSchema>

export default function ResetPasswordPage() {
  const [isPending, startTransition] = React.useTransition()
  const [reset, setIsOpen] = React.useState(false);

    // react-hook-form
    const form = useForm<Inputs>({
      resolver: zodResolver(checkEmailSchema),
      defaultValues: {
        email: "",
      },
    })
 
    function onSubmit(data: Inputs) {
      startTransition(async () => {
        try {
          await appwriteAuthService.resetPasswordFirst(data)
          toast.message("Email sent:", {
            description: 'Please check your email and follow the link.',
           })
           setIsOpen(true)
        } catch (err) {
          toast.message("Error occured:", {
            description: `${err}`,
           })
        }
      })
    }

  return (
    <Shell className="max-w-lg h-screen relative my-auto p-4">
      <Card>
        <CardHeader className="space-y-1">
          {reset?<></>:
          <CardTitle className="text-2xl">Reset password</CardTitle>}
          {reset?<></>:
          <CardDescription>
            Enter your email address and we will send you a verification code
          </CardDescription>}
        </CardHeader>
        <CardContent>
          {reset?
          <div className="flex flex-col p-2 text-base text-muted-foreground text-center items-center gap-3">
            <Icons.check/>
            <p className="text-2xl font-semibold">Email Sent!</p>
            <p>Please check your email and follow the link to complete resetting your password.</p>
          </div>:
            <Form {...form}>
              <form
                className="grid gap-4"
                onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="abera180@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}/>
                <Button disabled={isPending}>
                  {isPending && (
                    <Icons.spinner
                      className="mr-2 h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                  )}
                  Continue
                  <span className="sr-only">
                    Continue to reset password verification
                  </span>
                </Button>
              </form>
            </Form>}
        </CardContent>
      </Card>
    </Shell>
  )
}
