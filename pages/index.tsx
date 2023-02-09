import Layout from "../components/layout";
import Hero from "../components/Hero";
import Featrues from "../components/Features";
import Brands from "../components/Brands";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Featrues />
      <Brands />
    </Layout>
  );
}
