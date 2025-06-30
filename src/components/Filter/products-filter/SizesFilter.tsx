import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { CheckBoxFilter, CheckBoxFilterSkeleton } from './CheckBoxFilters';

interface Props {
  value: string[] | null,
  onChange: (value: string[]) => void;
}

const SizesFilter = ({ value, onChange }: Props) => {
  const trpc = useTRPC()
  const { data: sizes, isLoading } = useQuery(trpc.sizes.getMany.queryOptions())

  const onClick = (size: string) => {
    if (value?.includes(size)) {
      onChange(value?.filter((c) => c !== size) || []);
    } else {
      onChange([...(value || []), size]);
    }
  }

  if (isLoading) {
    return (
      <>
        {
          Array.from({ length: 5 }).map((_, index) => (
            <CheckBoxFilterSkeleton key={index} />))
        }
      </>
    )
  }

  return (
    <>
      {
        sizes?.docs.map((size) => (
          <CheckBoxFilter
            key={size.id}
            isChecked={value?.includes(size.size)}
            checkChange={() => { onClick(size.size) }}
            label={size.label}
          />
        ))
      }
    </>
  )
}

export default SizesFilter