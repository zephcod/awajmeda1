import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AspectRatio } from '@/components/ui/aspect_ratio'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Icons } from '@/components/icons'
import { Breadcrumbs } from '@/components/pagers/breadcrumbs'
import Lion from '@/public/guide/Lion.png'
import Messi from '@/public/guide/Messi.png'
import Sofa from '@/public/guide/Sofa.png'
import Realistic from '@/public/guide/Lion_realistic.png'
import Paint from '@/public/guide/An_oil_painting_of_a_Lion.png'
import Sketch from '@/public/guide/a_pencil_drawing_of_a_Lion.png'
import Leonardo from '@/public/guide/An_oil_painting_of_a_lion_by_Leonardo_da_Vinci_and_Frederic_Edwin_Church.png'
import Michelangelo from '@/public/guide/a_pencil_drawing_of_a_lion_Michelangelo.png'
import Ludwig from '@/public/guide/Ludwig.png'
import Washed from '@/public/guide/A_drawing_of_a_lion_by_Ludwig_Mies_van_der_Rohe_and_Albrecht_D_rer_surrealism_ambient_lighting_epic.png'
import Sureal from '@/public/guide/An_oil_painting_of_a_lion_by_Leonardo_da_Vinci_and_Frederic_Edwin_Church_surrealism_ambient_studio.png'
import Unreal from '@/public/guide/unreal.png'



