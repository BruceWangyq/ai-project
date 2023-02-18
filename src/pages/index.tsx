import Layout from "@/components/layout";
import Hero from "@/components/hero";
import Featrues from "@/components/features";
import Brands from "@/components/brands";
import Testimonials from "@/components/testimonials";
import Pricing from "@/components/pricing";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Featrues />
      <Brands />
      <Testimonials />
      <Pricing />
    </Layout>
  );
}
