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
      <div className="relative overflow-hidden rounded-2xl border-4 border-black dark:border-white hover:border-slate-500 dark:border-white/50 p-2 shadow-2xl mx-16 sm:mx-2 sm:h-[250px] max-h-[400px]">
        <div className="flex  flex-col justify-between items-center rounded-md bg-transparent p-6 text-slate-200">
          <div className="flex justify-center items-center w-full h-20">
            <Image
              src={img}
              alt="feature image"
              className="rounded-lg max-h-20"
              width={110}
              height={100}
            />
          </div>
          <div className="space-y-2 text-center">
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
