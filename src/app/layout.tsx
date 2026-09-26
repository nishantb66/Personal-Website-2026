import type { Metadata } from "next";
import { Sora, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const sora = Sora({
  variable: "--font-sans-custom",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif-custom",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono-custom",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nishant Baruah — Engineer & Tech Builder",
  description:
    "Nishant Baruah builds purposeful digital systems across software engineering, AI, and product thinking.",
  keywords: [
    "Nishant Baruah",
    "Software Engineer",
    "AI Engineer",
    "Portfolio",
  ],
  authors: [{ name: "Nishant Baruah" }],
  openGraph: {
    title: "Nishant Baruah — Engineer & Tech Builder",
    description:
      "Purposeful digital systems, built with clarity, curiosity, and conviction.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${sora.variable} ${cormorant.variable} ${jetBrainsMono.variable} bg-background text-foreground antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
