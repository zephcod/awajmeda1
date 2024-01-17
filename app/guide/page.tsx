import React from 'react'
import Image from "next/image"
import { CategoryCard } from '@/components/landing/category-card'
import { guides } from '@/config/learning'
import { ContentTitleSection } from '@/components/shells/content-title'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect_ratio'

const Guide = () => {
  return (
    <div>
      <ContentTitleSection
        id="featured-guides"
        aria-labelledby="featured-guides-heading"
        title="Featured Guides"
        description="Discover educational guides provided by Awaj AI."
        className="mb-12 pt-8 md:pt-10 lg:pt-12 mx-auto px-8 md:px-8"
      >
      <section
          id="categories"
          aria-labelledby="categories-heading"
          className="grid grid-cols-1 gap-3 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-4 max-w-6xl mx-auto"
          >
          {guides.map((category) => (
            <ImageCard key={category.id} imgae={category.image} title={category.title} desc={category.desc}/>
            ))}
      </section>
    </ContentTitleSection>
    </div>
  )
}

export default Guide

const ImageCard = (prop:{imgae:string,title:string,desc:string}) => {
  return(
    <Card className='h-full overflow-hidden rounded-lg bg-border ring-1 ring-border border-none shadow-sm hover:shadow-lg'>
      <CardHeader className="border-b border-border p-0">
        <AspectRatio ratio={1}>
            <Image
              src={prop.imgae}
              alt={prop.title}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
              className="object-cover"
              loading="lazy"
            />
        </AspectRatio>
      </CardHeader>
      <CardContent className="py-2 px-3">
        <CardTitle >
          <div className='flex flex-row justify-between items-center font-normal text-base'>
            <p className=' text-green-500'>Prompt: <span className=' text-secondary-foreground'>&quot;{prop.title}&quot;</span></p>
          </div>
        </CardTitle>
      </CardContent>
    </Card>
  )
}