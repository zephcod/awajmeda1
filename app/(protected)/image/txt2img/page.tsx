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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { absoluteUrl } from '@/lib/utils';
import axios from "axios"
import appwriteAuthService from "@/db/appwrite_auth"
import appwriteDBService from "@/db/appwrite_db"
import appwriteStorageService from "@/db/appwrite_storage"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio"
import { Slider } from "@/components/ui/slider"
import { models } from "@/config/models"

type Inputs = z.infer<typeof promptSchema>

export default function GenerateButton  () {
  const urlParams = useSearchParams()
  const paramModel = urlParams.get('model') || 'absolute_reality_1_8_1'
  
  const [isPending, startTransition] = useTransition()
  const [imgsrc, setImgsrc] = useState<string|null>(null);
  const [count, setCount] = useState<number>(5);
  const [height, setHeight] = useState<[number]>([512])
  const [width, setWidth] = useState<[number]>([512])
  const [guidance, setGuidance] = useState<[number]>([7])
  const [steps, setSteps] = useState<[number]>([30])
  const router = useRouter()
  const melaModal = useProModal()
  const txt2imgEndpoint = absoluteUrl("/api/image/text-image");
  
  const form = useForm<Inputs>({
    resolver: zodResolver(promptSchema),
    defaultValues: {
      seed:0
    },
  })

  function onDownload() {   
    if (imgsrc ) {
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

  function onSubmit(data: Inputs){
    // const cost = Number(data.count)*5
    startTransition(async()=>{
      try {
        let uid = '0'
        const user = await appwriteAuthService.currentUser()
        if (user) {
         uid = user!.$id
         const res = await axios.post(`${txt2imgEndpoint}`,{
           params:{
             prompt:data.prompt,
             negative:data.negative,
             model:data.model,
             cost:count,
             guidance:guidance[0],
             steps:steps[0],
             seed:data.seed,
             sampler:data.sampler,
             height:height[0],
             width:width[0],
             des:uid
           }
         })
         
         const _img = res.data.image
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
    <div className='flex flex-col-reverse justify-center md:flex-row items-start gap-5 w-full mx-auto lg:p-8 p-3.5'>
      <Form {...form}>
        <form
          className="flex-1 grid gap-5 items-start w-full h-fit"
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
                      defaultValue={paramModel}
                      // value={field.value}
                      onValueChange={(value: typeof field.value) =>
                      field.onChange(value)
                    }>
                    <SelectTrigger className="h-14">
                        <SelectValue  placeholder={field.name} defaultValue={field.value} {...form.register('model')}/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup className="h-96">
                          {models.map((mod) => {
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
            <Accordion type="single" collapsible className="w-full bg-accent rounded-md">
              <AccordionItem value='Question 1' className="border-b-0">
                  <AccordionTrigger className="text-sm capitalize px-3">
                      Advanced Settings
                  </AccordionTrigger>
                  <AccordionContent>
                      <div className="flex flex-col bg-accent ml-2 lg:ml-6 p-3 lg:p-4 rounded-md">
                        <div className='flex flex-col gap-4'>
                          <FormItem className="w-full flex flex-col lg:flex-row gap-3">
                            <FormLabel>Height {`[${height}]px`}</FormLabel>
                              <Slider
                                variant="default"
                                aria-label="Enterprise package slider"
                                thickness="thin"
                                name="height"
                                min={320}
                                max={1024}
                                step={64}
                                value={height}
                                onValueChange={(
                                  value: typeof height
                                  ) => {
                                  setHeight(value)
                                }}
                              />
                          </FormItem>
                          <FormItem className="w-full flex flex-col lg:flex-row gap-3">
                            <FormLabel>Width {`[${width}]px`}</FormLabel>
                              <Slider
                                variant="default"
                                aria-label="Enterprise package slider"
                                thickness="thin"
                                name="width"
                                min={320}
                                max={1024}
                                step={64}
                                value={width}
                                onValueChange={(
                                  value: typeof width
                                  ) => {
                                  setWidth(value)
                                }}
                              />
                          </FormItem>
                          <Separator/>
                          <FormItem className="w-full">
                            <FormLabel>
                              Type negative prompt here
                              <p className="font-light text-xs">Describe what you DON&apos;T want in the generated image...</p>
                              </FormLabel>
                            <FormControl>
                              <Textarea
                                aria-invalid={!!form.formState.errors.negative}
                                defaultValue='ugly, poorly drawn, deformed, deformed limbs'
                                {...form.register("negative")}
                                />
                            </FormControl>
                            <UncontrolledFormMessage
                              message={form.formState.errors.negative?.message}
                            />
                          </FormItem>
                          <FormField
                            // control={form.control}
                            name="sampler"
                            render={({ field }) => (
                              <FormItem>
                              <FormLabel>
                                Sampler
                                <p className="font-light text-xs">Sampling method used to generate the image.</p>
                              </FormLabel>
                              <FormControl>
                                  <Select 
                                    defaultValue='dpmpp_2m_karras'
                                    onValueChange={(value: typeof field.value) =>
                                    field.onChange(value)
                                  }>
                                  <SelectTrigger>
                                      <SelectValue placeholder={field.name} defaultValue={field.value} {...form.register('sampler')}/>
                                  </SelectTrigger>
                                  <SelectContent>
                                      <SelectGroup>
                                      <SelectItem value="dpmpp_2m_karras">DPM++ 2M Karras</SelectItem>
                                      <SelectItem value="ddim">DDIM</SelectItem>
                                      <SelectItem value="dpm">DPM++ 2M</SelectItem>
                                      <SelectItem value="euler">Euler</SelectItem>
                                      <SelectItem value="euler_a">Euler Ancestral</SelectItem>
                                      <SelectItem value="k_lms">K LMS</SelectItem>
                                      <SelectItem value="pndm">PNDM</SelectItem>
                                      </SelectGroup>
                                  </SelectContent>
                                  </Select>
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormItem className="w-full flex flex-col gap-1">
                            <FormLabel>Guidance {`[ ${guidance} ]`}</FormLabel>
                            <Slider
                              variant="default"
                              aria-label="Enterprise package slider"
                              thickness="thin"
                              name="guidance"
                              min={-20}
                              max={20}
                              step={1}
                              value={guidance}
                              onValueChange={(
                                value: typeof guidance
                                ) => {
                                setGuidance(value)
                              }}
                            />
                          </FormItem>
                          <FormItem className="w-full flex flex-col gap-1">
                            <FormLabel>Steps {`[ ${steps} ]`}</FormLabel>
                              <Slider
                                variant="default"
                                aria-label="Enterprise package slider"
                                thickness="thin"
                                name="steps"
                                min={10}
                                max={150}
                                step={5}
                                value={steps}
                                onValueChange={(
                                  value: typeof steps
                                  ) => {
                                  setSteps(value)
                                }}
                              />
                          </FormItem>
                          <FormField
                          control={form.control}
                          name="seed"
                          render={({ field }) => (
                              <FormItem>
                              <FormLabel>Seed</FormLabel>
                                  <Input 
                                  placeholder="Unique image seed number. Random if not provided." 
                                  {...form.register("seed", {
                                    valueAsNumber: true,
                                  })} />
                              <FormMessage />
                              </FormItem>
                          )}
                          />
                        </div>
                      </div>
                  </AccordionContent>
              </AccordionItem>
            </Accordion>
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
            Generate --- {`[coin -${count}]`}
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
