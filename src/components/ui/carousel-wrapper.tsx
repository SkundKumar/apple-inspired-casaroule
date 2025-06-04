"use client";

import dynamic from 'next/dynamic';

const Carousel = dynamic(() => import('./apple-cards-carousel').then(mod => mod.Carousel), {
  ssr: false
});

export const CarouselWrapper = ({ items, initialScroll = 0 }: any) => {
  return <Carousel items={items} initialScroll={initialScroll} />;
}; 