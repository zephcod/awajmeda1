'use client'
import { getTextImage } from '@/app/_actions/ai/text-image';
import Image from "next/image"
import { Button } from '@/components/ui/button'
import { zodResolver } from "@hookform/resolvers/zod"
import { type z } from "zod"
import { useForm } from "react-hook-form"
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useProModal } from '@/hooks/use-pro-modal'
import { Icons } from '@/components/icons'
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
import { img } from "./blob";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

type Inputs = z.infer<typeof promptSchema>

export default function GenerateButton  () {
  
  const [isPending, startTransition] = useTransition()
  const [imgsrc, setImgsrc] = useState(img);
  const router = useRouter()
  const melaModal = useProModal()
  // const [silverMela, setSilverMela] = useState<[number]>([2])

  const form = useForm<Inputs>({
    resolver: zodResolver(promptSchema),
  })

  function onSubmit(data: Inputs){
    startTransition(async()=>{
      try {
        const f = await getTextImage(data)
          setImgsrc(f)
          // form.reset()
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
    <div className='flex flex-col md:flex-row items-start gap-5 w-full mx-auto lg:p-8 p-3.5'>
      <Form {...form}>
        <form
          className="grid gap-5 items-start w-full h-fit"
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}>
            <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Type your prompt here</FormLabel>
              <FormControl>
                <Textarea
                  aria-invalid={!!form.formState.errors.prompt}
                  placeholder="Describe how the final image should look like..."
                  {...form.register("prompt")}
                  />
              </FormControl>
              <UncontrolledFormMessage
                message={form.formState.errors.prompt?.message}
              />
            </FormItem>
          )}
          />
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
            <Separator/>
            
        </form>
      </Form>
      <Image width='500' height='200' src={`data:image/png;base64,${imgsrc}`} alt={''}/>
      </div>
  )
}
