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
import Link from 'next/link'
import FeedbackForm from '../forms/feedback-form'
  

const TronHeader = () => {
  return (
    <div className='fixed hidden lg:flex h-16 -mt-20 pl-72 left-0 right-0'>
        <div className='bg-card ring-1 ring-border w-[500px] h-full mx-auto rounded-lg shadow-sm'>
        <div className="flex flex-row w-full items-center gap-x-2.5 mt-6 px-4 justify-evenly">
            <Link href={'/'} className='flex flex-row items-center'>
            <Icons.awajlogocircle/>
            <h3 className="font-semibold text-sm tracking-wide text-secondary ml-2">
                Awaj Meda
            </h3>
            </Link>
            <p className='px-4 text-sm text-muted-foreground'>
            ለማጅ ነን | Beta Mode
            </p>
            <Dialog>
                <DialogTrigger className='px-3.5 py-1 text-sm ring-1 ring-border rounded-md'>Give Feedback</DialogTrigger>
                <DialogContent className='p-4 bg-card max-w-5xl h-3/4 overflow-scroll border-none ring-1 ring-border'>
                    <DialogHeader>
                    <DialogTitle className='text-center text-muted-foreground'>
                        <div>
                            <h3 className="pt-4 text-2xl text-center font-bold leading-[1.15] lg:text-3xl">
                                Provide feedback on your experience
                            </h3>
                            <p className="mt-1 mb-4 text-center">👉{' '}
                            <span className="underline">Suggestions and compliants are welcome</span>
                            </p>
                        </div>
                    </DialogTitle>
                        <FeedbackForm/>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    </div>
    </div>
  )
}

export default TronHeader