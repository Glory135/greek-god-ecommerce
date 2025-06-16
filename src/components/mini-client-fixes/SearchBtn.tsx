"use client"

import React from 'react'
import { Button } from '../ui/button'
import { Search, X } from 'lucide-react'
import useDashboardStore from '@/zustand/DashboardStore'

const SearchBtn = () => {
  const { toggleSearchOpen } = useDashboardStore((state => state))

  return (
    <Button
      onClick={() => toggleSearchOpen()}
      variant={"ghost"}
      size={"sm"}>
      <Search />
    </Button>
  )
}

export default SearchBtn

export const CloseSearchBtn = () => {
  const { setSearchOpen } = useDashboardStore((state => state))

  return (
    <Button variant={"ghost"} size={"sm"}
      onClick={() => setSearchOpen(false)}
    >
      <X className='text-primary/60' />
    </Button>
  )
}