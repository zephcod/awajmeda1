'use client'
import MiniGallery from '@/components/gallery/popular_orders'
import { Icons } from '@/components/icons'
import React from 'react'
import Lottie from "lottie-react"
import img from '@/public/blob/startup.json'
import Simplified from '@/components/landing/simple'

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
  return (
    <div className='relative w-full m-auto'>
      <div className=''>
        <Lottie
        animationData={img}
        style={style}
        // interactivity={interactivity}
        />
        <Simplified/>
        <Icons.add className=" m-auto h-24 w-24 text-muted-foreground"/>
        <MiniGallery/>
      </div>
    </div>
  )
}

export default Home