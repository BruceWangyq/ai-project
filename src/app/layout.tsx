// import Footer from "./Footer"
// import Header from "./Header"
// import Meta from "./meta"

// export default function Layout({
//   meta,
//   children,
// }: {
//   meta?: {
//     title?: string
//     description?: string
//     image?: string
//   }
//   children: React.ReactNode
// }) {
//   return (
//     <>
//       <Meta {...meta} />
//       <div className="flex min-h-screen max-w-full flex-col items-center justify-center ">
//         <Header />
//         <main className="mx-auto my-auto flex w-full flex-col items-center justify-center">
//           {children}
//         </main>
//         <Footer />
//       </div>
//     </>
//   )
// }

"use client"

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import "node_modules/react-modal-video/css/modal-video.css"
import "../styles/index.css"
import { Providers } from "./providers"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body className="flex min-h-screen max-w-full flex-col items-center justify-center">
        <Providers >
          <Header />
          <main className="m-auto flex w-full flex-col items-center justify-center">
            {children}{" "}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
