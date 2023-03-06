import Link from "next/link";

const Hero = () => {
  return (
    <div>
      <section
        className="felx-wrap fadeInUp container mx-auto mt-24 grid w-full max-w-[900px] flex-col items-center justify-center gap-6 py-8 px-4 text-center md:py-12 lg:py-36"
        data-wow-delay=".2s"
      >
        <h1 className="mb-5 text-3xl font-extrabold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
          An AI Startup?
        </h1>
        <h1 className="mb-5 text-3xl font-extrabold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
          Nah, I just use API call to GPT-3.
        </h1>

        <p className="mb-5 text-base font-medium !leading-relaxed text-black/50 dark:text-white/50 dark:opacity-90 sm:text-lg md:text-xl">
          I am building this open source AI Startup websites to experiment the
          GPT-3 and stable diffusion. Follow along as we figure out together how
          to build a real AI startup.
        </p>
        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Link
            href="/prompt2image"
            className="bg-primary rounded-md bg-black py-4 px-8 text-base font-semibold text-white duration-300 ease-in-out hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80"
          >
            Get Started
          </Link>
          <Link
            href="https://github.com/BruceWangyq/ai-project"
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
