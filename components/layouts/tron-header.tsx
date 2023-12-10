import React from 'react'
import { Icons } from '../icons'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  

const TronHeader = () => {
  return (
    <div className='fixed hidden lg:flex h-16 -mt-20 pl-72 left-0 right-0'>
        <div className='bg-card ring-1 ring-border w-[500px] h-full mx-auto rounded-lg shadow-sm'>
        <div className="flex flex-row w-full items-center gap-x-2.5 mt-6 px-4 justify-evenly">
            <div className='flex flex-row items-center'>
            <Icons.awajlogocircle/>
            <h3 className="font-semibold text-sm tracking-wide text-secondary ml-2">
                Awaj Meda
            </h3>
            </div>
            <p className='px-4 text-sm text-muted-foreground'>
            ለማጅ ነን | In beta mode
            </p>
            <Dialog>
                <DialogTrigger className='px-3.5 py-1 text-sm ring-1 ring-border rounded-md'>Leave Feedback</DialogTrigger>
                <DialogContent className='p-4 bg-accent'>
                    <DialogHeader>
                    <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
        </div>
    </div>
  )
}

export default TronHeader