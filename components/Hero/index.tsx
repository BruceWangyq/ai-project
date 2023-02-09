import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div>
      <section
        className="container grid justify-center gap-6 py-8 md:py-12 lg:py-36 felx-wrap flex-col items-center w-full mt-24 px-4 fadeInUp mx-auto max-w-[900px] text-center"
        data-wow-delay=".2s"
      >
        <h1 className="mb-5 text-3xl font-extrabold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
          An AI Startup?
        </h1>
        <h1 className="mb-5 text-3xl font-extrabold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
          Nah, I just use API call to GPT-3.
        </h1>
        {/* <Image
          src="/images/we_are_an_ai_startup.jpeg"
          alt="Next.js Startup Template"
          width={300}
          height={450}
          className="rounded-2xl mb-5"
        /> */}
        <p className="mb-5 text-base font-medium !leading-relaxed text-black/50 dark:text-white/50 dark:opacity-90 sm:text-lg md:text-xl">
          I am building this open source AI Startup websites to experiment the
          GPT-3 and stable diffusion. Follow along as we figure out together how
          to build a real AI startup.
        </p>
        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Link
            href="https://nextjstemplates.com/templates/startup"
            className="rounded-md bg-primary py-4 px-8 text-base font-semibold text-white dark:text-black bg-black dark:bg-white duration-300 ease-in-out hover:bg-primary/80"
          >
            Get Started
          </Link>
          <Link
            href="https://github.com/NextJSTemplates/startup-nextjs"
            className="rounded-md bg-black/20 py-4 px-8 text-base font-semibold text-black duration-300 ease-in-out hover:bg-black/30 dark:bg-white/20 dark:text-white dark:hover:bg-white/30"
          >
            Star on GitHub
          </Link>
        </div>
      </section>
      <hr className="border-slate-200" />
    </div>
  );
};

export default Hero;
