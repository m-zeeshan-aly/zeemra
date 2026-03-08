import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Women's Collection | ZEEMRA — Premium Leather Goods",
  description:
    "Shop the Women's Collection at ZEEMRA. Elegant leather handbags, jackets, wallets and shoes handcrafted in Sialkot, Pakistan.",
  openGraph: {
    title: "Women's Collection | ZEEMRA",
    description:
      "Elegant leather accessories crafted for the modern woman. Bags, jackets, wallets and shoes from Sialkot.",
    type: 'website',
    siteName: 'ZEEMRA',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Women's Collection | ZEEMRA",
    description:
      "Elegant leather accessories crafted for the modern woman.",
  },
};

export default function WomenLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
