import React from "react";
import BrandCard from "./BrandCard";
import { brandsData } from "./brandsData";

const Brands = () => {
  return (
    <section>
      <div className="">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="wow fadeInUp flex items-center justify-center rounded-md bg-dark my-8 sm:mb-12 px-8 dark:bg-primary dark:bg-opacity-5  md:px-[50px] xl:py-2 2xl:py-4 2xl:px-[70px]"
              data-wow-delay=".1s"
            >
              {brandsData.map((brand) => (
                <BrandCard key={brand.id} brand={brand} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <hr className="border-slate-200" />
    </section>
  );
};

export default Brands;
