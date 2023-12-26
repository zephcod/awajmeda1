'use client'
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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { absoluteUrl } from '@/lib/utils';
import axios from "axios"
import LoadingRouteUI2 from "@/components/loading/loading_route2"
import appwriteAuthService from "@/db/appwrite_auth"
import { FileDialog } from "@/components/file-dialog"
import { FileWithPreview } from "@/types"
import appwriteStorageService from "@/db/appwrite_storage"

type Inputs = z.infer<typeof promptSchema>

export default function Upload  () {
  const [files, setFiles] = useState<FileWithPreview[] | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const melaModal = useProModal()
  const txt2imgEndpoint = absoluteUrl("/api/text-image");
  
  const form = useForm<Inputs>({
    resolver: zodResolver(promptSchema),
  })

  function onSubmit(data: Inputs){
    const cost = Number(data.count)*5
    startTransition(async()=>{
      try {
        // return user
      }catch (error:any) {
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
    <div className='flex flex-col-reverse md:flex-row items-start gap-5 w-full mx-auto lg:p-8 p-3.5'>
      <Form {...form}>
        <form
          className="grid gap-5 items-start w-full h-fit"
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}>
            <div>
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
            <FormItem className="w-24">
            <FormLabel>Count</FormLabel>
            <FormControl>
              <Input
                min={1}
                max={4}
                defaultValue={1}
                type="number"
                inputMode="numeric"
                placeholder={'1'}
                {...form.register("count", {
                  valueAsNumber: true,
                })}
              />
            </FormControl>
            <UncontrolledFormMessage
              message={form.formState.errors.count?.message}
            />
          </FormItem>
            </div>
            <FormField
              // control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                <FormLabel>Choose the model used to generate image.</FormLabel>
                <FormControl>
                    <Select 
                      defaultValue='absolute_reality_1_8_1'
                      // value={field.value}
                      onValueChange={(value: typeof field.value) =>
                      field.onChange(value)
                    }>
                    <SelectTrigger>
                        <SelectValue placeholder={field.name} defaultValue={field.value} {...form.register('model')}/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectItem value="absolute_reality_1_8_1">Absolute Reality</SelectItem>
                        <SelectItem value="cyberrealistic_3_3">Cyber Realistic</SelectItem>
                        <SelectItem value="deliberate_2">Delibrate Realistic</SelectItem>
                        <SelectItem value="future_diffusion">Futuritic Mix</SelectItem>
                        <SelectItem value="icbinp_seco">High-quality Realistic</SelectItem>
                        <SelectItem value="papercut">Paper-cut Art</SelectItem>
                        <SelectItem value="stablediffusion_2_0_512px">Stable Diffusion</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                    </Select>
                </FormControl>
                <FormMessage />
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
      </div>
  )
}
