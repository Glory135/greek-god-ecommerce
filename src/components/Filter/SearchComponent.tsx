import React from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import CategoriesComponent from './CategoriesComponent'
import SearchWrapperClient from './SearchWrapperClient'
import { CloseSearchBtn } from '../mini-client-fixes/SearchBtn'
import CategoriesSidebar from './CategoriesSidebar'
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import SearchForm from './SearchForm'

const SearchComponent = () => {

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.categories.getMany.queryOptions(),
  )

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
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<p>Loading...</p>}>
              <CategoriesComponent />
            </Suspense>
          </HydrationBoundary>
        </MaxWidthWrapper>
      </>
    </SearchWrapperClient>
  )
}

export default SearchComponent