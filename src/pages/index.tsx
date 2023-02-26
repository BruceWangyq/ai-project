import Layout from "@/components/layout";
import Hero from "@/components/hero";
import Features from "@/components/features";
import Brands from "@/components/brands";
import Testimonials from "@/components/testimonials";
import Pricing from "@/components/pricing";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Features />
      <Brands />
      <Testimonials />
      <Pricing />
    </Layout>
  );
}
