"use client"

import * as React from "react"
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AwajUser } from "@/lib/validations/user"
import appwriteAuthService from "@/db/appwrite_auth"
import { Icons } from "../icons"
import appwriteStorageService from "@/db/appwrite_storage"

const groups = [
  {
    label: "Personal Account",
    teams: [
      {
        label: "Admin Account",
        value: "personal",
      },
    ],
  },
  {
    label: "Teams",
    teams: [
      {
        label: "Awaj AI",
        value: "awajai",
      },
      {
        label: "Awaj Advert",
        value: "awajad",
      },
    ],
  },
]

type Team = (typeof groups)[number]["teams"][number]

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface TeamSwitcherProps extends PopoverTriggerProps {}

export default function TeamSwitcher({ className }: TeamSwitcherProps) {
  const [open, setOpen] = React.useState(false)
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false)
  const [selectedTeam, setSelectedTeam] = React.useState<Team>(groups[0].teams[0])

  const [user, setUser] = React.useState<AwajUser|null>(null)
  const [proPic, setProPic] = React.useState<undefined | null | URL>(null) 
  
  React.useEffect(()=>{
    (async () => {
      const iuser = await appwriteAuthService.currentUser()
      const prefs = await appwriteAuthService.getPreferences()

      const vf = {bucket:'658477e7eef2f71d1693',id:prefs!.propic}
      const image = await appwriteStorageService.viewFile(vf)
      setProPic(image)
      setUser(iuser)
    })()
  },[])

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn("w-[200px] justify-between", className)}
          >
            <Avatar className="h-8 w-8 p-0.5">
              {user?.profilePic?
              <AvatarImage
                src={proPic as unknown as string}
                alt={user.name}
              />:<></>}
              <AvatarFallback><Icons.user2/></AvatarFallback>
            </Avatar>
            {selectedTeam.label}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search team..." />
              <CommandEmpty>No team found.</CommandEmpty>
              {groups.map((group) => (
                <CommandGroup key={group.label} heading={group.label}>
                  {group.teams.map((team) => (
                    <CommandItem
                      key={team.value}
                      onSelect={() => {
                        setSelectedTeam(team)
                        setOpen(false)
                      }}
                      className="text-sm"
                    >
                      <Avatar className="mr-2 h-5 w-5">
                        <AvatarImage
                          src={`https://avatar.vercel.sh/${team.value}.png`}
                          alt={team.label}
                          className="grayscale"
                        />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      {team.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedTeam.value === team.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false)
                      setShowNewTeamDialog(true)
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    Create Team
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent className="bg-card">
        <DialogHeader>
          <DialogTitle>Create team</DialogTitle>
          <DialogDescription>
            Add a new team to manage products and customers.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Team name</Label>
              <Input id="name" placeholder="ET PLC" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan">Subscription plan</Label>
              <Select>
                <SelectTrigger className="">
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent className="bg-accent border-none ring-1 ring-border">
                  <SelectItem value="free">
                    <span className="font-medium">Essential</span> -{" "}
                    <span className="text-muted-foreground">
                      2000ETB/Month
                    </span>
                  </SelectItem>
                  <SelectItem value="pro">
                    <span className="font-medium">Bussiness</span> -{" "}
                    <span className="text-muted-foreground">
                      5000ETB/Month
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowNewTeamDialog(false)}>
            Cancel
          </Button>
          <Button type="submit">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}