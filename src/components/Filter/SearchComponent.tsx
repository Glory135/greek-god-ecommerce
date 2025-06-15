import { cn } from '@/lib/utils'
import React, { Dispatch, SetStateAction } from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import { Search, X } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

const SearchComponent = ({ open, setOpen }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) => {
  return (
    <div className={
      cn(
        `absolute z-30 bottom-0 right-0 left-0 w-full bg-background/90 backdrop-blur-md py-5  transition-all ease-out`,
        open && "translate-y-full"
      )}>
      <MaxWidthWrapper className=''>
        <div className="w-full flex gap-2 items-center p-3 border-b border-primary/50">
          <form className="flex-1 flex items-center gap-3">
            <Button variant={"ghost"} size={"sm"} type='submit'>
              <Search className='text-primary/60' />
            </Button>
            <Input
              name='search'
              className='h-8 p-0 text-base font-normal border-0 !bg-transparent focus-visible:border-0 focus-visible:ring-0 focus:outline-none'
              placeholder='What do you want to search for?' />
          </form>
          <Button variant={"ghost"} size={"sm"} onClick={() => setOpen(false)}>
            <X className='text-primary/60' />
          </Button>
        </div>

      </MaxWidthWrapper>
    </div>
  )
}

export default SearchComponent