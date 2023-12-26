'use client'
import React, {useEffect, useState} from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut, 
  DropdownMenuTrigger,
} from "@/components/ui/dropdown_menu"

import { Icons } from "@/components/icons"
import '@/styles/globals.css'
import useAuth from "@/hooks/use_auth"
import { AwajUser } from "@/lib/validations/user"
import appwriteAuthService from "@/db/appwrite_auth"

const HelpMenu = () => {
  const {authStatus} = useAuth();
  const [user, setUser] = useState<AwajUser|null>(null)
  
  useEffect(()=>{
    (async () => {
      const iuser = await appwriteAuthService.currentUser()
      setUser(iuser)
    })()
  },[])

  return (
    <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    className="relative h-8 w-8 "
                  >
                    <Avatar className="h-8 w-8 text-muted-foreground">
                      <AvatarFallback className="bg-card"><Icons.help/></AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  {/* <DropdownMenuLabel className="font-normal">
                    {authStatus?
                      <div className="flex flex-col space-y-1">
                      <p className="text-sm leading-none text-muted-foreground">
                        {user?.email?<span>{user.email}</span>:<></>}
                      </p>
                      </div>
                    :
                    ''}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator /> */}
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href="/guide">
                        <Icons.product
                          className="mr-2 h-4 w-4"
                          aria-hidden="true"
                        />
                        Guide & Resources 
                        <DropdownMenuShortcut></DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/support">
                        <Icons.addCircle
                          className="mr-2 h-4 w-4"
                          aria-hidden="true"
                        />
                        Help & FAQ
                        <DropdownMenuShortcut></DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="https://www.awajai.com/terms" target="_blank">
                        <Icons.arrowExternalLink
                          className="mr-2 h-4 w-4"
                          aria-hidden="true"
                        />
                        Terms of service
                        <DropdownMenuShortcut></DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="https://www.awajai.com/privacy" target="_blank">
                        <Icons.arrowExternalLink
                          className="mr-2 h-4 w-4"
                          aria-hidden="true"
                        />
                        Privacy policy
                        <DropdownMenuShortcut></DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                  <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="https://www.awajai.com/" target="_blank">
                        <Icons.arrowExternalLink
                          className="mr-2 h-4 w-4"
                          aria-hidden="true"
                        />
                        <div className='flex flex-row gap-1 items-center py-1'>
                          Awaj Home 
                        </div>
                        <DropdownMenuShortcut></DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                  {/* <DropdownMenuSeparator />
                    <DropdownMenuItem asChild disabled>
                      <Link href="/dashboard/settings">
                        <Icons.settings
                          className="mr-2 h-4 w-4"
                          aria-hidden="true"
                        />
                        Settings
                        <DropdownMenuShortcut></DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem> */}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
  )
}

export default HelpMenu