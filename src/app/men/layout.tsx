import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Men's Collection | ZEEMRA — Premium Leather Goods",
  description:
    "Shop the Men's Collection at ZEEMRA. Premium handcrafted leather jackets, wallets, belts and shoes from Sialkot, Pakistan.",
  openGraph: {
    title: "Men's Collection | ZEEMRA",
    description:
      "Premium handcrafted leather goods for the modern gentleman. Jackets, wallets, belts and shoes crafted in Sialkot.",
    type: 'website',
    siteName: 'ZEEMRA',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Men's Collection | ZEEMRA",
    description:
      "Premium handcrafted leather goods for the modern gentleman.",
  },
};

export default function MenLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
