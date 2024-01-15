import React from 'react'
import { CategoryCard } from './category-card'
import { guides } from '@/config/learning'
import { ContentSection } from '../shells/content-section'

const AwajLearning = () => {
  return (
    <ContentSection
        id="featured-products"
        aria-labelledby="featured-products-heading"
        title="Featured Guides"
        description="Discover educational guides provided by Awaj AI."
        href="/guide"
        linkText="View all guides"
        className="mb-12 pt-8 md:pt-10 lg:pt-12 mx-auto px-8 md:px-8"
      >
      <section
          id="categories"
          aria-labelledby="categories-heading"
          className="grid grid-cols-1 gap-3 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-4 max-w-6xl mx-auto"
          >
          {guides.map((category) => (
            <CategoryCard key={category.title} category={category} />
            ))}
      </section>
    </ContentSection>
  )
}

export default AwajLearning