'use client'
import React, { useTransition } from 'react'
import Simplified from '@/components/landing/simple'
import { Button } from '@/components/ui/button'
import appwriteAuthService from '@/db/appwrite_auth'
import { toast } from 'sonner'
import axios from 'axios'
import { Icons } from '@/components/icons'

const Redeem = () => {
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
    <div className='flex flex-col gap-3 items-center'>
      Redeem
      <Button
            variant={'default'}
            className='m-4 w-48'
            onClick={()=>{onSubmit()}}
            disabled={isPending}
            >
            {isPending && (
              <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
              />
              )}
            Claim 100 Gift Coins
            <span className="relative flex h-3 w-3 ml-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-900"></span>
            </span>
          </Button>
    </div>
  )
}

export default Redeem