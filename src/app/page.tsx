import Brands from "@/components/brands";
import Features from "@/components/features";
import Hero from "@/components/hero";
import Pricing from "@/components/pricing";
import Testimonials from "@/components/testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Brands />
      <Testimonials />
      <Pricing />
    </>
  );
}
