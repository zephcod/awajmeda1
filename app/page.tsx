'use client'
import MiniGallery from '@/components/gallery/popular_orders'
import { Icons } from '@/components/icons'
import React, { useTransition } from 'react'
import Lottie from "lottie-react"
import img from '@/public/blob/startup.json'
import Simplified from '@/components/landing/simple'
import { Button } from '@/components/ui/button'
import appwriteAuthService from '@/db/appwrite_auth'
import { toast } from 'sonner'
import axios from 'axios'
import { Separator } from '@/components/ui/separator'

const style = {
  height: 300,
};
const interactivity = {
  mode: "scroll",
  actions: [
    {
      visibility: [0, 0.2],
      type: "stop",
      frames: [0],
    },
    {
      visibility: [0.2, 0.45],
      type: "seek",
      frames: [0, 45],
    },
    {
      visibility: [0.45, 1.0],
      type: "loop",
      frames: [45, 60],
    },
  ],
};

const Home = () => {
  const [isPending, startTransition] = useTransition()

  function onSubmit(){
    startTransition(async()=>{
        try {
          const user = await appwriteAuthService.currentUser()
          if (user) {
          const uid = user!.$id
            const res = await axios.post('/api/gift',{
              params:{
                gift:100,
                des:uid
              }
            })
            if (res.data.data===true) {
              toast.message("Congratulations!", {
                description: `100 coins have been successfully added to your account.`,
              })
            }
            else{
              toast.error("Gift already claimed", {
                description: 'Tune in to our socials to get promo codes in the future.',
              })
            }
            return
          }
          else{
            throw new Error('Please sign in to claim your gift coins.')
          }
        }catch (error:any) {
          toast.message("Error occured while logging in", {
            description: `Please sign in to claim your gift coins.`,
          })
        }
      })
    }  

  return (
    <div className='relative w-full m-auto'>
      <div className=''>
        <Lottie
        animationData={img}
        style={style}
        // interactivity={interactivity}
        />
        <div className='px-4 lg:px-8 flex flex-col items-center gap-2'>
          <h2 className='text-center font-bold text-2xl'>🎄መልካም ገና🎄 <br /> Get your 100 Gift Coins.</h2>
          <Button
            className='m-4 w-48'
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
            Claim Gift
          </Button>
          <Separator/>
        </div>
        <Simplified/>
        <Icons.add className=" m-auto h-24 w-24 text-muted-foreground"/>
        <MiniGallery/>
      </div>
    </div>
  )
}

export default Home