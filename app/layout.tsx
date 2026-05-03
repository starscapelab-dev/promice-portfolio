import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "PROMICE Studios - Visual Effects & Animation Studio",
  description: "Embark on a visual odyssey where reality bends to our will. Leading Visual Effects Studio dedicated to bringing Captivating and Immersive visual experiences.",
  icons: {
    icon: [
      { url: '/images/Promice Logo-white text.png' },
    ],
    apple: [
      { url: '/images/Promice Logo-white text.png' },
    ],
  },
  openGraph: {
    title: "PROMICE Studios - Visual Effects & Animation Studio",
    description: "Embark on a visual odyssey where reality bends to our will. Leading Visual Effects Studio dedicated to bringing Captivating and Immersive visual experiences.",
    images: ['/images/Promice Logo-white text.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {/* Decorative corner elements */}
          <div className="corner-accent corner-accent-top-left" />
          <div className="corner-accent corner-accent-bottom-right" />
          <div className="vertical-text">PROMICE </div>

          {children}
        </Providers>
      </body>
    </html>
  );
}
