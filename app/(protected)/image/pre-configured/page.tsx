'use client'
import * as React from "react"
import { getTextImage } from '@/app/_actions/ai/text-image';
import { Button } from '@/components/ui/button'
import { zodResolver } from "@hookform/resolvers/zod"
import { type z } from "zod"
import { useForm } from "react-hook-form"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useProModal } from '@/hooks/use-pro-modal';
import { Icons } from '@/components/icons';
import Image from "next/image"
import { img } from "./blob";
import { Form,
          FormControl,
          FormField,
          FormItem,
          FormLabel,
          FormMessage,
          UncontrolledFormMessage, 
        } from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { promptSchema } from "@/lib/validations/ai";

type Inputs = z.infer<typeof promptSchema>

export default function PreConfImg  () {
  
  const [isPending, startTransition] = React.useTransition()
  const [imgSrc, setImgSrc] = useState(img);
  const router = useRouter()
  const melaModal = useProModal()

  const form = useForm<Inputs>({
    resolver: zodResolver(promptSchema),
  })

  function onSubmit(data: Inputs){
    startTransition(async()=>{
      try {
        const f = await getTextImage(data)
          const res = JSON.stringify(f)
          setImgSrc(res)
          form.reset()
      } catch (error:any) {
        if(error?.response?.status === 403){
          melaModal.onOpen()
        }
      }
      finally {
        router.refresh()
      }
    }
    )
  }
  return (
    <div className='flex flex-col gap-4 w-full mx-auto lg:p-8 p-3.5'>
      <Form {...form}>
        <form
          className="grid w-full max-w-2xl gap-5"
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}>
            <FormItem className="w-full">
              <FormLabel>Stable Diffusion XL</FormLabel>
              <FormControl>
                <Input
                  aria-invalid={!!form.formState.errors.prompt}
                  placeholder="Type your prompt here..."
                  {...form.register("prompt")}
                />
              </FormControl>
              <UncontrolledFormMessage
                message={form.formState.errors.prompt?.message}
              />
            </FormItem>
            <Button
            disabled={isPending}
            // onClick={onSubmit}
            >
            {isPending && (
              <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
              />
              )}
            Generate
            </Button>
        </form>
      </Form>
      <Image width='500' height='200' src={`data:image/png;base64,${imgSrc}`} alt={''}/>
      </div>
  )
}
