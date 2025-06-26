import React from 'react';
import ProductCardSkeleton from './ProductCardSkeleton';

interface ProductCardSkeletonGridProps {
  count?: number;
  className?: string;
}

const ProductCardSkeletonGrid = ({ count = 8, className = '' }: ProductCardSkeletonGridProps) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default ProductCardSkeletonGrid; 