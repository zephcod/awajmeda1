'use client'
import { Button } from "@/components/ui/button"
import { CalendarDateRangePicker } from "@/components/dashboard/date-range-picker"
import { MainNav } from "@/components/dashboard/main-nav"
import { Search } from "@/components/dashboard/search"
import TeamSwitcher from "@/components/dashboard/team-switcher"
// import GalItems from "@/components/gallery/gallery-items"


export default function DashboardPage() {
  return (
      <div className="flex flex-col">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">User&apos;s Gallery</h2>
            <div className="hidden md:flex items-center space-x-2">
              <CalendarDateRangePicker />
              <Button>Load Gallery</Button>
            </div>
          </div>
        </div>
        <div className="p-4">
          {/* {GalItems()} */}
        </div>
      </div>
  )
}