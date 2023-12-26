'use client'
import appwriteAuthService from '@/db/appwrite_auth'
import appwriteDBService from '@/db/appwrite_db'
import { AwajGallery } from '@/lib/validations/gallery'
import React from 'react'
import { ReactNode, useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { AspectRatio } from '../ui/aspect_ratio'
import { Icons } from '../icons'
import Image from 'next/image'


export function GalItems () {
    const [loadingUser, setLoadingUser] = useState(true)
    const [gallery, setGallery] = useState<[AwajGallery]|null|undefined>(null)

    useEffect(() => {
        (async ()=> {
            const user = await appwriteAuthService.currentUser()
            const gal = await appwriteDBService.getGalleryItem(user!.$id)
            setGallery(gal!.documents)
            
            setLoadingUser(false)
      }) ();
        }, [])



  return (
    <div className='grid gap-4 grid-rows-1 lg:grid-cols-4 lg:grid-rows-2 px-2 lg:px-6'>
        {gallery?
        gallery.map((item,index) =>(
            <Card key={index} className='relative h-full overflow-hidden rounded-lg bg-border ring-1 ring-border border-none shadow-sm hover:cursor-pointer hover:-translate-y-1 transition-all'>
            <CardHeader className="border-b border-border p-0">
              <AspectRatio ratio={4 / 3}>
                {item?.image? (
                  <Image
                  src= {item.preview as unknown as string}
                  alt={item.prompt||''}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  fill
                  className="object-cover"
                  loading="lazy"
                />
                ) : (
                  <div
                    aria-label="Placeholder"
                    role="img"
                    aria-roledescription="placeholder"
                    className="flex h-full w-full items-center justify-center bg-secondary"
                  >
                    <Icons.placeholder
                      className="h-9 w-9 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </AspectRatio>
                <div className="absolute bottom-0 px-2 py-4 w-full bg-gradient-to-b from-transparent to-primary">
                    <div className='flex flex-row justify-between items-end font-normal text-base h-12 overflow-hidden text-gray-900'>
                        {item.prompt}
                    </div>
                </div>
            </CardHeader>
            {/* <CardContent className="pb-2 px-3 bg-gradient-to-b from-transparent to-primary">
              <CardTitle >
              </CardTitle>
            </CardContent> */}
          </Card>
        ))
        :''}
    </div>
  )
}

export default GalItems