import { Breadcrumbs } from '@/components/pagers/breadcrumbs'
import { ContentTitleSection } from '@/components/shells/content-title'
import { Separator } from '@/components/ui/separator'
import React from 'react'

const GenAI101 = () => {
  return (
    <div className='flex flex-col items-start p-4 lg:p-8 max-w-7xl'>
      <Breadcrumbs
        segments={[
          {
            title: "Awaj AI Guides",
            href: "/guide",
          },
          {
            title: "2. Generative AI",
            href: "/guide/generative-ai",
          },
          {
            title: "Gen AI 101",
            href: "/guide/generative-ai/gen-ai-101",
          },
        ]}
      />
      <ContentTitleSection
        id="generative-ai-101"
        aria-labelledby="generative-ai-101"
        title="Generative AI 101"
        description="Basic introduction and summary on generative AI."
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

export default GenAI101