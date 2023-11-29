import MiniGallery from '@/components/gallery/popular_orders'
import { Icons } from '@/components/icons'
import React from 'react'

const Home = () => {
  return (
    <div className='relative w-full m-auto'>
      <div className=''>
        <Icons.add className=" m-auto h-24 w-24 text-muted-foreground"/>
        <MiniGallery/>
      </div>
    </div>
  )
}

export default Home