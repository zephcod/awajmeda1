import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut, 
  DropdownMenuTrigger,
} from "@/components/ui/dropdown_menu"
import { simplifieds } from '@/config/simplified'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/header'
import { AspectRatio } from '@/components/ui/aspect_ratio'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'

const Simplified = () => {
  return (
    <div>
      <Header
      title="Simplified Models"
      description="Select a use case to start"
      size="sm" 
      className='p-2 lg:p-6'/>
      <div className='h-4'></div>
      <div className='h-24 '>

      </div>
      <div className='grid gap-4 grid-rows-1 lg:grid-cols-5 lg:grid-rows-2 px-2 lg:px-6'>
        {simplifieds.map((ind, indIndex) => (
          <Card key={indIndex} className='h-full overflow-hidden rounded-lg bg-border ring-1 ring-border border-none shadow-sm hover:shadow-lg'>
            <CardHeader className="border-b border-border p-0">
              <AspectRatio ratio={4 / 3}>
                {ind?.image? (
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
            </CardHeader>
            <CardContent className="py-2 px-3">
              <CardTitle >
                <div className='flex flex-row justify-between items-center font-normal text-base'>
                  {ind.title}
                  <InfoDropdown/>
                </div>
              </CardTitle>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Simplified


export const InfoDropdown = () => {
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
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
            <p className="text-sm leading-none text-muted-foreground">
              Details / Process
            </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/support">
              <Icons.product
                className="mr-2 h-4 w-4"
                aria-hidden="true"
              />
              Step 1
              <DropdownMenuShortcut></DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="https://www.awajai.com/" target="_blank">
              <Icons.arrowExternalLink
                className="mr-2 h-4 w-4"
                aria-hidden="true"
              />
              <div className='flex flex-row gap-1 items-center py-1'>
                Awaj Home 
              </div>
              <DropdownMenuShortcut></DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
