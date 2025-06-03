"use client";

import React, { lazy, Suspense } from 'react';
import { Carousel, Card as CarouselCard } from "@/components/ui/apple-cards-carousel";
import { TextRevealCard } from "@/components/ui/text-reveal-card";
import RotatingText from "@/components/ui/rotating-text";
import { useState, useCallback, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Dynamically import sections
const SalaryRangesSection = lazy(() => import('@/components/sections/SalaryRangesSection'));
const CallToActionSection = lazy(() => import('@/components/sections/CallToActionSection'));

type SalaryRange = "20-40 LPA" | "10-20 LPA" | "5-10 LPA" | "3-5 LPA";

interface CardContent {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
  companyLogo?: string;
  companyName?: string;
}

const defaultCard: CardContent = {
  src: "/images/default-profile.jpg",
  title: "Success Story",
  category: "Career Journey",
  content: (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-neutral-200">Experience</h3>
        <p className="text-neutral-400">Loading candidate details...</p>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-neutral-200">Key Achievements</h3>
        <p className="text-neutral-400">Loading achievements...</p>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-neutral-200">Advice</h3>
        <p className="text-neutral-400">Loading advice...</p>
      </div>
    </div>
  ),
};

export default function Home() {
  const [selectedCard, setSelectedCard] = useState(0);
  const [selectedRange, setSelectedRange] = useState<SalaryRange>("20-40 LPA");
  const [isTextRevealHovered, setIsTextRevealHovered] = useState(false);
  const { scrollYProgress } = useScroll();

  // Add scroll-based animations
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, 100]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black overflow-x-hidden">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        style={{ opacity, scale, y }}
        className="relative min-h-[80vh] flex items-center justify-center overflow-hidden px-4"
      >
        <motion.div
          whileHover={{
            scale: 1.02,
            borderColor: "rgba(59, 130, 246, 0.7)",
          }}
          transition={{ duration: 0.8 }}
          className="rounded-lg w-full max-w-6xl relative"
          onMouseEnter={() => setIsTextRevealHovered(true)}
          onMouseLeave={() => setIsTextRevealHovered(false)}
        >
          <TextRevealCard
            text="You know the business"
            revealText="We know the chemistry"
            className="text-center will-change-transform w-full mx-auto"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="mx-auto max-w-2xl mt-4"
            >
              {/* Combined Statistics and Rotating Text */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-center"
                >
                   <motion.div
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-5xl font-limelight font-bold text-white drop-shadow-glow inline-block mr-2"
                  >
                    20+
                  </motion.div>
                </motion.div>
                <motion.div
                   initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="px-2 sm:px-2 md:px-3 bg-zinc-800  text-black py-0.5 sm:py-1 md:py-2 justify-center rounded-lg overflow-hidden"
                >
                   <RotatingText
                    texts={["Successful Candidates", "Satisfied Founders"]}
                    auto={true}
                    rotationInterval={2000}
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerFrom={"last"}
                    staggerDuration={0.025}
                    mainClassName="inline-flex items-center h-auto"
                    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                    elementLevelClassName="text-5xl font-display font-bold text-white"
                    splitBy="words"
                  />
                </motion.div>
              </div>
              <p className="text-lg font-light leading-relaxed text-neutral-300 text-center">
                Connecting exceptional talent with innovative companies
              </p>
            </motion.div>
          </TextRevealCard>
          {/* Interaction Hint */}
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            animate={{ opacity: isTextRevealHovered ? 0 : 1, x: isTextRevealHovered ? 10 : 0 }}
            transition={{ duration: 0.3, delay: isTextRevealHovered ? 0 : 0.5 }}
            className="absolute right-4 bottom-4 flex flex-col items-center space-y-1 text-neutral-300 pointer-events-none z-10 md:right-8 md:bottom-8 lg:right-32 lg:bottom-20"
          >
            <div className="h-3 w-3 rounded-full border border-neutral-400 bg-transparent animate-pulse"></div>
            <motion.p
              className="text-lg font-gochi-hand"
            >
              click me
            </motion.p>
          </motion.div>
        </motion.div>
        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, 15, 0] }}
          transition={{
            duration: 1.8,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white/70"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 19V5m0 14l-4-4m4 4l4-4"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Salary Range Sections (Lazy Loaded) */}
      <Suspense fallback={<div>Loading Salary Ranges...</div>}>
        <SalaryRangesSection />
      </Suspense>

      {/* Call To Action Section (Lazy Loaded) */}
      <Suspense fallback={<div>Loading Call to Action...</div>}>
        <CallToActionSection />
      </Suspense>

    </main>
  );
}
