import type { Metadata } from "next";
import { Roboto } from 'next/font/google'
import Providers from "@/components/providers";

export const metadata: Metadata = {
  title: "MonoRepoDemo",
}

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <body style={{ margin: 0 }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
