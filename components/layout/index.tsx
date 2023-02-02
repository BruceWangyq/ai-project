import Footer from "./Footer";
import Header from "./Header";
import Meta from "./meta";

export default function Layout({
  meta,
  children,
}: {
  meta?: {
    title?: string;
    description?: string;
    image?: string;
  };
  children: React.ReactNode;
}) {
  return (
    <>
      <Meta {...meta} />
      <div className="flex flex-col min-h-screen w-full justifi mx-auto ">
        <Header />
        <main className="flex w-full flex-col items-center justify-center mx-auto my-auto">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
