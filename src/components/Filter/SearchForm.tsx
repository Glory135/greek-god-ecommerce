"use client"

import { Search } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useProductFilters } from '@/hooks/use-products-filters'
import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PAGES_LINKS } from '@/utils/linksData'

const SearchForm = () => {
  const [filters, setFilters] = useProductFilters();
  const [searchValue, setSearchValue] = useState(filters.search || "")
  const router = useRouter()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push(`${PAGES_LINKS.products.link}?search=${filters.search}`)
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilters({ search: searchValue })
    }, 500)
    return () => clearTimeout(timeoutId)
  }, [searchValue, setFilters])

  return (
    <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-1">
      <Button variant={"ghost"} size={"sm"} type='submit'>
        <Search className='text-primary/60' />
      </Button>
      <Input
        name='search'
        className='h-8 p-0 text-base font-normal border-0 !bg-transparent focus-visible:border-0 focus-visible:ring-0 focus:outline-none'
        placeholder='What do you want to search for?'
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </form>
  )
}

export default SearchForm