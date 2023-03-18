"use client";

import { useState } from "react";
import SectionTitle from "@/components/common/SectionTitle";

import OfferList from "./OfferList";
import PricingBox from "./PricingBox";

const Pricing = () => {
  const [isMonthly, setIsMonthly] = useState(true);

  return (
    <section id="pricing" className="relative z-10 py-2 md:py-4 lg:py-8">
      <div className="container">
        <SectionTitle
          title="Simple and Affordable Pricing"
          paragraph="Choose the best plan for your business."
          center
          width="665px"
        />

        <div className="w-full">
          <div
            className="wow fadeInUp mb-8 flex justify-center md:mb-12 lg:mb-16"
            data-wow-delay=".1s"
          >
            <span
              onClick={() => setIsMonthly(true)}
              className={`${
                isMonthly
                  ? "text-primary pointer-events-none text-black dark:text-white"
                  : "text-black dark:text-white"
              } mr-4 cursor-pointer text-base font-semibold`}
            >
              Monthly
            </span>
            <div
              onClick={() => setIsMonthly(!isMonthly)}
              className="flex cursor-pointer items-center"
            >
              <div className="relative">
                <div className="h-5 w-14 rounded-full bg-black shadow-inner dark:bg-white"></div>
                <div
                  className={`${
                    isMonthly ? "" : "translate-x-full"
                  } shadow-switch-1 bg-primary absolute left-0 top-[-4px] flex h-7 w-7 items-center justify-center rounded-full transition`}
                >
                  <span className="active h-4 w-4 rounded-full bg-white dark:bg-black"></span>
                </div>
              </div>
            </div>
            <span
              onClick={() => setIsMonthly(false)}
              className={`${
                isMonthly
                  ? "text-black dark:text-white"
                  : "text-primary pointer-events-none text-black dark:text-white"
              } ml-4 cursor-pointer text-base font-semibold`}
            >
              Yearly
            </span>
          </div>
        </div>

        <div className="mx-auto grid max-w-[85%] grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-2">
          <PricingBox
            packageName="Personal"
            price={isMonthly ? "9" : "99"}
            duration={isMonthly ? "mo" : "yr"}
            subtitle="Here are some of the features that we provide for those of you who will be using this template for personal use."
          >
            <OfferList text="5 API Call Per Day" status="active" />
            <OfferList text="Commercial Use" status="inactive" />
            <OfferList text="Email Support" status="inactive" />
            <OfferList text="Lifetime Access" status="inactive" />
            <OfferList text="Free Lifetime Updates" status="inactive" />
          </PricingBox>
          <PricingBox
            packageName="Commercial"
            price={isMonthly ? "19" : "149"}
            duration={isMonthly ? "mo" : "yr"}
            subtitle="Here are the most complete features that we provide for those of you who will be using this template for commercial use."
          >
            <OfferList text="Unlimited API Call" status="active" />
            <OfferList text="Commercial Use" status="active" />
            <OfferList text="Email Support" status="active" />
            <OfferList text="Lifetime Access" status="active" />
            <OfferList text="Free Lifetime Updates" status="active" />
          </PricingBox>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
