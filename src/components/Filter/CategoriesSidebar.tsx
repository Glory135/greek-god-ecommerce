import { CustomCategory } from '@/app/(app)/types'
import React, { Dispatch, SetStateAction } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '../ui/sheet'
import { ScrollArea } from '../ui/scroll-area'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import Link from 'next/link'
import { paramBuilder } from '@/utils/commonFunctions'
import { PAGES_LINKS } from '@/utils/linksData'
import { handleSubCategoryLink } from './filterFuncs'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { ListFilterIcon } from 'lucide-react'

interface CategoriesSidebarProps {
  data: CustomCategory[],
}

const CategoriesSidebar = ({ data }: CategoriesSidebarProps) => {

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size={"sm"}
          variant={"ghost"}
          className={cn("h-11 px-4",
            // isActiveCategoryHiden && !isAnyHovered && "bg-primary text-primary-foreground shadow-sm",
          )}>
          {/* View All */}
          <ListFilterIcon />
        </Button>
      </SheetTrigger>

      <SheetContent side='left' className='flex  w-full h-full flex-col'>
        <SheetHeader className='flex justify-center items-center border-b border-primary/60 font-bold text-lg'>
          Flter By Categories
        </SheetHeader>

        <ScrollArea className='h-full pb-2 px-2 flex flex-col overflow-y-auto'>
          {data.map((category) => (
            <React.Fragment key={category.id}>
              {
                !category.subcategories || category.subcategories.length === 0 ?
                  (
                    <SheetTrigger asChild>
                      <Link href={`
                      ${paramBuilder(
                        PAGES_LINKS.products.link,
                        { category: category.slug === "all" ? null : category.slug }
                      )}`}
                        className='w-full p-5 flex items-center text-base text-left font-medium hover:bg-primary hover:text-primary-foreground capitalize'
                      >
                        {category.name}
                      </Link>
                    </SheetTrigger>
                  ) :
                  (
                    <Accordion type="multiple"
                      className='w-full'
                    >
                      <AccordionItem value="item-1">
                        <AccordionTrigger className='w-full p-5 text-base text-left !font-medium capitalize hover:bg-primary hover:text-primary-foreground'>
                          {category.name}
                        </AccordionTrigger>

                        <AccordionContent asChild className='pb-3 pt-1'>
                          {category?.subcategories.map((subCat) => (
                            <SheetTrigger key={subCat.id} asChild>
                              <Link href={handleSubCategoryLink(subCat as CustomCategory, category)}
                                className='w-full py-2 px-5 flex items-center text-base text-left  hover:bg-primary hover:text-primary-foreground capitalize'
                              >
                                {subCat.name}
                              </Link>
                            </SheetTrigger>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  )
              }
            </React.Fragment>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

export default CategoriesSidebar