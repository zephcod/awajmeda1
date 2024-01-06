'use client';
import { demos, type Item } from '@/config/admin';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import appwriteAuthService from "@/db/appwrite_auth";
import { Icons } from '../icons';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ThemeToggle } from './theme_toggle';
import { Badge } from '../ui/badge';
import { useProModal } from '@/hooks/use-pro-modal';
import UserMenu from './user_menu';
import useAuth from '@/hooks/use_auth';
import { buttonVariants } from '../ui/button';
import HelpMenu from './help_menu';


export function GlobalNav() {
  const melaModal = useProModal()
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const {authStatus} = useAuth();
  const [loadingUser, setLoadingUser] = useState(true)
  const [coin, setCoin] = useState<number|null>(null)


    function delay(ms:any) {
      return new Promise((resolve) => {
         setTimeout(resolve, ms);
      })
    }

    

  useEffect(() => {
    (async ()=> {
        timeOut()
        const prefs = await appwriteAuthService.getPreferences()
        const limit = prefs?.coin
        setCoin(limit)
        setLoadingUser(false)
    }) ();
    
    function timeOut (){
      delay(20000)
      setLoadingUser(false)
      }
  }, [])


  return (
    <div className="fixed h-fit lg:h-screen top-0 z-30 flex w-full flex-col border-b border-border bg-card lg:bottom-0 lg:z-auto lg:w-72 lg:border-b-0 lg:border-r lg:border-border justify-start">
        <div className="flex h-14 items-center pl-4 pr-16 lg:pr-4 lg:pt-4 lg:h-auto justify-start gap-4">
          {authStatus ? 
            (<UserMenu/>)
             : loadingUser?
             <Icons.spinner
              className="mr-2 h-6 w-6 animate-spin"
              aria-hidden="true"
            />
             :(
              <>
              <div className='flex md:hidden'><ThemeToggle/></div>
              <Link href="/signin">
                <div
                  className={buttonVariants({
                    variant:'outline',
                    size: "sm",
                  })}
                >
                  Get started
                  <span className="sr-only">Get started</span>
                </div>
              </Link>
              </>
            )}
          <div className='w-fit text-sm '>
            {authStatus?<Badge onClick={melaModal.onOpen} variant='secondary' className='hover:cursor-pointer ring-1 ring-border'>
              <p>Coins:</p>
              <Icons.circle fill='yellow' height={10}/>
              <p>{coin}</p>
            </Badge>:<></>}
          </div>
        </div>
        <button
          type="button"
          className="group absolute right-0 top-0 flex h-14 items-center gap-x-2 px-4 lg:hidden"
          onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <Icons.close className="block w-6 text-gray-400" />
          ) : (
            <Icons.chevronLeft className="block w-6 text-gray-400" />
          )}
        </button>

        <div
          className={clsx('overflow-y-auto lg:static lg:block', {
            'fixed ml-36 md:ml-0 inset-x-0 bottom-0 top-14 mt-px bg-card': isOpen,
            hidden: !isOpen,
          })}
        >
          <nav className="space-y-6 px-4 pb-24 pt-5">
          <Link href={'/'} className='flex lg:hidden flex-row items-center'>
            <Icons.upload/>
            <h3 className="font-semibold text-sm tracking-wide text-secondary ml-2">
                Awaj Meda Home
            </h3>
          </Link>
          {demos.map((section) => {
              return (
                <div key={section.name}>
                    <Accordion key={section.name} type="single" collapsible className="w-full ">
                      <AccordionItem value='Question 1'>
                          <AccordionTrigger className="text-sm capitalize">
                              {section.name}
                          </AccordionTrigger>
                          <AccordionContent>
                              <div className="flex flex-col space-y-1">
                                {section.items.map((item) => (
                                <GlobalNavItem key={item.slug} item={item} close={close} />
                                ))}
                              </div>
                          </AccordionContent>
                      </AccordionItem>
                      </Accordion>
                </div>
              );
          })}
          </nav>
        </div>
    </div>
  );
}

function GlobalNavItem({
  item,
  close,
}: {
  item: Item;
  close: () => false | void;
}) {
  const segment = useSelectedLayoutSegment();
  const isActive = item.slug === segment;

  return (
    <Link
      onClick={close}
      href={`/${item.slug}`}
      className={clsx(
        'block rounded-md px-3 py-2 text-sm font-medium hover:text-secondary',
        {
          'text-gray-400': !isActive,
          'text-primary': isActive,
        },
      )}
    >
      <div className='flex flex-row gap-2 items-center'>
        <item.icon/>
        {item.name}
      </div>
    </Link>
  );
}
