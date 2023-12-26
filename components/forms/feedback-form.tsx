import { useState, useTransition } from 'react'
import { useRouter } from "next/navigation"
import useAuth from "@/hooks/use_auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { feedbackSchema } from '@/lib/validations/feedback'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { Button, buttonVariants } from '../ui/button'
import { Icons } from '../icons'
import Link from 'next/link'
import { Textarea } from '../ui/textarea'
import { toast } from 'sonner'
import { FileDialog } from '../file-dialog'
import { FileWithPreview } from '@/types'
import appwriteDBService from '@/db/appwrite_db'


type Inputs = z.infer<typeof feedbackSchema>

const FeedbackForm = () => {
  const [files, setFiles] = useState<FileWithPreview[] | null>(null)
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const {setAuthStatus} = useAuth()

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      title: "",
      email: "",
      desc: "",
      rate:0,
      images:""
    },
  })

  async function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
       const feedback = await appwriteDBService.sendFeedback(data)
       if (feedback) {
        toast.message("Feedback sent successfully.")
       }
        
      } catch (err) {
        toast.message("Error occured while submitting your feedback", {
          description: `${err}`,
        })
      }
    })
  }

  return (
    <div className="flex flex-col p-4 items-center">
            <Form {...form}>
                <form
                className="grid gap-4"
                onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}>
                  <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Title*</FormLabel>
                      <FormControl>
                          <Input placeholder="Feedback Subject..." {...field} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
                  <FormField
                  control={form.control}
                  name="desc"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Feedback description*</FormLabel>
                      <FormControl>
                          <Textarea  placeholder="Give a brief description of your feedback here..." {...field}/>
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
                  <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Email{' (Optional)'}</FormLabel>
                      <FormControl>
                          <Input placeholder="abe.kebe@etmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
                  <FormItem>
                  <FileDialog
                    setValue={form.setValue}
                    name="images"
                    maxFiles={3}
                    maxSize={1024 * 1024 * 4}
                    files={files}
                    setFiles={setFiles}
                    isUploading={false}
                    disabled={isPending}
                    />
                  </FormItem>
                    <div className="flex flex-col md:flex-row gap-4 my-4 mx-auto items-center">
                        <Button disabled={isPending}>
                        {isPending && (
                            <Icons.spinner
                            className="mr-2 h-4 w-4 animate-spin"
                            aria-hidden="true"
                            />
                        )}
                        Send Feedback
                        <span className="sr-only">Send Feedback</span>
                        </Button>
                    </div>
            </form>
        </Form>
        </div>
  )
}

export default FeedbackForm