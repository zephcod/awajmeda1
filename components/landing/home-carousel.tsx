'use client'
import React from 'react'
import { EmblaOptionsType } from 'embla-carousel-react'
import DealsCarousel from './deals-carousel'
import '@/components/landing/box.css'
import { deals } from './deal-index'

const OPTIONS: EmblaOptionsType = {}
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const HomeCTA = () => {
  return (
    <section className="sandbox__carousel">
      <DealsCarousel slides={SLIDES} options={OPTIONS} values={deals[0].values} />
    </section>
  )
}

export default HomeCTA