"use client"

import * as React from "react"
import Image from "next/image"
import type { FileWithPreview } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { type z } from "zod"

// import { getSubcategories } from "@/config/products"
import { absoluteUrl, catchError, isArrayOfFile } from "@/lib/utils"
import { productSchema } from "@/lib/validations/product"
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FileDialog } from "@/components/file-dialog"
import { Icons } from "@/components/icons"
import { Zoom } from "@/components/zoom-image"
import appwriteDBService from "@/db/appwrite_db"
import { useRouter } from "next/navigation"
import { userSchema } from "@/lib/validations/user"


type Inputs = z.infer<typeof userSchema>


export function EditUserForm( props:Inputs ) {
  const router = useRouter()
  const [files, setFiles] = React.useState<FileWithPreview[] | null>(null)
  const [isPending, startTransition] = React.useTransition()
  const accUrl = absoluteUrl("/dashboard/account");

  const form = useForm<Inputs>({
    resolver: zodResolver(userSchema),
  })

  const previews = form.watch("profilePic") as unknown as FileWithPreview[] | null
  // const subcategories = getSubcategories()

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        await appwriteDBService.updateUser(data)
        toast.message("Congratulations!", {
          description: 'Your phone has been confirmed',
        })
        router.push(accUrl)
        form.reset()
        setFiles(null)
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
        <FormItem className="flex w-full flex-col gap-1.5">
          <FormLabel>Images</FormLabel>
          {/* {!isUploading && previews?.length ? (
            <div className="flex items-center gap-2">
              {previews.map((file) => (
                <Zoom key={file.name}>
                  <Image
                    src={file.preview}
                    alt={file.name}
                    className="h-20 w-20 shrink-0 rounded-md object-cover object-center"
                    width={80}
                    height={80}
                  />
                </Zoom>
              ))}
            </div>
          ) : null} */}
          <FormControl>
            <FileDialog
              setValue={form.setValue}
              name="profilePic"
              maxFiles={3}
              maxSize={1024 * 1024 * 4}
              files={files}
              setFiles={setFiles}
              // isUploading={isUploading}
              disabled={isPending}
            />
          </FormControl>
          <UncontrolledFormMessage
            message={form.formState.errors.profilePic?.message}
          />
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
