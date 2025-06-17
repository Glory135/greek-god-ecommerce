"use client"

import { Search } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

const SearchForm = () => {
  return (
    <form className="flex-1 flex items-center gap-1">
      <Button variant={"ghost"} size={"sm"} type='submit'>
        <Search className='text-primary/60' />
      </Button>
      <Input
        name='search'
        className='h-8 p-0 text-base font-normal border-0 !bg-transparent focus-visible:border-0 focus-visible:ring-0 focus:outline-none'
        placeholder='What do you want to search for?' />
    </form>
  )
}

export default SearchForm