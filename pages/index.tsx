import Layout from "../components/layout";
import Hero from "../components/Hero";
import Featrues from "../components/Features";
import Brands from "../components/Brands";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";

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
