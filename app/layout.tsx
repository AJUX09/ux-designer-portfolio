import type { Metadata } from 'next'
import './globals.css'
import './style.css'
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { InfiniteGridBackground } from "@/components/ui/the-infinite-grid";
import { ThemeProvider } from "@/components/theme-provider";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'Jespar — AI-Enhanced UI/UX Designer',
  description: 'UI/UX Designer pairing human creativity with AI to deliver better experiences, faster — since 2020.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("dark font-sans", geist.variable)} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <InfiniteGridBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
