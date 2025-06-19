import React from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import CategoriesComponent from './CategoriesComponent'
import SearchWrapperClient from './SearchWrapperClient'
import { CloseSearchBtn } from '../mini-client-fixes/SearchBtn'
import CategoriesSidebar from './CategoriesSidebar'
import SearchForm from './SearchForm'

const SearchComponent = () => {

  return (
    <SearchWrapperClient>
      <>
        <MaxWidthWrapper className=''>
          <div className="w-full flex gap-1 items-center border-b border-primary/50">
            <div className="flex md:hidden">
              <CategoriesSidebar />
            </div>
            <SearchForm />
            <CloseSearchBtn />
          </div>
        </MaxWidthWrapper>

        <MaxWidthWrapper className='hidden md:block overflow-hidden'>
          <CategoriesComponent />
        </MaxWidthWrapper>
      </>
    </SearchWrapperClient>
  )
}

export default SearchComponent