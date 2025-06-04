import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";


const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const gochiHand = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-gochi-hand",
});

export const metadata: Metadata = {
  title: "Success Stories",
  description: "Success stories of our candidates and founders",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${gochiHand.variable}`}>
      <body className="min-h-screen bg-black font-sans">
        <div className="fixed inset-0 -z-10">
          
        </div>
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
