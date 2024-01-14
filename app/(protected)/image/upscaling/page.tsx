'use client'
import Image from "next/image"
import { Button } from '@/components/ui/button'
import { zodResolver } from "@hookform/resolvers/zod"
import type { FileWithPreview } from "@/types"
import { type z } from "zod"
// import { generateComponents } from "@uploadthing/react"
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
import { imguploadSchema, promptSchema } from "@/lib/validations/ai";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { FileDialog } from "@/components/file-dialog"
import { Zoom } from "@/components/zoom-image"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { absoluteUrl } from '@/lib/utils';
import axios from "axios"
import LoadingRouteUI2 from "@/components/loading/loading_route2"
import appwriteAuthService from "@/db/appwrite_auth"
import {img} from '@/public/blob/blob'

type Inputs = z.infer<typeof imguploadSchema>

// const { useUploadThing } = generateComponents<OurFileRouter>()

const Upscale = () => {
  const [files, setFiles] = useState<FileWithPreview[] | null>(null)

  // const { isUploading, startUpload } = useTransition()

  const [isPending, startTransition] = useTransition()
  const [imgsrc, setImgsrc] = useState<string|null>(img);
  const router = useRouter()
  const melaModal = useProModal()
  const upscaleImgEndpoint = absoluteUrl("api/image/upscale");
  
  const form = useForm<Inputs>({
    resolver: zodResolver(imguploadSchema),
    defaultValues: {
    },
  })

  
  const previews = form.watch("images") as FileWithPreview[] | null

  function convertFileToBase64(conv) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(conv);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
    }

  function onSubmit(data: Inputs){
    startTransition(async()=>{
      try {
        const user = await appwriteAuthService.currentUser()
        if (user) {
          
          const base64Image = data.images[0].preview.split('blob:').pop();
          console.log(base64Image)
          const imm = fetch(base64Image)
          const upimg = await convertFileToBase64(imm)
         const uid = user!.$id
         const res = await axios.post(`${upscaleImgEndpoint}`,{
           params:{
             images:data.images,
             cost:5,
             des:uid
           }
         })
         const _img = res.data
         setImgsrc(_img)
        }
      }catch (error:any) {
        if(error?.response?.status === 403){
          melaModal.onOpen()
        }
        else{console.log(error)}
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
            <FormItem className="flex w-full flex-col gap-1.5">
              {previews?.length ? (
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
              ) : null}
              <FormControl>
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
              </FormControl>
              <UncontrolledFormMessage
                message={form.formState.errors.images?.message}
              />
            </FormItem>
            <Button
            disabled={isPending}
            className="sm:max-w-[480px]"
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
            <Separator className="sm:max-w-[480px]"/>
            
        </form>
      </Form>
      {isPending?
      <LoadingRouteUI2/>
      :<Image width='500' height='200' src={`data:image/png;base64,${imgsrc}`} alt={''}/>}
      </div>
  )
}

export default Upscale