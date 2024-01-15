import MiniGallery from '@/components/gallery/popular_orders'
import { Icons } from '@/components/icons'
import React from 'react'
import Simplified from '@/components/landing/simple'
import { Separator } from '@/components/ui/separator'
import AwajLearning from '@/components/landing/learning'
import HomeCTA from '@/components/landing/home-carousel'


const Home = () => {
  return (
    <div className='relative w-full m-auto'>
      <>
        <div className='px-4 lg:px-8 flex flex-col items-center gap-2 mt-6 max-w-2xl mx-auto'>
          <h2 className='text-center font-bold text-2xl md:text-4xl'>✨ Welcome ✨ <br /> To the forefront of AI Exploration </h2>
          <p className='text-center text-muted-foreground max-w-lg'> We serve creatives and marketers to explore 
            the vast potential of AI with our flexible Pay-As-You-Go model.</p>
        </div>
        <HomeCTA/>
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