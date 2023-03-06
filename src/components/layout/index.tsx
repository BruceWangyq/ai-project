import Footer from "../Footer"
import Header from "../Header"
import Meta from "./meta"

export default function Layout({
  meta,
  children,
}: {
  meta?: {
    title?: string
    description?: string
    image?: string
  }
  children: React.ReactNode
}) {
  return (
    <>
      <Meta {...meta} />
      <div className="flex min-h-screen max-w-full flex-col items-center justify-center ">
        <Header />
        <main className="mx-auto my-auto flex w-full flex-col items-center justify-center">
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}
