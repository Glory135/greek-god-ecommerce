import React from 'react'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from '../ui/sheet'
import { Menu, User } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ScrollArea } from '../ui/scroll-area'
import { NAV_ITEMS } from '@/config';
import { LogoFull } from '../Logo'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'


const MobileNav = () => {
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
          {NAV_ITEMS.map((navItem) => (
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
          ))}
        </ScrollArea>

        <SheetFooter className='flex gap-2 flex-row'>
          <SheetTrigger className='flex-1' asChild>
            <Button variant={"ghost"} asChild>
              <Link className='flex gap-2 items-center' href={"/login"}>
                <User />
                Login
              </Link>
            </Button>
          </SheetTrigger>
          <SheetTrigger className='flex-1' asChild>
            <Button asChild>
              <Link href={"/register"}>
                Create Account
              </Link>
            </Button>
          </SheetTrigger>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav