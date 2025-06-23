"use client"

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatPrice } from '@/lib/utils';
import { ChangeEvent } from 'react'

interface Props {
  maxPrice?: string | null;
  minPrice?: string | null;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
}

const PriceFilter = ({
  maxPrice,
  minPrice,
  onMinPriceChange,
  onMaxPriceChange }: Props) => {

  const handleMinPicechange = (e: ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    onMinPriceChange(numericValue)
  }
  const handleMaxPicechange = (e: ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    onMaxPriceChange(numericValue)
  }

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-col gap-2'>
        <Label className='font-medium text-base'>
          Minimum price:
        </Label>
        <Input
          type='text'
          placeholder='NGN 0'
          value={minPrice
            ? formatPrice( minPrice )
            : ""}
          onChange={handleMinPicechange}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <Label className='font-medium text-base'>
          Maximum price:
        </Label>
        <Input
          type='text'
          placeholder='∞'
          value={maxPrice
            ? formatPrice( maxPrice )
            : ""}
          onChange={handleMaxPicechange}
        />
      </div>
    </div>
  )
}

export default PriceFilter