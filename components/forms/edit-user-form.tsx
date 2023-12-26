"use client"

import { useState, useTransition } from 'react'
import Image, { StaticImageData } from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { type z } from "zod"

// import { getSubcategories } from "@/config/products"
import { absoluteUrl, catchError, isArrayOfFile } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  UncontrolledFormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/icons"
import { useRouter } from "next/navigation"
import { AwajUser, userSchema } from "@/lib/validations/user"
import appwriteAuthService from "@/db/appwrite_auth"
import appwriteStorageService from "@/db/appwrite_storage"
import BG from '@/public/gallery/pre-conf/portriat.png'
import axios from 'axios'


type Inputs = z.infer<typeof userSchema>


export function EditUserForm( props:Inputs ) {
  const router = useRouter()
  const [files, setFiles] = useState<File | StaticImageData | null>(BG)
  const [isPending, startTransition] = useTransition()
  const accUrl = absoluteUrl("/dashboard/account");


  const form = useForm<Inputs>({
    resolver: zodResolver(userSchema),
  })


  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        const user = await appwriteAuthService.currentUser()
        if (user!.name !== data.name) {
          await appwriteAuthService.updateName(data.name)
        }
        const pref = await appwriteAuthService.getPreferences()
        const coin = pref?.coin
        if (user&&files) {
            const uid = user!.$id
            const res = await appwriteStorageService.uploadProfile(files)
            console.log(res)

              if (res) {
                const proPic = res!.$id
                await axios.get('/api/update-profile',{
                  params:{
                    img:proPic,
                    des:uid,
                    c:coin
                  }
                })
              }

            toast.message("Success", {
              description: 'Your account has been successfully updated.',
            })
            router.push(accUrl)
            form.reset()
            setFiles(null)
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
        className="grid w-full max-w-2xl gap-5"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input
              aria-invalid={!!form.formState.errors.name}
              placeholder="Type your display name here."
              defaultValue={props.name}
              {...form.register("name")}
            />
          </FormControl>
          <UncontrolledFormMessage
            message={form.formState.errors.name?.message}
          />
        </FormItem>
        <FormItem>
          <FormLabel>Bio</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Type a short bio here."
              defaultValue={props.bio}
              {...form.register("bio")}
            />
          </FormControl>
          <UncontrolledFormMessage
            message={form.formState.errors.bio?.message}
          />
        </FormItem>
        <FormItem>
          <FormLabel>Profile picture</FormLabel>
          <Input id="profilePic" type="file" onChange={(e)=>{setFiles(e.target.files![0])}}/>
        </FormItem>
        <Button className="w-fit" disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Update Account
          <span className="sr-only">Update Account</span>
        </Button>
      </form>
    </Form>
  )
}
