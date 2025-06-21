import React, { Suspense } from 'react'
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
          <Suspense fallback={<CategoriesSkeleton />}>
            <CategoriesComponent />
          </Suspense>
        </MaxWidthWrapper>
      </>
    </SearchWrapperClient>
  )
}

export default SearchComponent

const CategoriesSkeleton = () => {
  return (
    <div className="flex items-center gap-3">
      {/* Placeholder for category items */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="h-10 w-24 animate-pulse rounded-lg bg-gray-300"
        />
      ))}

      {/* Placeholder for "View All" button */}
      <div className="h-10 w-24 animate-pulse rounded-lg bg-gray-300" />
    </div>
  )
}