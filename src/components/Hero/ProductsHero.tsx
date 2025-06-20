
const ProductsHero = () => {
  return (
    <section
      style={{
        backgroundImage: `linear-gradient(to bottom, #456d4550, rgba(0, 0, 0, 0.571)), url(/images/products-hero.jpg)`
      }}
      className={`w-full bg-center bg-cover bg-no-repeat min-h-[500px] flex items-end py-20 px-5`}>
      {/* <MaxWidthWrapper>
        <div className="flex w-fit max-w-full flex-col gap-5">
          <p className='text-white text-xl max-w-[450px]'>
            Crafted for every journey, designed for every man.
            Enduring style, unwavering confidence
          </p>
          <Button className='flex w-fit px-10' >New Arrivals</Button>
        </div>
      </MaxWidthWrapper> */}
    </section>
  )
}

export default ProductsHero