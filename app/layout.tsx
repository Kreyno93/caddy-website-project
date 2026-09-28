import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Northline Coffee | Slow down, taste more',
  description: 'Specialty coffee, thoughtfully roasted and made for everyday rituals.',
  openGraph: {
    title: 'Northline Coffee | Slow down, taste more',
    description: 'Specialty coffee and considered objects for everyday rituals.',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
