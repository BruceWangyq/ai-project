"use client"

import "@/styles/globals.css"

import { Analytics } from "@vercel/analytics/react"
import { SessionProvider } from "next-auth/react"

import { ThemeProvider } from "next-themes"

import type { Session } from "next-auth"

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode
  session: Session
}) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        {children}
        <Analytics />
      </ThemeProvider>
    </SessionProvider>
  )
}
