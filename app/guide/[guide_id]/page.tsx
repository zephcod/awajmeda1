import Image from "next/image"
import { Breadcrumbs } from '@/components/pagers/breadcrumbs'
import { AspectRatio } from '@/components/ui/aspect_ratio'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { categoryGuides } from '@/config/learning'
import React from 'react'
import { ContentTitleSection } from "@/components/shells/content-title"
import Link from "next/link"

interface GuidePageProps {
    params: {
      guide_id: string
    }
  }

const Guides = ({ params }: GuidePageProps) => {
  const guideCat = categoryGuides.find(ind =>{
    return ind.id === params.guide_id
  })
  return (
    <div className='flex flex-col items-start p-4 lg:p-8 max-w-7xl'>
      <Breadcrumbs
        segments={[
          {
            title: "Awaj AI Guides",
            href: "/guide",
          },
          {
            title: `${guideCat?.title}`,
            href: `/guide/${guideCat?.id}`,
          },
        ]}
      />
      <ContentTitleSection
        id="generative-ai-101"
        aria-labelledby="generative-ai-101"
        title={guideCat!.title}
        description="Basic introduction and summary on generative AI."
        className="w-full items-start mb-12 pt-8 md:pt-10 lg:pt-12 mx-auto"
      >
      <Separator/>
      <section
          id="categories"
          aria-labelledby="categories-heading"
          className="grid grid-cols-1 gap-3 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-4 max-w-6xl mx-auto"
          >
          {guideCat?.chapter.map((category) => (
            <Link key={category.slug}  href= {`${guideCat.id}/${category.slug}`}>
              <ImageCard image={category.image!} title={category.title} desc={category.desc} url={category.slug}/>
            </Link>
            ))}
      </section>
    </ContentTitleSection>
    </div>
  )
}

export default Guides

const ImageCard = (prop:{image:string,title:string,desc:string,url:string}) => {
  return(
      <Card className='h-full overflow-hidden rounded-lg bg-accent ring-1 ring-border border-none shadow-sm hover:shadow-lg'>
        <CardHeader className="border-b border-border p-0">
          <AspectRatio ratio={1}>
              <Image
                src={prop.image}
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