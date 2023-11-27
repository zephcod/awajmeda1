import React from 'react'
import Image from 'next/image'
import Under from "@/public/character/under_construction.png"
import { Icons } from '@/components/icons'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

interface UCProps {
    title:string
    date: string
  }
const UnderConstruction = ({title, date}:UCProps) => {
    return (
        <div className='flex text-muted-foreground text-center justify-center items-center flex-col w-full mx-auto sm:px-16 px-6;'>
          <h1 className='py-6 text-3xl font-bold leading-[1.15] lg:text-4xl'>
          {title}
          </h1>
          <Icons.warning className='h-24 w-24'/>
          <h2 className='pt-8 text-2xl tfont-semibold leading-[1.15] lg:text-3xl'>
          Page under review!
          </h2>
          <p className='p-4 max-w-4xl'>
            This page is currently under review please check us back after {date}. <br />
            We apologize for any inconvenience this may cause. If you need anything, we are always available to chat.
          </p>
            <Image
              className='z-20'
              sizes={'lg'}
              alt={'page under construction'}
              width={640}
              height={640}
              src={Under}
            />
            <div className='my-8 relative'>
                <h2 className='text-lg font-bold leading-[1.15] lg:text-2xl pt-6 pb-4'> Need further assistance?</h2>
                <Link href={'/help_center'}>
                    <div
                    className={buttonVariants({
                        variant:'outline',
                        size: "default",
                    })}
                    >
                    Contact Support
                    <span className="sr-only">Contact Support</span>
                    </div>
                </Link>
                <p className='py-4 text-sm font-light lg:text-base max-w-2xl'>Thank you for your patience and understanding.</p>
            </div>
        </div>
      )
}

export default UnderConstruction