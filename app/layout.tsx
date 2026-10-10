import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Little Meadow",
  description: "One cozy multiplayer village. Grow crops, build together, and battle grumpy rivals with a berry cannon.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
