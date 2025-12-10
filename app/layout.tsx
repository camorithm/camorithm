import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
title: 'Cameron Batt | GTM Go-To-Market Consultant',
description: 'AI Researcher & GTM Consultant',
}

export default function RootLayout({
children,
}: {
children: React.ReactNode
}) {
return (
  // @ts-ignore
  <html lang="en">
    <body className={inter.className}>{children}</body>
  {/* @ts-ignore */}
  </html>
)
}