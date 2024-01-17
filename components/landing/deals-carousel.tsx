import React, { useState, useEffect, useCallback } from 'react'
import '@/components/landing/emlba.css'
import useEmblaCarousel, {
  EmblaCarouselType,
  EmblaOptionsType
} from 'embla-carousel-react'
import {
  DotButton,
  PrevButton,
  NextButton
} from './embla-carousel-arrows'
import styles from '@/components/landing/deals.module.css'
import Link from 'next/link'
import Lottie from "lottie-react"
import { deals, dealByIndex } from './deal-index'
import { Icons } from '../icons'
import { cn } from '@/lib/utils'
import { buttonVariants } from '../ui/button'
import { Separator } from '../ui/separator'

const style = {
  height: 200,
};






type PropType = {
  slides: number[]
  options?: EmblaOptionsType
  values: number[]
}

const DealsCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  )
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  )
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onInit, onSelect])

  return (
    <div className='md:max-w-5xl max-w-sm mx-auto mb-8'>
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container my-4">
            {slides.map((index) => (
              <div className="embla__slide" key={index}>
                <div className={styles.modal}>
                  <div className={styles.feature}>
                      <div className="flex flex-row gap-4 items-center mt-2 ml-2 lg:ml-8 text-lg">
                          <div className='bg-primary opacity-70 rounded-full shadow-md p-1'>
                          <Icons.chevronRight className='bg-card rounded-full p-1 shadow-sm'/> 
                          </div>
                          <p className="text-start">{dealByIndex(index).list1}</p>
                      </div>
                      <Separator className='flex lg:hidden mt-3'/>
                      <p className="text-3xl text-center font-bold mt-2 ml-2 lg:ml-8">{dealByIndex(index).desc}</p>
                      <Lottie className='flex lg:hidden' animationData={dealByIndex(index).img} style={style} />
                      <Link
                        href={dealByIndex(index).link}
                        className={cn(
                          buttonVariants({
                            variant: "default",
                            className: "mt-4 lg:mt-14 lg:ml-8 w-full lg:w-fit",
                            size:'lg'
                          })
                        )}
                      >
                        {dealByIndex(index).title}
                        <span className="sr-only"> {dealByIndex(index).title}</span>
                      </Link>
                  </div>
                  <Lottie className='hidden lg:flex mr-8' animationData={dealByIndex(index).img} style={style} />
                </div>
              </div>
              ))}
            </div>
        </div>
        <div className="embla__buttons">
          <PrevButton onClick={scrollPrev} disabled={prevBtnDisabled} />
          <NextButton onClick={scrollNext} disabled={nextBtnDisabled} />
        </div>
      </div>

      <div className="embla__dots">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => scrollTo(index)}
            className={'embla__dot'.concat(
              index === selectedIndex ? ' embla__dot--selected' : ''
            )}
          />
        ))}
      </div>
    </div >
  )
}

export default DealsCarousel
