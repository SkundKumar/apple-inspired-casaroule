import { Inter, Playfair_Display } from 'next/font/google';
import { Dancing_Script } from 'next/font/google';
import { Gochi_Hand } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

export const dancingScript = Dancing_Script({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dancing-script',
  weight: '400',
});

export const gochiHand = Gochi_Hand({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-gochi-hand',
  weight: '400',
}); 