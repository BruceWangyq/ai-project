import Image from "next/image"
import Link from "next/link"
import React from "react"

interface FeatureCardProps {
  feature: {
    id: number
    img: string
    title: string
    paragraph: string
    link: string
  }
}

const FeatureCard = ({ feature }: FeatureCardProps) => {
  const { img, title, paragraph, link } = feature
  return (
    <Link href={link}>
      <div className="relative mx-16 max-h-[400px] overflow-hidden rounded-2xl border-4 border-black p-2 shadow-2xl hover:border-slate-500 dark:border-white dark:border-white/50 sm:mx-2 sm:h-[250px]">
        <div className="flex  flex-col items-center justify-between rounded-md bg-transparent p-6 text-slate-200">
          <div className="flex h-20 w-full items-center justify-center">
            <Image
              src={img}
              alt="feature image"
              className="max-h-20 rounded-lg"
              width={110}
              height={100}
            />
          </div>
          <div className="space-y-2 text-center">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              {title}
            </h3>
            <p className="text-sm text-slate-800 dark:text-slate-200">
              {paragraph}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default FeatureCard
