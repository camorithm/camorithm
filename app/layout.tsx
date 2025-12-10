import './globals.css';
import { Inter, Space_Grotesk } from 'next/font/google';

// Load the fonts
const inter = Inter({ 
subsets: ['latin'],
variable: '--font-inter',
display: 'swap',
});

const spaceGrotesk = Space_Grotesk({ 
subsets: ['latin'],
variable: '--font-space',
display: 'swap',
});

export const metadata = {
title: 'PropFirm - Fund Your Trading',
description: 'Get funded up to $200k',
};

export default function RootLayout({
children,
}: {
children: React.ReactNode;
}) {
return (
  <html lang="en" className="scroll-smooth">
    <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-[#0a0b0d] text-white antialiased`}>
      {children}
    </body>
  </html>
);
}