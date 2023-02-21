interface PricingBoxProps {
  price: string;
  duration: string;
  packageName: string;
  subtitle: string;
  children: React.ReactNode;
}

const PricingBox = (props: PricingBoxProps) => {
  const { price, duration, packageName, subtitle, children } = props;

  return (
    <div className="w-full">
      <div
        className="wow fadeInUp relative z-10 rounded-2xl bg-transparent px-8 mx-8 sm:mx-2 py-10 shadow-signUp border-2"
        data-wow-delay=".1s"
      >
        <div className="flex items-center justify-between">
          <h3 className="price mb-2 text-3xl font-bold text-black dark:text-white">
            $<span className="amount">{price}</span>
            <span className="time text-black dark:text-white">/{duration}</span>
          </h3>
          <h4 className="mb-2 text-xl font-bold text-black dark:text-white">
            {packageName}
          </h4>
        </div>
        <p className="mb-7 text-base text-black dark:text-white">{subtitle}</p>
        <div className="mb-8 border-b border-body-color border-opacity-10 pb-8 dark:border-white dark:border-opacity-10">
          <button className="flex w-full items-center justify-center rounded-md bg-black p-3 text-base font-semibold text-white dark:text-black dark:bg-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
            Start Free Trial
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default PricingBox;
