'use client';
import { demos, type Item } from '@/config/admin';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import clsx from 'clsx';
import { useState } from 'react';
import { Icons } from '../icons';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ThemeToggle } from './theme_toggle';
import { Badge } from '../ui/badge';
import { useProModal } from '@/hooks/use-pro-modal';
import UserMenu from './user_menu';
import useAuth from '@/hooks/use_auth';
import { buttonVariants } from '../ui/button';

interface NavProps {
  apiLimitCount:number
}

export function GlobalNav({apiLimitCount}:NavProps) {
  const melaModal = useProModal()
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const {authStatus} = useAuth();

  return (
    <div className="fixed h-fit lg:h-screen top-0 z-30 flex w-full flex-col border-b border-border bg-card lg:bottom-0 lg:z-auto lg:w-72 lg:border-b-0 lg:border-r lg:border-border justify-between">
      <div>
        <div className="flex h-14 items-center pl-4 pr-16 lg:pr-4 py-4 lg:h-auto justify-between">
          {authStatus ? 
            (<UserMenu/>)
             : (
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
            <Badge onClick={melaModal.onOpen} variant='secondary' className='hover:cursor-pointer ring-1 ring-border'>
              <p>Coins:</p>
              <Icons.circle fill='gray' height={10}/>
              <p>{apiLimitCount}</p>
              <Icons.circle fill='yellow' height={10}/>
              <p>0</p>
            </Badge>
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
            'fixed inset-x-0 bottom-0 top-14 mt-px bg-card': isOpen,
            hidden: !isOpen,
          })}
        >
          <nav className="space-y-6 px-4 pb-24 pt-5 h-[400px] lg:h-[500px] xl:h-[650px] 2xl:h-[800px] overflow-y-auto">
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
      <div className='hidden lg:flex p-4 text-muted-foreground items-center text-sm flex-row gap-2 justify-evenly'>
        <Link href={'https://awajai.com/'} target='_blank'>
          <div className='flex flex-row items-center'>
            Home
            <Icons.arrowExternalLink className='h-4 w-4 pl-[2px]'/>
          </div>
        </Link>
          <p>|</p>
        <Link href={'/guide'}>
          <div className='flex flex-row items-center'>
            Guide
            {/* <Icons.arrowExternalLink className='h-4 w-4 pl-[2px]'/> */}
          </div>
        </Link>
          <p>|</p>
        <Link href={'/tos'}>ToS</Link>
          <p>|</p>
        <ThemeToggle/>
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
      {item.name}
    </Link>
  );
}
