import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A Special Proposal ✨",
  description: "I have something special to tell you...",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💌</text></svg>",
  },
  openGraph: {
    title: "A Special Proposal ✨",
    description: "I have something special to tell you...",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#08070b",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-emerald-500/30 selection:text-emerald-200">
        <div className="ambient-glow" />
        <main className="relative z-10 flex min-h-screen flex-col items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}
