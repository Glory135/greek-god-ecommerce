import React from 'react'

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className='w-full mb-5'>
      <h3 className='text-greek text-lg sm:text-2xl font-bold'>{title}</h3>
    </div>
  )
}

export default SectionTitle