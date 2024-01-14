'use client'
import Image from "next/image"
import { Button } from '@/components/ui/button'
import { zodResolver } from "@hookform/resolvers/zod"
import { type z } from "zod"
import { useForm } from "react-hook-form"
import { useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
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
import { absoluteUrl } from '@/lib/utils';
import axios from "axios"
import appwriteAuthService from "@/db/appwrite_auth"
import appwriteDBService from "@/db/appwrite_db"
import appwriteStorageService from "@/db/appwrite_storage"
import { inpaintModels } from "@/config/XLmodels"

type Inputs = z.infer<typeof promptSchema>

export default function ControlledImage  () {
  const urlParams = useSearchParams()
  const paramModel = urlParams.get('model') || 'absolute_reality_1_8_1_inpaint'
  const [files, setFiles] = useState<any>()
  const [mask, setMask] = useState<any>()
  const [isPending, startTransition] = useTransition()
  const [imgsrc, setImgsrc] = useState<string|null>();
  const router = useRouter()
  const melaModal = useProModal()
  const imgInpaintEndpoint = absoluteUrl("/api/image/inpaint");
  
  const form = useForm<Inputs>({
    resolver: zodResolver(promptSchema),
    defaultValues: {
      seed:0,
      count:1
    },
  })

  function onDownload() {   
    if (imgsrc) {
      // Remove the data:image/png;base64, prefix if it exists
        const base64WithoutPrefix = imgsrc.replace(/^data:image\/[a-z]+;base64,/, '');

        // Decode base64 string
        const decodedData = atob(base64WithoutPrefix);

        // Create a Uint8Array from the decoded data
        const uint8Array = new Uint8Array(decodedData.length);
        for (let i = 0; i < decodedData.length; i++) {
          uint8Array[i] = decodedData.charCodeAt(i);
        }
      const blob = new Blob([uint8Array], { type: 'image/png' });
        const url = URL.createObjectURL(blob)
       const link = document.createElement('a');
       link.href = url;
       link.download = 'image.png';
       document.body.appendChild(link);
       link.click();
       document.body.removeChild(link);
       URL.revokeObjectURL(url);
    }
  }

  function convertFileToBase64() {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
    }
  function convertMaskToBase64() {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(mask);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
    }

  function onSubmit(data: Inputs){
    const cost = Number(data.count)*5
    startTransition(async()=>{
      try {
        const user = await appwriteAuthService.currentUser()
        if (user) {
         const uid = user!.$id
         const upimg = await convertFileToBase64()
         const maskimg = await convertMaskToBase64()
         const res = await axios.post(`${imgInpaintEndpoint}`,{
           params:{
             prompt:data.prompt,
             model:data.model,
             image:upimg,
             mask:maskimg,
             guidance:8,
             cost:cost,
             des:uid
           }
         })
         
         const _img = res.data
         setImgsrc(_img)
             // Remove the data:image/png;base64, prefix if it exists
          const base64WithoutPrefix = _img.replace(/^data:image\/[a-z]+;base64,/, '');

          // Decode base64 string
          const decodedData = atob(base64WithoutPrefix);

          // Create a Uint8Array from the decoded data
          const uint8Array = new Uint8Array(decodedData.length);
          for (let i = 0; i < decodedData.length; i++) {
            uint8Array[i] = decodedData.charCodeAt(i);
          }
         const blob = new Blob([uint8Array], { type: 'image/png' });

         // Create a File from the Blob
          const file = new File([blob], `${data.prompt}.png`||'image.png', { type: 'image/png' });

          const gen = await appwriteStorageService.uploadGenerated(file)
          const preview = await appwriteStorageService.previewFile({id:gen!.$id,bucket:'6584a911a70baf1b4a58'}) 
          const gal = {image:[gen!.$id],prompt:data.prompt,model:data.model, user:uid,preview:preview}
          const gallery = await appwriteDBService.newGalleryItem(gal)

        }
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
          className="flex-1 grid gap-5 items-start w-full lg:w-[800px] h-fit"
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}>
            <div className="flex flex-col gap-3">
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
            <Input id="images" type="file" onChange={(e)=>{setFiles(e.target.files![0])}}/>
            <Input id="mask" type="file" onChange={(e)=>{setMask(e.target.files![0])}}/>
            </div>
            <FormField
              // control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                <FormLabel>Choose the model used to generate image.</FormLabel>
                <FormControl>
                    <Select 
                      defaultValue={paramModel}
                      onValueChange={(value: typeof field.value) =>
                      field.onChange(value)
                    }>
                    <SelectTrigger className="h-14">
                        <SelectValue placeholder={field.name} defaultValue={field.value} {...form.register('model')}/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup className="h-96">
                          {inpaintModels.map((mod) => {
                            return(
                              <SelectItem value={mod.id} key={mod.id}>
                                <div className="flex flex-row items-center gap-3 h-14">
                                  <Image src={mod.image} alt="" width={72} height={72}/> {mod.title}
                                </div>
                              </SelectItem>
                            )
                          })}
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
      <div className="flex-1 flex gap-3 items-center flex-col w-full">
          {isPending?
            <div className="flex flex-col gap-2 w-full h-[512px] items-center justify-center">
              <Icons.spinner className="h-12 w-12 animate-spin" aria-hidden="true" />
              <p className="animate-pulse">...generating image</p>
            </div>
            :imgsrc ? 
            <>
              <Image width='512' height='512' src={`data:image/png;base64,${imgsrc}`} alt={''}/>
              <Button onClick={onDownload} className="w-48">
                Download
                <Icons.downlaod className="h-4 w-4 ml-2"/>
              </Button>
            </>
            :<></>}
        </div>
      </div>
  )
}
