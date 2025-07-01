"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '../ui/carousel'
import Autoplay from "embla-carousel-autoplay"
import ProductCard from '../Products/ProductCard'
import { ProductType } from '@/modules/products/types'

const ProductsCarousel = ({ data }: { data: Array<ProductType> }) => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  useEffect(() => {
    if (!api) {
      return
    }
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const scrollTo = (index: number) => {
    api?.scrollTo(index)
  }

  return (
    <div className="w-full flex flex-col justify-center items-center gap-2">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          align: "center",
          loop: true,
        }}
        setApi={setApi}
      >
        <CarouselContent>
          {data?.map((singleProduct, index) => (
            <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/3 xl:basis-1/4">
              <ProductCard
                id={singleProduct.id}
                name={singleProduct.name}
                price={singleProduct.price}
                collection={singleProduct.collection[0]}
                colors={singleProduct['available colors']}
                imageUrl={singleProduct?.image?.url}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex items-center justify-center gap-2 py-4">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ease-in-out ${current === index + 1
              ? 'bg-primary scale-125'
              : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductsCarousel