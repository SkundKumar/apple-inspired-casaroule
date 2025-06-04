"use client";

import dynamic from 'next/dynamic';

const Vortex = dynamic(() => import('./vortex').then(mod => mod.Vortex), {
  ssr: false
});

export const VortexWrapper = ({ children, ...props }: any) => {
  return <Vortex {...props}>{children}</Vortex>;
}; 