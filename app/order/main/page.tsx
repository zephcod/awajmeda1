import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { env } from "@/env.mjs"

import { Header } from "@/components/header"
import { Shell } from "@/components/shells/shell"

export const metadata: Metadata = {
//   metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Purchases",
  description: "Manage your purchases",
}

export default async function PurchasesPage() {



  return (
    <Shell variant="sidebar">
      <Header
        title="Purchases"
        description="Manage your purchases."
        size="sm"
      />
      <div>Purchases Table</div>
    </Shell>
  )
}
