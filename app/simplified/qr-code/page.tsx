'use client'
import { ReactNode, useEffect, useRef, useState, useTransition } from 'react'
import {QRCodeCanvas, QRCodeSVG} from 'qrcode.react'
import { Icons } from '@/components/icons'
import { zodResolver } from "@hookform/resolvers/zod"
import { type z } from "zod"
import { useForm } from "react-hook-form"
import html2canvas from 'html2canvas'
import { Form,
          FormControl,
          FormField,
          FormItem,
          FormLabel,
          FormMessage,
          UncontrolledFormMessage, 
        } from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { qrcodeSchema } from '@/lib/validations/qrcode'
import { StaticImageData } from 'next/image'
import BG from '@/public/gallery/pre-conf/portriat.png'
import appwriteStorageService from '@/db/appwrite_storage'
import { toast } from 'sonner'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio'
import QRCodeTemplate from '@/components/qr/qr-url-template'

const QrCode = () => {
  const [files, setFiles] = useState<File | StaticImageData | null>(null)
  const [loadingQR, setLoadingQR] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [link, setLink] = useState<string>('')
  const [bg, setBg] = useState<string>('#ffffff')
  const [fg, setFg] = useState<string>('#000000')
  const [preview, setPreview] = useState<string>("https://cloud.appwrite.io/v1/storage/buckets/650d2f3abd9c8148bda2/files/658773fd6b2b21959267/view?project=6504c902cef3dc9b138c&mode=admin")

  type Inputs = z.infer<typeof qrcodeSchema>

  const form = useForm<Inputs>({
    resolver: zodResolver(qrcodeSchema),
  })

  const prevFile = useRef({files,setFiles}).current

  function onSubmit(data: Inputs){
    startTransition(async()=>{
      try {
        if (files&&prevFile.files !== files) {
          const gen = await appwriteStorageService.uploadImage(files)
          const preview = await appwriteStorageService.previewFile({id:gen!.$id,bucket:'650d2f3abd9c8148bda2'}) 
            if (preview) {
              setPreview(String(preview))
            }
        }
        
      } catch (error) {
        toast.message("Error occured:", {
          description: `${error}`,
         })
      } finally {
        setBg(data.bgColor || '#ffffff')
        setFg(data.fgColor || '#000000')
        setLink(data.url)
        setLoadingQR(true)
      }

    })
  }

  const downloadQRCode = () => {
    startTransition(async()=>{
    // const canvas = document.querySelector("#qrcode-canvas") as HTMLCanvasElement
    
    const canvas = (await html2canvas(document.getElementById("canvas")!)).toDataURL("image/png").replace("image/png", "image/octet-stream")

      if (!canvas) throw new Error("<canvas> not found in the DOM")
      else{
        // const pngUrl = canvas
        //   .toDataURL("image/png")
        //   .replace("image/png", "image/octet-stream")
        const downloadLink = document.createElement("a")
        downloadLink.href = canvas
        downloadLink.download = "QR code.png"
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
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
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Insert URL/Link here</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <UncontrolledFormMessage
                    message={form.formState.errors.url?.message}
                  />
                </FormItem>
              )}
            />
            <Accordion type="single" collapsible className="w-full ">
              <AccordionItem value='Question 1'>
                  <AccordionTrigger className="text-sm capitalize">
                      Advanced Setting
                  </AccordionTrigger>
                  <AccordionContent>
                      <div className="flex flex-col gap-6 bg-accent ml-2 lg:ml-12 p-2 lg:p-4 rounded-md">
                        <div className='flex flex-col lg:flex-row gap-10'>
                          <FormField
                            control={form.control}
                            name="bgColor"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel>Background Color</FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue='#ffffff'
                                    className="flex flex-col md:flex-row gap-2">
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="#ffffff"/>
                                      </FormControl>
                                      <div className='h-4 w-6 bg-black rounded-sm'></div>
                                      <FormLabel className="font-normal">Black</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="#C0C2C9" id="#C0C2C9"/>
                                      </FormControl>
                                      <div className='h-4 w-6 bg-slate-400 rounded-sm'></div>
                                      <FormLabel className="font-normal">Slate</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="#090b21" />
                                      </FormControl>
                                      <div className='h-4 w-6 bg-slate-900 rounded-sm'></div>
                                      <FormLabel className="font-normal">Navy</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="#143306" />
                                      </FormControl>
                                      <div className='h-4 w-6 bg-lime-950 rounded-sm'></div>
                                      <FormLabel className="font-normal">Pine</FormLabel>
                                    </FormItem>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Separator className='flex lg:hidden' />
                          <FormField
                            control={form.control}
                            name="fgColor"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel>QR Code Color</FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue='#000000'
                                    className="flex flex-col md:flex-row gap-2">
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="#000000"/>
                                      </FormControl>
                                      <div className='h-4 w-6 bg-white rounded-sm'></div>
                                      <FormLabel className="font-normal">White</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="#C0C2C9" id="#C0C2C9"/>
                                      </FormControl>
                                      <div className='h-4 w-6 bg-slate-400 rounded-sm'></div>
                                      <FormLabel className="font-normal">Slate</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="#FFBF00" />
                                      </FormControl>
                                      <div className='h-4 w-6 bg-amber-400 rounded-sm'></div>
                                      <FormLabel className="font-normal">Amber</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="#98FB98" />
                                      </FormControl>
                                      <div className='h-4 w-6 bg-lime-400 rounded-sm'></div>
                                      <FormLabel className="font-normal">Mint</FormLabel>
                                    </FormItem>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      <FormItem>
                        <FormLabel>Upload custom logo</FormLabel>
                        <Input id="profilePic" type="file" onChange={(e)=>{setFiles(e.target.files![0])}}/>
                      </FormItem>
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
            Generate QR Code
            </Button>
            <Separator/>
            
        </form>
      </Form>
      {loadingQR?
        <div className='bg-accent rounded-md p-3 ring-1 ring-border shadow-md' id="canvas">
          <QRCodeTemplate>
            <QRCodeCanvas
              
              value={link}
              size={288}
              bgColor={bg}
              fgColor={fg}
              level={"L"}
              includeMargin={false}
              imageSettings={{
                src: preview,
                x: undefined,
                y: undefined,
                height: 92,
                width: 92,
                excavate: true,
              }}
            />
          </QRCodeTemplate>
        {/* <div className='h-24 border-t-2 border-border rounded-b-md bg-accent -mx-3 -mb-3 mt-3'>
        </div> */}
          <div className="my-5">
            <Button onClick={downloadQRCode}>Download QR Code</Button>
          </div>
      </div>:<div className='h-48 w-96'></div>}
    </div>
  )
}

export default QrCode