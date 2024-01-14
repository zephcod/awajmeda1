'use client'
import MiniGallery from '@/components/gallery/popular_orders'
import { Icons } from '@/components/icons'
import React, { useTransition } from 'react'
import Lottie from "lottie-react"
import img from '@/public/blob/awajai-rocket.json'
import Simplified from '@/components/landing/simple'
import { Button } from '@/components/ui/button'
import appwriteAuthService from '@/db/appwrite_auth'
import { toast } from 'sonner'
import axios from 'axios'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import AwajLearning from '@/components/landing/learning'

const style = {
  height: 200,
};
const interactivity = {
  mode: "cursor",
  
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
      type: 'loop',
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
      <>
        <div className='px-4 lg:px-8 flex flex-col items-center gap-2 mt-6 max-w-2xl mx-auto'>
          <h2 className='text-center font-bold text-2xl md:text-4xl'>✨ Welcome ✨ <br /> To the forefront of AI Exploration </h2>
          <p className='text-center text-muted-foreground max-w-lg'> We serve creatives and marketers to explore 
            the vast potential of AI with our flexible Pay-As-You-Go model.</p>
          <Button
            variant={'default'}
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
            Claim 100 Gift Coins
          <span className="relative flex h-3 w-3 ml-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-100"></span>
          </span>
          </Button>
        </div>
        <Lottie
        animationData={img}
        style={style}
        // interactivity={interactivity}
        />
        <Separator/>
        <Simplified/>
        <Icons.add className=" m-auto h-24 w-24 text-muted-foreground"/>
        <MiniGallery/>
        <Separator/>
        <AwajLearning/>
      </>
    </div>
  )
}

export default Home