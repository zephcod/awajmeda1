import React from 'react'
import Image from 'next/image'
import NotImage from '@/public/character/3834.png'
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

export default function NotFound ()  {
  return (
    <div className='flex justify-center mt-4 text-muted-foreground items-center flex-col w-full mx-auto text-center gap-2 px-6'>
      <h1 className='py-6 text-3xl text-center font-bold leading-[1.15] lg:text-4xl'>
          404 | Not Found
      </h1>
      <p className='p-4 text-center max-w-3xl'>
      We&apos;re sorry, but the page you requested could not be found. This might be due to a typo in the URL, 
      a broken link, or an outdated bookmark. Please check the address and try again, 
      or use the navigation menu to find what you&apos;re looking for.
      </p>
      <Image
          sizes={'lg'}
          alt={'page not found'}
          objectFit={'fit'}
          width={640}
          height={640}
          src={NotImage.src}
          />
      <div className='my-8'>
        <h2 className='text-lg text-center font-bold leading-[1.15] lg:text-2xl pt-6 pb-4'> Need further assistance?</h2>
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
