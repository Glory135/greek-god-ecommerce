import React from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import { Search } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import CategoriesComponent from './CategoriesComponent'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Category } from '@/payload-types'
import SearchWrapperClient from './SearchWrapperClient'
import { CloseSearchBtn } from '../mini-client-fixes/SearchBtn'
import { CustomCategory } from '@/app/(app)/types'
import CategoriesSidebar from './CategoriesSidebar'

const SearchComponent = async () => {

  const payload = await getPayload({
    config: configPromise,
  })

  const data = await payload.find({
    collection: "categories",
    depth: 1, // populate sub categories
    pagination: false,
    where: {
      parent: {
        exists: false,
      }
    },
    sort: "name"
  })

  const formattedData: CustomCategory[] = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
      // because of dept 1 we know "doc" will be of type Category
      ...(doc as Category),
      subcategories: undefined
    }))
  }))

  return (
    <SearchWrapperClient>
      <>
        <MaxWidthWrapper className=''>
          <div className="w-full flex gap-1 items-center border-b border-primary/50">
          <div className="flex md:hidden">
            <CategoriesSidebar data={formattedData} />
          </div>
          
            <form className="flex-1 flex items-center gap-1">
              <Button variant={"ghost"} size={"sm"} type='submit'>
                <Search className='text-primary/60' />
              </Button>
              <Input
                name='search'
                className='h-8 p-0 text-base font-normal border-0 !bg-transparent focus-visible:border-0 focus-visible:ring-0 focus:outline-none'
                placeholder='What do you want to search for?' />
            </form>
            <CloseSearchBtn />
          </div>
        </MaxWidthWrapper>

        <MaxWidthWrapper className='hidden md:block overflow-hidden'>
          <CategoriesComponent data={formattedData} />
        </MaxWidthWrapper>
      </>
    </SearchWrapperClient>
  )
}

export default SearchComponent