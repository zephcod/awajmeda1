"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"

import { absoluteUrl } from "@/lib/utils"
import { updatePhoneSchema, verfifyEmailSchema } from "@/lib/validations/auth"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"
import appwriteAuthService from "@/db/appwrite_auth"

type Inputs = z.infer<typeof updatePhoneSchema>

export function UpdatePhoneForm() {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const verUrl = absoluteUrl("/signup/verify/phone");
  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(updatePhoneSchema),
    defaultValues: {
      phone: "",
    },
  })

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        await appwriteAuthService.updatePhone({phone:data.phone,pass:'123123123'})
        await appwriteAuthService.verifyPhone()
        toast.message("SMS sent:", {
            description: 'Please check your phone and follow the link.',
        })
        router.replace(verUrl)
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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number:</FormLabel>
              <FormControl>
                <Input
                  placeholder="+251911223344"
                  {...field}
                  onChange={(e) => {
                    e.target.value = e.target.value.trim()
                    field.onChange(e)
                  }}
                />
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
          Continue
          <span className="sr-only">
            Continue to reset password verification
          </span>
        </Button>
      </form>
    </Form>
  )
}
