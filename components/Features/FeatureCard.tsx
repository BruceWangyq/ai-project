import Image from "next/image";
import Link from "next/link";
import React from "react";

interface FeatureCardProps {
  feature: {
    id: number;
    img: string;
    title: string;
    paragraph: string;
    link: string;
  };
}

const FeatureCard = ({ feature }: FeatureCardProps) => {
  const { img, title, paragraph, link } = feature;
  return (
    <Link href={link}>
      <div className="relative overflow-hidden rounded-lg border-4 border-black dark:border-white  p-2 shadow-2xl">
        <div className="flex h-[280px] flex-col justify-between items-center rounded-md bg-white dark:bg-black p-6 text-slate-200">
          <Image
            src={img}
            alt="feature image"
            className="rounded-md"
            width={100}
            height={100}
          />
          <div className="space-y-2">
            <h3 className="font-bold text-base text-slate-800 dark:text-slate-200">
              {title}
            </h3>
            <p className="text-sm text-slate-800 dark:text-slate-200">
              {paragraph}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeatureCard;
