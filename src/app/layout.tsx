import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ConditionalNavigation } from "@/components/conditional-navigation";
import { ChatProvider } from "@/components/chat-context";
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
  title: "Wissal Baaziz (bwissal) - Full-Stack Developer & UI/UX Designer | Morocco",
  description: "Wissal Baaziz (bwissal) - Full-stack developer and UI/UX designer specializing in Spring Boot, Laravel, React, Angular, Flutter and modern web technologies. Creating scalable applications with exceptional user experience. Based in Morocco.",
  keywords: [
    "Wissal Baaziz", "bwissal", "full stack developer", "web developer", "React developer", 
    "Spring Boot", "Laravel", "Java", "PHP", "web designer", "UI/UX designer", "UI/UX design", 
    "JavaScript", "MySQL", "portfolio", "developer", "designer", "Morocco", "Youcode-UM6P",
    "Angular", "Flutter", "eBankify", "Anazor", "Tafukut", "graphic designer", "digital craftsman"
  ],
  authors: [{ name: "Wissal Baaziz" }, { name: "bwissal" }],
  creator: "Wissal Baaziz",
  metadataBase: new URL("https://www.bwissal.me"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.bwissal.me",
    title: "Wissal Baaziz (bwissal) - Full-Stack Developer & UI/UX Designer",
    description: "Wissal Baaziz (bwissal) - Full-stack developer and UI/UX designer specializing in Spring Boot, Laravel, React, Angular, Flutter and modern web technologies. Creating scalable applications with exceptional user experience.",
    siteName: "Wissal Baaziz Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wissal Baaziz (bwissal) - Full-Stack Developer & UI/UX Designer",
    description: "Wissal Baaziz (bwissal) - Full-stack developer and UI/UX designer specializing in Spring Boot, Laravel, React, Angular, Flutter and modern web technologies.",
    creator: "@bwissal",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
  },
  alternates: {
    canonical: 'https://www.bwissal.me',
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
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Wissal Baaziz",
              "alternateName": "bwissal",
              "jobTitle": "Full-Stack Developer & UI/UX Designer",
              "description": "Passionate Full Stack Developer and UI/UX Designer with a mathematics background, currently honing skills at Youcode-UM6P. Transforms ideas into elegant, functional solutions with a focus on scalable applications, beautiful user interfaces, and clean code architecture.",
              "url": "https://www.bwissal.me",
              "image": "https://www.bwissal.me/me.jpeg",
              "email": "baazizwissal13@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "Morocco"
              },
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "Youcode-UM6P"
              },
              "knowsAbout": [
                "Spring Boot", "Laravel", "React", "Angular", "Flutter", "Java", "PHP", 
                "JavaScript", "UI/UX Design", "Graphic Design", "MySQL", "PostgreSQL"
              ],
              "hasOccupation": {
                "@type": "Occupation",
                "name": "Full-Stack Developer",
                "description": "Developing scalable web applications using modern technologies"
              },
              "sameAs": [
                "https://github.com/bwissal13",
                "https://linkedin.com/in/baaziz-wissal-311a9526a",
                "https://www.instagram.com/baazizwissal/"
              ]
            })
          }}
        />
        
        {/* Website Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Wissal Baaziz Portfolio",
              "url": "https://www.bwissal.me",
              "description": "Portfolio website of Wissal Baaziz, a Full-Stack Developer and UI/UX Designer from Morocco",
              "author": {
                "@type": "Person",
                "name": "Wissal Baaziz"
              },
              "publisher": {
                "@type": "Person",
                "name": "Wissal Baaziz"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ChatProvider>
            <ConditionalNavigation />
            <div className="min-h-screen bg-background w-full flex flex-col items-center">
              <main className="relative w-full max-w-screen-lg px-2 sm:px-4 md:px-8 mx-auto">
                {children}
              </main>
            </div>
          </ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
