"use client"

import { cn } from '@/lib/utils'
import useDashboardStore from '@/zustand/DashboardStore';
import React from 'react'

const SearchWrapperClient = ({ children }: Readonly<{
  children: React.ReactNode;
}>) => {
  const { searchOpen } = useDashboardStore((state => state))
  return (
    <div className={
      cn(
        `absolute flex flex-col gap-5 z-30 bottom-0 right-0 left-0 w-full bg-background/90 backdrop-blur-md py-5  transition-all ease-out shadow-primary/10 shadow-sm`,
        searchOpen && "translate-y-full"
      )}>
      {children}
    </div>
  )
}

export default SearchWrapperClient