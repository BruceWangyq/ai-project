import React from "react"
import FeatureCard from "./FeatureCard"
import featuresData from "./featuresData"

const Featrues = () => {
  return (
    <div>
      <section className="container flex flex-col items-center justify-center  gap-6 py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex flex-col items-center justify-center gap-4">
          <h2 className="text-3xl font-bold leading-[1.1] tracking-tighter dark:text-white sm:text-3xl md:text-6xl">
            Features
          </h2>
          <p className="max-w-[85%] leading-normal text-slate-700 dark:text-slate-200 sm:text-lg sm:leading-7">
            This project is an experiment to see how a modern app, with features
            like auth, subscriptions, API routes, and static pages would work in
            Next.js 13 app dir.
          </p>
        </div>
        <div className="grid max-w-[85%] justify-center gap-4 sm:grid-cols-2 md:grid-cols-3">
          {featuresData.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
        <div className="mx-auto flex w-full flex-col gap-4 text-center md:max-w-[52rem]">
          <p className="text-md leading-normal text-slate-700 dark:text-slate-300 sm:leading-7">
            More features coming soon!
          </p>
        </div>
        <hr className="border-slate-200" />
      </section>
    </div>
  )
}

export default Featrues
