"use client"

import React from 'react'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from '../ui/sheet'
import { Heart, Menu, User } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ScrollArea } from '../ui/scroll-area'
import { LogoFull } from '../Logo'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { PAGES_LINKS } from '@/utils/linksData'
import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query'
import { INavItem } from './types';
import useGetUser from '@/hooks/use-get-user'

// Skeleton component for navigation items
const MobileNavSkeleton = () => (
  <div className="space-y-0">
    {/* Simple nav items skeleton (Trending, Lookbook, About) */}
    {Array.from({ length: 3 }).map((_, index) => (
      <div key={index} className="px-5 py-5 border-b border-primary/80">
        <div className="h-6 bg-gray-200 animate-pulse rounded w-2/3" />
      </div>
    ))}

    {/* Accordion nav items skeleton (Categories, Collections) */}
    {Array.from({ length: 2 }).map((_, index) => (
      <div key={`accordion-${index}`} className="px-5 py-2 border-b border-primary/80">
        {/* Main accordion trigger skeleton */}
        <div className="flex items-center justify-between py-3">
          <div className="h-6 bg-gray-200 animate-pulse rounded w-1/2" />
          <div className="h-4 w-4 bg-gray-200 animate-pulse rounded" />
        </div>

        {/* Accordion content skeleton */}
        <div className="space-y-1 pl-4 pb-2">
          {/* Section headers */}
          {Array.from({ length: 2 }).map((_, sectionIndex) => (
            <div key={`section-${sectionIndex}`} className="space-y-2">
              <div className="h-4 bg-gray-300 animate-pulse rounded w-1/3 mt-3" />
              {/* Section items */}
              {Array.from({ length: 3 }).map((_, itemIndex) => (
                <div key={`item-${itemIndex}`} className="h-4 bg-gray-200 animate-pulse rounded w-2/3 ml-2" />
              ))}
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
)

const MobileNav = () => {
  const user = useGetUser()

  // Fetch navigation data dynamically
  const trpc = useTRPC();
  const { data: navItems, isLoading } = useQuery(trpc.layout.getNavigationData.queryOptions());

  return (
    <Sheet>
      <SheetTrigger className='flex lg:hidden group -m-2 items-center p-2'>
        <Menu />
      </SheetTrigger>

      <SheetContent side='left' className='flex lg:hidden w-full h-full flex-col'>
        <SheetHeader className='flex justify-center items-center border-b border-primary/60'>
          <SheetTrigger asChild>
            <LogoFull />
          </SheetTrigger>
        </SheetHeader>

        <ScrollArea className='h-full pb-2 px-2 flex flex-col overflow-y-auto'>
          {isLoading ? (
            <MobileNavSkeleton />
          ) : (
            navItems?.map((navItem: INavItem) => (
              <React.Fragment key={navItem.id}>
                {
                  !navItem.children && navItem.href ?
                    (
                      <SheetTrigger asChild>
                        <Link href={navItem.href}
                          className='w-full p-5 flex items-center text-base text-left font-medium hover:bg-primary hover:text-primary-foreground border-b border-primary/80 capitalize'
                        >
                          {navItem.label}
                        </Link>
                      </SheetTrigger>
                    ) :
                    (
                      <Accordion type="multiple"
                        className='w-full px-5 py-2 border-b border-primary/80'
                      >
                        <AccordionItem value="item-1">
                          <AccordionTrigger className='text-base text-left !font-medium capitalize'>
                            {navItem.label}
                          </AccordionTrigger>

                          <AccordionContent asChild>
                            {/* @ts-expect-error it will just happen */}
                            {Object.entries(navItem?.children?.links).map(([key, value]) => (
                              <React.Fragment key={key}>
                                {
                                  value.map((itm) => (
                                    <SheetTrigger key={itm.id} asChild>
                                      <Link href={itm.href}
                                        className='w-full py-2 px-5 flex items-center text-base text-left  hover:bg-primary hover:text-primary-foreground capitalize'
                                      >
                                        {itm.label}
                                      </Link>
                                    </SheetTrigger>
                                  ))
                                }
                              </React.Fragment>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    )
                }
              </React.Fragment>
            ))
          )}
        </ScrollArea>

        <SheetFooter className='flex gap-2 flex-row'>
          {
            user ? (
              <div className='w-full flex flex-col gap-2'>
                <SheetTrigger className='flex-1' asChild>
                  <Button variant={"outline"} asChild>
                    <Link className='flex gap-2 items-center' href={PAGES_LINKS.wishlist.link}>
                      <Heart />
                      Wish List
                    </Link>
                  </Button>
                </SheetTrigger>
                <SheetTrigger className='flex-1' asChild>
                  <Button asChild>
                    <Link className='flex gap-2 items-center' href={PAGES_LINKS.account.link}>
                      <User />
                      Account
                    </Link>
                  </Button>
                </SheetTrigger>
              </div>
            ) :
              (
                <>
                  <SheetTrigger className='flex-1' asChild>
                    <Button variant={"ghost"} asChild>
                      <Link className='flex gap-2 items-center' href={PAGES_LINKS.login.link}>
                        <User />
                        Login
                      </Link>
                    </Button>
                  </SheetTrigger>
                  <SheetTrigger className='flex-1' asChild>
                    <Button asChild>
                      <Link href={PAGES_LINKS.register.link}>
                        Create Account
                      </Link>
                    </Button>
                  </SheetTrigger>
                </>
              )
          }
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav