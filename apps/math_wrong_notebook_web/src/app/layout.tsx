import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Math Wrong Notebook - S-Level Product",
  description: "Enterprise grade AI Math Wrong Notebook platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased font-sans`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
