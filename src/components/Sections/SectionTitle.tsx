import { cn } from '@/lib/utils'
import React from 'react'

const SectionTitle = ({ title, className }: { title: string, className?: string }) => {
  return (
    <div className={cn('w-full mb-5', className && className)}>
      <h3 className='text-greek text-lg sm:text-2xl font-bold'>{title}</h3>
    </div>
  )
}

export default SectionTitle