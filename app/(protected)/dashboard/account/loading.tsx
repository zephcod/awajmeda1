import { Skeleton } from "@/components/ui/skeleton"
import { Header } from "@/components/header"
import { Shell } from "@/components/shells/shell"

export default function AccountLoading() {
  return (
    <Shell variant="sidebar" className="max-w-4xl mx-auto p-4">
      <Header
        title="Account"
        description="Manage your account settings"
        size="sm"
      />
      <div className="max-w-3xl flex-col ring-1 ring-border rounded-md grid gap-10 p-4">
        <div className="space-y-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-4 w-72" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-8 w-52" />
          <Skeleton className="h-8 w-52" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-8 w-52" />
          <Skeleton className="h-8 w-52" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-8 w-52" />
          <Skeleton className="h-8 w-52" />
        </div>
      </div>
    </Shell>
  )
}
