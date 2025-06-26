import { useProductFilters } from '@/hooks/use-products-filters'
import React from 'react'
import { CheckBoxFilter } from './CheckBoxFilters';

const ProductSort = () => {
  const [filters, setFilters] = useProductFilters();

  return (
    <>
      <CheckBoxFilter
        isChecked={filters.sort === "featured"}
        checkChange={() => { setFilters({ sort: "featured" }) }}
        label='Featured'
      />
      <CheckBoxFilter
        isChecked={filters.sort === "oldest"}
        checkChange={() => { setFilters({ sort: "oldest" }) }}
        label='Old To New'
      />
      <CheckBoxFilter
        isChecked={filters.sort === "newest"}
        checkChange={() => { setFilters({ sort: "newest" }) }}
        label='New To Old'
      />
      <CheckBoxFilter
        isChecked={filters.sort === "bestseller"}
        checkChange={() => { setFilters({ sort: "bestseller" }) }}
        label='Best Seller'
      />
      <CheckBoxFilter
        isChecked={filters.sort === "pricel"}
        checkChange={() => { setFilters({ sort: "pricel" }) }}
        label='Price: Low to High'
      />
      <CheckBoxFilter
        isChecked={filters.sort === "priceh"}
        checkChange={() => { setFilters({ sort: "priceh" }) }}
        label='Price: High To Low'
      />
    </>
  )
}

export default ProductSort