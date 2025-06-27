import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet'
import { SlidersHorizontal } from 'lucide-react'
import React from 'react'
import ProductsFilterComponent from './ProductsFilterComponent'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'

const MobileProductFilter = () => {
  return (
    <Sheet>
      <div className="w-full flex justify-center">
        <SheetTrigger className='group -m-2 flex items-center p-2 justify-center gap-2 my-5' asChild>
          <Button variant={"secondary"} className='w-fit !px-20'>
            <SlidersHorizontal
              aria-hidden='true'
              className='h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
            />
            Filter
          </Button>
        </SheetTrigger>
      </div>

      <SheetContent side='left' className='flex w-full flex-col p-5 sm:max-w-lg'>
        <SheetHeader className='flex flex-row border-b border-primary/60 gap-2'>
          <SlidersHorizontal
            aria-hidden='true'
            className='h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
          /> <h2 className='font-bold text-lg'> Filter Products</h2>
        </SheetHeader>
        <ScrollArea className='h-full pb-2 flex flex-col overflow-y-auto'>
          <ProductsFilterComponent showHeader={false} />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

export default MobileProductFilter