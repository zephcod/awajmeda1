'use client'
import appwriteStorageService from '@/db/appwrite_storage'
import { useState, useTransition } from 'react'
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { type z } from "zod"
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button'
import { FileDialog } from '@/components/file-dialog'
import { FileWithPreview } from '@/types'
import { Input } from '@/components/ui/input'
import { Icons } from '@/components/icons'
import { imguploadSchema } from "@/lib/validations/ai";
import { Form,
          FormControl,
          FormField,
          FormItem,
          FormLabel,
          FormMessage,
          UncontrolledFormMessage, 
        } from '@/components/ui/form';
import { getImg2Img } from '@/app/_actions/ai/image-image'
import LoadingRouteUI2 from '@/components/loading/loading_route2'
import { img } from '@/public/blob/blob'
import axios from 'axios'
import { absoluteUrl } from '@/lib/utils'
import appwriteAuthService from '@/db/appwrite_auth'


type Inputs = z.infer<typeof imguploadSchema>

const Guide = () => {
    const [files, setFiles] = useState<any>()
    const [imgsrc, setImgsrc] = useState<string|null>(img);
    const [isPending, startTransition] = useTransition()
    const bgRemoverEndpoint = absoluteUrl("/api/image/bgremover");

  
    function convertFileToBase64() {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(files);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      });
      }
 
    function onSubmit(){
      const cost = Number(5)
    startTransition(async()=>{
        try {
          const user = await appwriteAuthService.currentUser()
          if (user) {
           const uid = user!.$id
           
            const upimg = await convertFileToBase64()

            const res = await axios.post(`${bgRemoverEndpoint}`,{
              params:{
                image:upimg,
                cost:cost,
                des:uid
              }
            })
            // console.log(res)
            const _img = res.data
            setImgsrc(_img)
          }
        }catch (error:any) {
        if(error?.response?.status === 403){
        }
        }
        finally {
        }
    }
        )
    }      

  return (
    <div className='flex flex-col-reverse md:flex-row items-start gap-5 w-full mx-auto lg:p-8 p-3.5'>
        <FormItem>
            <Input id="images" type="file" onChange={(e)=>{setFiles(e.target.files![0])}}/>
        </FormItem>
        <Button
          onClick={()=>{onSubmit()}}
          disabled={isPending}
          // onClick={onSubmit}
          >
          {isPending && (
            <Icons.spinner
            className="mr-2 h-4 w-4 animate-spin"
            aria-hidden="true"
            />
            )}
          Upload
        </Button>
        {isPending?
        <LoadingRouteUI2/>
        :<Image width='500' height='200' src={`data:image/png;base64,${imgsrc}`} alt={''}/>}
    </div>
  )
}

export default Guide