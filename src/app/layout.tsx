import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ConditionalNavigation } from "@/components/conditional-navigation";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: "swap",
});

// Using system monospace font instead of GeistMono to avoid loading issues
const geistMono = {
  variable: "--font-geist-mono",
};

export const metadata: Metadata = {
  title: "bwissal - Full-Stack Developer & Web Designer",
  description: "Full-stack developer and web designer specializing in React, Next.js, Node.js, and modern web technologies. Creating scalable applications with exceptional user experience.",
  keywords: ["full stack developer", "web developer", "React developer", "Next.js", "Node.js", "TypeScript", "web designer", "UI/UX design", "JavaScript", "MongoDB", "portfolio"],
  authors: [{ name: "bwissal" }],
  creator: "bwissal",
  metadataBase: new URL("https://www.bwissal.software"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.bwissal.software",
    title: "BAAZIZ Wissal - Full-Stack Developer & Web Designer",
    description: "Full-stack developer and web designer specializing in React, Next.js, Node.js, and modern web technologies.",
    siteName: "BAAZIZ Wissal",
  },
  twitter: {
    card: "summary_large_image",
    title: "BAAZIZ Wissal - Full-Stack Developer & Web Designer",
    description: "Full-stack developer and web designer specializing in React, Next.js, Node.js, and modern web technologies.",
    creator: "@bwissal",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/w.png" />
        <link rel="icon" type="image/png" href="/w.png" sizes="32x32" />
        <link rel="shortcut icon" href="/w.png" />
        <link rel="icon" type="image/x-icon" href="/w.png" />
      </head>
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ConditionalNavigation />
          <div className="min-h-screen bg-background w-full flex flex-col items-center">
            <main className="relative w-full max-w-screen-lg px-2 sm:px-4 md:px-8 mx-auto">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
