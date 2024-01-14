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
import { ThemeToggle } from "./theme_toggle"
import HelpMenu from "./help_menu"
import appwriteStorageService from "@/db/appwrite_storage"

const UserMenu = () => {
  const {authStatus} = useAuth();
  const [user, setUser] = useState<AwajUser|null>(null)
  const [proPic, setProPic] = useState<undefined | null | URL>(null) 
  
  useEffect(()=>{
    (async () => {
      const iuser = await appwriteAuthService.currentUser()
      const prefs = await appwriteAuthService.getPreferences()

      const vf = {bucket:'658477e7eef2f71d1693',id:prefs!.propic}
      const image = await appwriteStorageService.viewFile(vf)
      setProPic(image)
      setUser(iuser)
    })()
  },[])

if (!authStatus) {
  return null;
}
  return (
    <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      {proPic?
                      <AvatarImage
                        src={proPic as unknown as string}
                        alt={'profile picture'}
                      />:<></>}
                      <AvatarFallback><Icons.user2/></AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-row items-center">
                      <p className="text-sm leading-none text-muted-foreground overflow-hidden">
                        {user?.email?<span>{user.email}</span>:<></>}
                      </p><HelpMenu/>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/gallery">
                        <Icons.image
                          className="mr-2 h-4 w-4"
                          aria-hidden="true"
                        />
                        Gallery
                        <DropdownMenuShortcut></DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/account">
                        <Icons.user2
                          className="mr-2 h-4 w-4"
                          aria-hidden="true"
                        />
                        Account
                        <DropdownMenuShortcut></DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/coins">
                        <Icons.addCircle
                          className="mr-2 h-4 w-4"
                          aria-hidden="true"
                        />
                        Coins
                        <DropdownMenuShortcut></DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/support">
                        <Icons.help
                          className="mr-2 h-4 w-4"
                          aria-hidden="true"
                        />
                        Support
                        <DropdownMenuShortcut></DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                  <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="https://www.awajai.com/" target="_blank">
                        <Icons.presentation
                          className="mr-2 h-4 w-4"
                          aria-hidden="true"
                        />
                        <div className='flex flex-row gap-1 items-center py-1'>
                          Awaj Home 
                          <Icons.arrowExternalLink className='h-4 w-4'/>
                        </div>
                        <DropdownMenuShortcut></DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                  <DropdownMenuSeparator />
                    <DropdownMenuItem asChild >
                        <div className="flex flex-row w-full justify-between">
                          <Link href="/dashboard/settings" >
                            <div className="flex flex-row">
                              <Icons.settings
                                className="mr-2 h-4 w-4"
                                aria-hidden="true"
                              />
                              Settings
                            </div>
                            <DropdownMenuShortcut></DropdownMenuShortcut>
                          </Link>
                          <div><ThemeToggle/></div>
                        </div>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
  )
}

export default UserMenu