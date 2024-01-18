import * as React from "react"
import Link from "next/link"
import type { Category } from "@/types"


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {

  return (
    <Link href={category.id}>
      <span className="sr-only">{category.title}</span>
      <Card className="relative flex h-full w-full flex-col items-center justify-center ring-1 ring-border overflow-hidden rounded-lg bg-transparent transition-colors hover:bg-muted/50">
        <CardHeader className="p-2">
          <div className="grid h-10 w-10 place-items-center rounded-full border-2">
            <category.icon className="h-5 w-5" aria-hidden="true" />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-1.5">
          <CardTitle className="capitalize ">{category.title}</CardTitle>
          <CardDescription className="text-center">{category.desc}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  )
}