const PromptEngineering = () => {
  return (
    <div className='flex flex-col items-start justify-between p-4 lg:p-8 max-w-4xl'>
      <Breadcrumbs
        segments={[
          {
            title: "Awaj AI Guides",
            href: "/guide",
          },
          {
            title: "3. Prompting",
            href: "/guide/prompting",
          },
          {
            title: "Basics",
            href: "/guide/prompting/basic-prompt-engineering",
          },
        ]}
      />
      <p className='w-full text-end text-muted-foreground font-light text-sm my-4'>Published on January 08, 2024  •  3min</p>
      <h1 className="font-heading text-3xl font-bold leading-[1.1] md:text-4xl">Basics of Prompt Engineering</h1>
      <p className='text-muted-foreground mt-3'>If you&apos;re new to the world of AI art, prompt engineering may look daunting, 
      but at its most basic, it&apos;s just using words to paint a picture of what you want to create. 
      In this guide we&apos;ll discuss a few different elements of a basic prompt, providing newcomers with a solid foundation upon 
      which to build anything they can imagine.</p>
      <h2 className="font-heading text-xl font-bold leading-[1.1] md:text-2xl mt-10">1. Core Prompt</h2>
      <p className='text-muted-foreground mt-2'>The simplest way of describing the central theme, subject, 
      or figure in your prompt, here are some examples:</p>
      <div className='w-full mt-6 grid gap-4 grid-rows-1 lg:grid-cols-3 lg:grid-rows-1 px-2 lg:px-6'>
      <ImageCard imgae={Lion.src} prompt={'Lion'}/>
      <ImageCard imgae={Sofa.src} prompt={'Sofa'}/>
      <ImageCard imgae={Messi.src} prompt={'Messi playing soccer'}/>
      </div>
      <br />
      <p className='text-muted-foreground'>As a beginner, it&apos;s tempting to use a prompt this simple and just call it a day. 
        While core prompts on their own often work relatively well with newer models at default Awaj AI settings, 
        the image quality may suffer in earlier models and at non-default settings.</p>
      <br />
      <p className='text-muted-foreground'>Additionally, while conceptually consistent with the prompt, these images are fairly generic. 
      Their prompts could benefit from a lot more specificity, which is tied directly to &apos;Styling&apos;</p>
      <h2 className="font-heading text-xl font-bold leading-[1.1] md:text-2xl mt-10">2. Styling</h2>
      <p className='text-muted-foreground mt-2'>Style is a crucial part of the prompt. 
      The AI model, when failing to recognize a requested style, usually defaults to one most common in related images.</p><br />
      <p className='text-muted-foreground '>For example, given the core prompt of “lion” 
      the model would likely generate a lion that was in realistic or in the style of an oil painting.</p><br />
      <p className='text-muted-foreground'>Having a well-chosen style together with an effective core prompt is sometimes enough to 
      create a fully-realized concept; after the core prompt, the choice of style influences your final image the most in a simple prompt.</p><br />
      <p className='text-muted-foreground'>The most commonly used styles include:</p>
      <BulletPoint item={'Realistic'} icon={''}/>
      <BulletPoint item={'Oil painting'} icon={''}/>
      <BulletPoint item={'Pencil drawing'} icon={''}/>
      <BulletPoint item={'Concept art'} icon={''}/> <br />
      <p className='text-muted-foreground'>There are a number of ways to invoke a style in your prompts.</p><br />
      <p className='text-muted-foreground'>To take an example from above, the following are ways you might format a prompt for a realistic image:</p>
      <BulletPoint item={'a photo of [core prompt]'} icon={''}/>
      <BulletPoint item={'a photograph of [core prompt]'} icon={''}/>
      <BulletPoint item={'a[core prompt], hyperrealistic'} icon={''}/>
      <BulletPoint item={'[core prompt], realistic'} icon={''}/> <br />
      <p className='text-muted-foreground'>You can, of course, combine these modifiers to pursue greater realism, but a little often goes a long way.</p><br />
      <p className='text-muted-foreground'>Here&apos;s our lion from Section 1 stylized in three options:</p>
      <div className='w-full mt-6 grid gap-4 grid-rows-1 lg:grid-cols-3 lg:grid-rows-1 px-2 lg:px-6'>
      <ImageCard imgae={Realistic.src} prompt={'Lion, realistic'}/>
      <ImageCard imgae={Paint.src} prompt={'An oil painting of a lion'}/>
      <ImageCard imgae={Sketch.src} prompt={'Pencil drawing of a lion'}/>
      </div>
      <h2 className="font-heading text-xl font-bold leading-[1.1] md:text-2xl mt-10">3. Artist</h2>
      <p className='text-muted-foreground mt-2'>To make your style more specific, or the image more coherent, 
      you can use artists&apos; names in your prompt. For instance, if you want a very abstract image, 
      you can add &apos;&apos;in the style of Pablo Picasso&apos;&apos; or just simply, &apos;&apos;Picasso&apos;&apos;.</p><br />
      <p className='text-muted-foreground'>Below are lists of non-living artists (subdivided by style) that can be used, 
      but doing some art history research of your own is encouraged, you&apos;ll learn a lot about what elements contribute to pieces 
      that move you, and you&apos;ll discover a lot of incredible art and artists whose work you might never have come across otherwise.</p><br />
      <p className='text-muted-foreground font-semibold underline ml-4'>Portrait Artists:</p>
      <BulletPoint item={'John Singer Sargent'} icon={''}/>
      <BulletPoint item={'Edgar Degas'} icon={''}/>
      <BulletPoint item={'Paul Cézanne'} icon={''}/>
      <BulletPoint item={'Jan van Eyck'} icon={''}/> <br />
      <p className='text-muted-foreground font-semibold underline ml-4'>Oil Painters:</p>
      <BulletPoint item={'Leonardo DaVinci'} icon={''}/>
      <BulletPoint item={'Vincent Van Gogh'} icon={''}/> 
      <BulletPoint item={'Johannes Vermeer'} icon={''}/>
      <BulletPoint item={'Rembrandt'} icon={''}/> <br />
      <p className='text-muted-foreground font-semibold underline ml-4'>Pen/Pencil Illustrators፡</p>
      <BulletPoint item={'Albrecht Dürer'} icon={''}/>
      <BulletPoint item={'Jean-Auguste-Dominique Ingres'} icon={''}/> 
      <BulletPoint item={'Michelangelo'} icon={''}/> 
      <BulletPoint item={'Leonardo da Vinci'} icon={''}/> <br />
      <p className='text-muted-foreground'>Note: Mixing the artists&apos; names can lead to interesting-looking art unlike anything 
      any artist invoked ever made.Here&apos;s our lion from Section 1 with different artists:</p>
      <div className='w-full mt-6 grid gap-4 grid-rows-1 lg:grid-cols-3 lg:grid-rows-1 px-2 lg:px-6'>
      <ImageCard imgae={Leonardo.src} prompt={'oil painting of a lion by Leonardo da Vinci and Frederic Edwin Church'}/>
      <ImageCard imgae={Michelangelo.src} prompt={'pencil drawing of a lion by Michelangelo and John Singer Sargent'}/>
      <ImageCard imgae={Ludwig.src} prompt={'concept art of a lion by Ludwig Mies van der Rohe and Albrecht Dürer'}/>
      </div>
      <h2 className="font-heading text-xl font-bold leading-[1.1] md:text-2xl mt-10">4. Fine-tuning results</h2>
      <p className='text-muted-foreground mt-2'>Finishing touches are the additional elements added to your prompt to really 
      make it look how you envision it. This is the part that some people take to extremes.</p><br />
      <p className='text-muted-foreground'>In relatively simple prompts, finishing touches might be adding 
      “trending on artstation” for a polished, artistic flair or &apos;Unreal Engine&apos; for more realistic lighting. 
      In more advanced prompts, things get way more complicated, but that&apos;s beyond the scope of this guide.</p><br />
      <p className='text-muted-foreground'>You can add anything you want for a finishing touch, but here are some examples that work well:</p><br />
      <p className='text-muted-foreground'>Highly-detailed, surrealism, trending on artstation, triadic color scheme, smooth, 
      sharp focus, matte, elegant, illustration, digital paint, dark, gloomy, octane render, 8k, 4k, washed-out colors, 
      sharp, dramatic lighting, beautiful, post-processing, picture of the day, ambient lighting, epic composition</p>
      <div className='w-full mt-6 grid gap-4 grid-rows-1 lg:grid-cols-3 lg:grid-rows-1 px-2 lg:px-6'>
      <ImageCard imgae={Washed.src} prompt={'drawing of a lion by Ludwig Mies van der Rohe and Albrecht Durer, surrealism, ambient lighting epic'}/>
      <ImageCard imgae={Sureal.src} prompt={'oil painting of a lion by Leonardo da Vinci and Frederic Edwin Church surrealism ambient studio lighting'}/>
      <ImageCard imgae={Unreal.src} prompt={'realistic render of a lion, Unreal Engine, trending on artstation, VRAY render, 8k, gloomy lighting'}/>
      </div>
      
      <div className="w-full flex justify-center py-5">
        <Link href="/guide" className={cn(buttonVariants({ variant: "outline" }))}>
          <Icons.chevronLeft className="mr-2 h-4 w-4" aria-hidden="true" />
          See all prompt guides
          <span className="sr-only">See all prompt guides</span>
        </Link>
      </div>
    </div>
  )
}

export default PromptEngineering

const ImageCard = (prop:{imgae:string,prompt:string}) => {
  return(
    <Card className='h-full overflow-hidden rounded-lg bg-border ring-1 ring-border border-none shadow-sm hover:shadow-lg'>
            <CardHeader className="border-b border-border p-0">
              <AspectRatio ratio={4 / 3}>
                  <Image
                    src={prop.imgae}
                    alt={prop.prompt}
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
                  <p className=' text-green-500'>Prompt: <span className=' text-secondary-foreground'>&quot;{prop.prompt}&quot;</span></p>
                </div>
              </CardTitle>
            </CardContent>
          </Card>
  )
}

const BulletPoint = (prop:{item:string,icon:string}) =>{
  return(
    <div className="flex flex-row gap-4 items-center mt-2 ml-2 lg:ml-8 text-base">
        <div className='bg-primary opacity-70 rounded-full shadow-md p-0.5'>
        <Icons.chevronRight className='bg-card rounded-full p-0.5 shadow-sm h-4 w-4'/> 
        </div>
        <p className="text-start text-base text-muted-foreground">{prop.item}</p>
    </div>
)
}