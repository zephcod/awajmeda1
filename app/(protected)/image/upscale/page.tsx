'use client'
import appwriteStorageService from '@/db/appwrite_storage'
import { useState, useTransition } from 'react'
import Image from "next/image"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Icons } from '@/components/icons'
import { Form,
          FormControl,
          FormField,
          FormItem,
          FormLabel,
          FormMessage,
          UncontrolledFormMessage, 
        } from '@/components/ui/form';
import LoadingRouteUI2 from '@/components/loading/loading_route2'
import axios from 'axios'
import { absoluteUrl } from '@/lib/utils'
import appwriteAuthService from '@/db/appwrite_auth'
import appwriteDBService from '@/db/appwrite_db'


const Upscale = () => {
    const [files, setFiles] = useState<any>()
    const [imgsrc, setImgsrc] = useState<string|null>(null);
    const [isPending, startTransition] = useTransition()
    const upscaleEndpoint = absoluteUrl("/api/image/upscale");

  
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

    async function saveGallery(save: any) {
      // Remove the data:image/png;base64, prefix if it exists
      const base64WithoutPrefix = save.image.replace(/^data:image\/[a-z]+;base64,/, '');

      // Decode base64 string
      const decodedData = atob(base64WithoutPrefix);

      // Create a Uint8Array from the decoded data
      const uint8Array = new Uint8Array(decodedData.length);
      for (let i = 0; i < decodedData.length; i++) {
        uint8Array[i] = decodedData.charCodeAt(i);
      }
     const blob = new Blob([uint8Array], { type: 'image/png' });

     // Create a File from the Blob
      const file = new File([blob], 'upscaled.png', { type: 'image/png' });

      const gen = await appwriteStorageService.uploadGenerated(file)
      const preview = await appwriteStorageService.previewFile({id:gen!.$id,bucket:'6584a911a70baf1b4a58'}) 
      const gal = {image:[gen!.$id],prompt:'upscale image',model:"upscale", user:save.user,preview:preview}
      const gallery = await appwriteDBService.newGalleryItem(gal)
}

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

            const res = await axios.post(`${upscaleEndpoint}`,{
              params:{
                image:upimg,
                cost:cost,
                des:uid
              },
              
            })
            const _img = res.data
            setImgsrc(_img)
            const save = {image:_img, user:uid}
            saveGallery(save)
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
      <div className='flex flex-1 flex-col items-center w-full gap-3'>
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
          Upscale Image
        </Button>
      </div>
        
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

export default Upscale