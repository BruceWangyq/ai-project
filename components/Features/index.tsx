import React from "react";
import FeatureCard from "./FeatureCard";
import featuresData from "./featuresData";

const Featrues = () => {
  return (
    <div>
      <section className="container grid justify-center items-center  gap-6 py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex flex-col gap-4 md:max-w-[52rem] justify-center items-center">
          <h2 className="text-3xl dark:text-white font-bold leading-[1.1] tracking-tighter sm:text-3xl md:text-6xl">
            Features
          </h2>
          <p className="max-w-[85%] leading-normal text-slate-700 dark:text-slate-200 sm:text-lg sm:leading-7">
            This project is an experiment to see how a modern app, with features
            like auth, subscriptions, API routes, and static pages would work in
            Next.js 13 app dir.
          </p>
        </div>
        <div className="grid justify-center gap-4 sm:grid-cols-2 md:max-w-[56rem] md:grid-cols-3">
          {featuresData.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
        <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[52rem] text-center">
          <p className="text-md leading-normal text-slate-700 dark:text-slate-300 sm:leading-7">
            More features coming soon!
          </p>
        </div>
      </section>
    </div>
  );
};

export default Featrues;
