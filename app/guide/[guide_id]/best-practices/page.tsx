import { Breadcrumbs } from '@/components/pagers/breadcrumbs'
import { ContentTitleSection } from '@/components/shells/content-title'
import { Separator } from '@/components/ui/separator'
import React from 'react'

const BestPractices = () => {
  return (
    <div className='flex flex-col items-start p-4 lg:p-8 max-w-7xl'>
      <Breadcrumbs
        segments={[
          {
            title: "Awaj AI Guides",
            href: "/guide",
          },
          {
            title: "8. Miscellaneous",
            href: "/guide/miscellaneous",
          },
          {
            title: "Best practices",
            href: "/guide/miscellaneous/best-practices",
          },
        ]}
      />
      <ContentTitleSection
        id="ai-best-practices"
        aria-labelledby="ai-best-practices"
        title="AI Best Practices"
        description="Best practices to implement on generative AI."
        className="w-full items-start mb-12 pt-8 md:pt-10 lg:pt-12 mx-auto"
      >
      <Separator/>
      <section
          id="categories"
          aria-labelledby="categories-heading"
          className="grid grid-cols-1 gap-3 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-4 max-w-6xl mx-auto"
          >
          new content...
      </section>
    </ContentTitleSection>
    </div>
  )
}

export default BestPractices