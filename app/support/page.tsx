import type { Metadata } from "next"

import { Header } from "@/components/header"
import { Shell } from "@/components/shells/shell"
import { ReportAnIssue } from "@/components/report-issue"

export const metadata: Metadata = {
//   metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Purchases",
  description: "Manage your purchases",
}

export default async function PurchasesPage() {
  return (
    <Shell variant="sidebar" className="m-auto mt-0">
      <Header
        title="Get Support"
        description="Submit ticket and contact with customer support"
        size="sm"
      />
      <div>
        <ReportAnIssue/>
      </div>
    </Shell>
  )
}
