import Image from "next/image"
import Link from "next/link"
import React from "react"

interface BrandCardProps {
  brand: {
    href: string
    image: string
    name: string
  }
}

const BrandCard = ({ brand }: BrandCardProps) => {
  const { href, image, name } = brand

  return (
    <div className="relative mx-3 flex h-10 items-center  justify-center  opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 dark:opacity-60 dark:hover:opacity-100 sm:mx-4 xl:mx-6 2xl:mx-8">
      <Link href={href} target="_blank" rel="nofollow noreferrer">
        <Image src={image} alt={name} width={80} height={80} />
      </Link>
    </div>
  )
}

export default BrandCard
