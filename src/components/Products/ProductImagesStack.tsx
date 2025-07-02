"use client"

import { Media } from '@/payload-types'
import Image from 'next/image'
import React, { useState, useEffect, useRef } from 'react'

const ProductImagesStack = ({ images }: { images: Array<{ image: Media }> | null }) => {
  const validImages = images || [];
  const [focusedIdx, setFocusedIdx] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Carousel effect
  useEffect(() => {
    if (validImages.length <= 1) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setFocusedIdx((prev) => (prev + 1) % validImages.length);
    }, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [validImages.length]);

  // Reset carousel timer on manual click
  const handleThumbnailClick = (idx: number) => {
    setFocusedIdx(idx);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setFocusedIdx((prev) => (prev + 1) % validImages.length);
      }, 4000);
    }
  };

  const focusedImg = validImages[focusedIdx]?.image || null;

  return (
    <div className='w-full flex flex-row gap-2'>
      {
        validImages.length > 1 && (
          <div className="w-[70px] items-center justify-center flex flex-col gap-3 ">
            {
              validImages.map((image, idx) => (
                <div
                  key={image.image?.url || idx}
                  className={`relative w-[70px] aspect-square cursor-pointer ${focusedIdx === idx ? 'ring-2 ring-greek-500' : ''}`}
                  onClick={() => handleThumbnailClick(idx)}
                >
                  <Image
                    alt={image?.image?.alt || "product"}
                    src={image?.image?.url || "/images/placeholder.png"}
                    fill
                    className='object-cover'
                  />
                </div>
              ))
            }
          </div>
        )
      }

      <div className="relative flex-1 aspect-[2.5/3] sm:aspect-[1/0.8] md:aspect-square xl:aspect-[1/.7]  ">
        {focusedImg && (
          <Image
            alt={focusedImg?.alt || "product"}
            src={focusedImg?.url || "/images/placeholder.png"}
            fill
            className='object-contain'
          />
        )}
      </div>
    </div>
  )
}

export default ProductImagesStack