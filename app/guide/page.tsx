import React from 'react'
import Image from "next/image"
import { categoryGuides, featuredGuides } from '@/config/learning'
import { ContentTitleSection } from '@/components/shells/content-title'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect_ratio'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

const Guide = () => {
  return (
    <div>
      <ContentTitleSection
        id="featured-guides"
        aria-labelledby="featured-guides-heading"
        title="Featured Guides"
        description="Selected educational guides to help you grasp generative AI."
        className="mb-12 pt-8 md:pt-10 lg:pt-12 mx-auto px-8 md:px-8"
      >
      <Separator/>
      <section
          id="categories"
          aria-labelledby="categories-heading"
          className="grid grid-cols-1 gap-3 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-4 max-w-6xl mx-auto"
          >
          {featuredGuides.map((category) => (
            <Link key={category.id}  href= {category.id}>
              <ImageCard imgae={category.image} title={category.title} desc={category.desc} url={category.id}/>
            </Link>
            ))}
      </section>
    </ContentTitleSection>
    <ContentTitleSection
        id="guides-category"
        aria-labelledby="guides-category-heading"
        title="Guides Category"
        description="Categorized educational guides from Awaj AI."
        className="mb-12 pt-8 md:pt-10 lg:pt-12 mx-auto px-8 md:px-8"
      >
      <Separator/>
      <section
          id="categories"
          aria-labelledby="categories-heading"
          className="grid grid-cols-1 gap-3 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-4 max-w-6xl mx-auto"
          >
          {categoryGuides.map((category) => (
            <Link key={category.id}  href= {`/guide/${category.id}`}>
              <ImageCard imgae={category.image} title={category.title} desc={category.desc} url={category.id}/>
            </Link>
            ))}
      </section>
    </ContentTitleSection>
    </div>
  )
}

export default Guide

const ImageCard = (prop:{imgae:string,title:string,desc:string,url:string}) => {
  return(
      <Card className='h-full overflow-hidden rounded-lg bg-accent ring-1 ring-border border-none shadow-sm hover:shadow-lg'>
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
            <div className='flex flex-col justify-between items-start'>
              <p className='text-secondary-foreground text-xl font-bold'>{prop.title}</p>
              <Separator className='my-0.5'/>
              <p className='text-muted-foreground text-base'>{prop.desc}</p>
            </div>
          </CardTitle>
        </CardContent>
      </Card>
  )
}