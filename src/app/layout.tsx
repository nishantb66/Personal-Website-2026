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
  title: "Nishant Baruah | Backend Engineer Portfolio",
  description:
    "Portfolio of Nishant Baruah, a backend engineer building scalable systems, ML-enabled products, and production web platforms.",
  keywords: [
    "Nishant Baruah",
    "Backend Engineer",
    "Full Stack Developer",
    "Machine Learning",
    "Portfolio",
  ],
  authors: [{ name: "Nishant Baruah" }],
  openGraph: {
    title: "Nishant Baruah | Backend Engineer Portfolio",
    description:
      "Backend engineering portfolio featuring production systems, AI projects, and scalable product architecture.",
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
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
