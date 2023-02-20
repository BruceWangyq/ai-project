import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { Toaster } from "react-hot-toast";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <Component {...pageProps} />
        <Analytics />
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  );
}
