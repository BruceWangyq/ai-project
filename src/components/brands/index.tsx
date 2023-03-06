import React from "react"
import BrandCard from "./BrandCard"
import { brandsData } from "./brandsData"

const Brands = () => {
  return (
    <section>
      <div className="">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="wow fadeInUp bg-dark dark:bg-primary my-8 flex items-center justify-center rounded-md px-8 dark:bg-opacity-5 sm:mb-12  md:px-[50px] xl:py-2 2xl:py-4 2xl:px-[70px]"
              data-wow-delay=".1s"
            >
              {brandsData.map((brand) => (
                <BrandCard key={brand.id} brand={brand} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Brands
