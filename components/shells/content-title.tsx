import Link from "next/link"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import Balancer from "react-wrap-balancer"

interface ContentSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  children: React.ReactNode
}

export function ContentTitleSection({
  title,
  description,
  children,
  className,
  ...props
}: ContentSectionProps) {
  return (
    <section className={cn("space-y-6", className)} {...props}>
      <div className="flex items-center justify-between gap-4">
        <div className="max-w-5xl flex-1 space-y-1">
          <h2 className="font-heading text-3xl font-bold leading-[1.1] md:text-4xl">
            {title}
          </h2>
          {description ? (
            <Balancer className="max-w-[46rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            {description}
            </Balancer>
          ) : null}
        </div>
      </div>
      <div className="space-y-8">
        {children}
      </div>
    </section>
  )
}