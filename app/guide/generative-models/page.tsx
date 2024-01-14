import Image from 'next/image'
import { AspectRatio } from '@/components/ui/aspect_ratio'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { controlModels, inpaintModels, xlModels } from '@/config/XLmodels'
import React from 'react'
import { ContentTitleSection } from '@/components/shells/content-title'
import { models } from '@/config/models'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { Icons } from '@/components/icons'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown_menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const GenerativeModels = () => {
  return (
    <div className='w-full flex flex-col max-w-7xl mx-auto p-2 md:p-4'>
      <ContentTitleSection
          id="XL-Models"
          aria-labelledby="featured-products-heading"
          title="XL Generative Models"
          description="Generative models with the capacity to produce high-quality images."
          className="pt-8 md:pt-10 lg:pt-12 mb-8 px-2 lg:px-6"
        >
        <div className='grid gap-4 grid-rows-1 lg:grid-cols-5'>
          {xlModels.map((ind, indIndex) => (
            <Card key={indIndex} className='overflow-hidden rounded-lg bg-border ring-1 ring-border border-none shadow-sm hover:shadow-lg'>
              <CardHeader className="relative border-b border-primary p-0">
                <AspectRatio ratio={4 / 3}>
                  <Image
                    src={
                      ind.image ?? "/images/product-placeholder.webp"
                    }
                    alt={ind.desc}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
                    className="object-cover"
                    loading="lazy"
                    />
                </AspectRatio>
                <Link
                  href={`/image/txt2imgXL/?model=${ind.id}`}
                  className={cn(
                    buttonVariants({
                      variant: "default",
                      className: "absolute top-0 right-1.5",
                      size:'sm'
                    })
                  )}
                >
                  Run
                  <Icons.arrowUpRight className='h-3 w-3 ml-0.5'/>
                  <span className="sr-only"> run</span>
                </Link>
              </CardHeader>
              <CardContent className="py-2 px-3">
                <CardTitle >
                  <div className='flex flex-row justify-between items-center font-normal text-base'>
                    {ind.title}
                    <InfoDropdown desc={ind.desc}/>
                  </div>
                </CardTitle>
              </CardContent>
            </Card>
          ))}
        </div>
        <Separator/>
      </ContentTitleSection>
      <ContentTitleSection
          id="inpaintModels"
          aria-labelledby="featured-products-heading"
          title="In-painting Models"
          description="Generative models that are capable of precisely manuplating images."
          className="pt-8 md:pt-10 lg:pt-12 mb-8 px-2 lg:px-6"
        >
        <div className='grid gap-4 grid-rows-1 lg:grid-cols-5'>
          {inpaintModels.map((ind, indIndex) => (
            <Card key={indIndex} className='overflow-hidden rounded-lg bg-border ring-1 ring-border border-none shadow-sm hover:shadow-lg'>
              <CardHeader className="relative border-b border-amber-600 p-0">
                <AspectRatio ratio={4 / 3}>
                  <Image
                    src={
                      ind.image ?? "/images/product-placeholder.webp"
                    }
                    alt={ind.desc}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
                    className="object-cover"
                    loading="lazy"
                    />
                </AspectRatio>
                <Link
                  href={`/image/inpainting/?model=${ind.id}`}
                  className={cn(
                    buttonVariants({
                      variant: "default",
                      className: "absolute top-0 right-1.5",
                      size:'sm'
                    })
                  )}
                >
                  Run
                  <Icons.arrowUpRight className='h-3 w-3 ml-0.5'/>
                  <span className="sr-only"> run</span>
                </Link>
              </CardHeader>
              <CardContent className="py-2 px-3">
                <CardTitle >
                  <div className='flex flex-row justify-between items-center font-normal text-base'>
                    {ind.title}
                  </div>
                </CardTitle>
              </CardContent>
            </Card>
          ))}
        </div>
        <Separator/>
      </ContentTitleSection>
      <ContentTitleSection
          id="controlModels"
          aria-labelledby="featured-products-heading"
          title="Controller Models"
          description="Control-net models that are capable of guiding other generative models."
          className="pt-8 md:pt-10 lg:pt-12 mb-8 px-2 lg:px-6"
        >
        <div className='grid gap-4 grid-rows-1 lg:grid-cols-5'>
          {controlModels.map((ind, indIndex) => (
            <Card key={indIndex} className='overflow-hidden rounded-lg bg-border ring-1 ring-border border-none shadow-sm hover:shadow-lg'>
              <CardHeader className="relative border-b border-blue-700 p-0">
                <AspectRatio ratio={4 / 3}>
                  <Image
                    src={
                      ind.image ?? "/images/product-placeholder.webp"
                    }
                    alt={ind.desc}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
                    className="object-cover"
                    loading="lazy"
                    />
                </AspectRatio>
                <Link
                  href={`/image/controlled/?controller=${ind.id}`}
                  className={cn(
                    buttonVariants({
                      variant: "default",
                      className: "absolute top-0 right-1.5",
                      size:'sm'
                    })
                  )}
                >
                  Run
                  <Icons.arrowUpRight className='h-3 w-3 ml-0.5'/>
                  <span className="sr-only"> run</span>
                </Link>
              </CardHeader>
              <CardContent className="py-2 px-3">
                <CardTitle >
                  <div className='flex flex-row justify-between items-center font-normal text-base'>
                    {ind.title}
                  </div>
                </CardTitle>
              </CardContent>
            </Card>
          ))}
        </div>
        <Separator/>
      </ContentTitleSection>
      <ContentTitleSection
          id="SD-Models"
          aria-labelledby="featured-products-heading"
          title="Standard Models"
          description="Standard generative models included in Awaj AI."
          className="mb-12 pt-8 md:pt-2 lg:pt-2 px-2 lg:px-6"
        >
        <div className='grid gap-4 grid-rows-1 lg:grid-cols-5 lg:grid-rows-2'>
          {models.map((ind, indIndex) => (
            <Card key={indIndex} className='h-full overflow-hidden rounded-lg bg-border ring-1 ring-border border-none shadow-sm hover:shadow-lg'>
              <CardHeader className="relative border-b border-accent p-0">
                <AspectRatio ratio={4 / 3}>
                  <Image
                    src={
                      ind.image ?? "/images/product-placeholder.webp"
                    }
                    alt={ind.desc}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </AspectRatio>
                <Link
                  href={`/image/txt2img/?model=${ind.id}`}
                  className={cn(
                    buttonVariants({
                      variant: "default",
                      className: "absolute top-0 right-1.5",
                      size:'sm'
                    })
                  )}
                >
                  Run
                  <Icons.arrowUpRight className='h-3 w-3 ml-0.5'/>
                  <span className="sr-only"> run</span>
                </Link>
              </CardHeader>
              <CardContent className="py-2 px-3">
                <CardTitle >
                  <div className='flex flex-row justify-between items-center font-normal text-base'>
                    {ind.title}
                  </div>
                </CardTitle>
              </CardContent>
            </Card>
          ))}
        </div>
      </ContentTitleSection>
    </div>
  )
}

export default GenerativeModels

const InfoDropdown = (prop:{desc:string}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          className="relative h-4 w-4 "
        >
          <Avatar className="h-4 w-4 text-muted-foreground">
            <AvatarFallback className="bg-border"><Icons.info/></AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 md:w-52" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
            <p className="text-sm leading-none text-muted-foreground">
              {prop.desc}
            </p>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
