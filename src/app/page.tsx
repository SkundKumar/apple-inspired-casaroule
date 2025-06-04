"use client";

import { Carousel, Card as CarouselCard } from "@/components/ui/apple-cards-carousel";
import { TextRevealCard } from "@/components/ui/text-reveal-card";
import RotatingText from "@/components/ui/rotating-text";
import { useState, useCallback, useMemo, useRef, Suspense } from "react";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import dynamic from 'next/dynamic';

const Vortex = dynamic(() => import("@/components/ui/vortex").then(mod => mod.Vortex), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-black" />
});

type SalaryRange = "20-40 LPA" | "10-20 LPA" | "5-10 LPA" | "3-5 LPA";

interface CardContent {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode | null;
  companyLogo?: string;
  companyName?: string;
  bio?: string;
  linkedin?: string;
  salaryRange?: string;
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

  const salaryRanges = useMemo(() => ({
    "20-40 LPA": [
      {
        src: "https://cdn.techkareer.com/success-stories/manan.jpeg",
        title: "Manan Adhikari",
        category: "Product Designer (Contract)",
        companyLogo: "https://cdn.techkareer.com/success-stories/Luppa.jpeg",
        companyName: "Luppa",
        bio: "4.0 YOE, Ex Silver, HackerRank, Innovacer, and more.",
        linkedin: "https://linkedin.com/in/mananadhikari",
        salaryRange: "20-40 LPA",
        content: null,
      },
    ],
    "10-20 LPA": [
      {
        src: "https://cdn.techkareer.com/success-stories/Debabrata.jpeg",
        title: "Debabrata Mondal",
        category: "AI Engineer (Full-Time)",
        bio: "2.0 YOE, Founder of citrus, an open-source vector database. Worked at Dashibase and Pebblely.",
        linkedin: "https://www.linkedin.com/in/0xdebabrata/",
        salaryRange: "10-20 LPA",
        content: null,
        companyLogo: "https://cdn.techkareer.com/success-stories/rifflix_logo.jpeg",
        companyName: "Rifflix",
      },
      {
        src: "https://cdn.techkareer.com/success-stories/Royal.jpeg",
        title: "Royal Sanga",
        category: "AI Engineer (Full-Time)",
        bio: "3.0 YOE, Extensive experience in building AI-powered apps",
        linkedin: "https://linkedin.com/in/royal-sanga-267655191",
        salaryRange: "10-20 LPA",
        content: null,
        companyLogo: "https://cdn.techkareer.com/success-stories/rifflix_logo.jpeg",
        companyName: "Rifflix",
      },
      {
        src: "https://cdn.techkareer.com/success-stories/Tushar.jpeg",
        title: "Tushar Verma",
        category: "Software Engineer (Full-Time)",
        bio: "1.0 YOE, Founder of CrafturaAI (craftura.art) and GupShupAI (gupshap.fun). Ex ChatGPT Writer and Adimis.",
        linkedin: "https://linkedin.com/in/tushar-verma-developer",
        salaryRange: "10-20 LPA",
        content: null,
        companyLogo: "https://pub-cb911cae9c3e4c4c887c2f8360e681c7.r2.dev/success-stories/space_harpoon.jpeg",
        companyName: "Space Harpoon",
      },
      {
        src: "https://cdn.techkareer.com/success-stories/Marvel.jpeg",
        title: "Marvel John",
        category: "QA Engineer (Full-Time)",
        bio: "3.0 YOE, Experienced with Web/iOS/Android testing. At last company, worked on 5+ AI based apps & 15+ hyper-casual games. Worked at Quiet Games (Game publisher), Gameberry Labs (Game Dev company), Indium Software (IT consulting firm), and more.",
        linkedin: "https://linkedin.com/in/marveljohn",
        salaryRange: "10-20 LPA",
        content: null,
        companyLogo: "https://cdn.techkareer.com/success-stories/Luppa.jpeg",
        companyName: "Luppa",
      },
      {
        src: "https://cdn.techkareer.com/success-stories/lavish.jpeg",
        title: "Lavish Goyal",
        category: "Software Engineer (Contract)",
        bio: "2.0 YOE, Working at a YC startup",
        linkedin: "https://www.linkedin.com/in/goellavish10/",
        salaryRange: "10-20 LPA",
        content: null,
        companyLogo: "https://cdn.techkareer.com/success-stories/funnel_kit.jpeg",
        companyName: "Funnel Kit",
      },
      {
        src: "https://cdn.techkareer.com/success-stories/Joshua.jpeg",
        title: "Joshua D'Costa",
        category: "Growth Lead (Full-Time)",
        bio: "4.0 YOE, At last job at Xoxoday, generated over $150k in revenue & $2M pipeline via growth. Ex Unifynd Technologies and Points for Good.",
        linkedin: "https://www.linkedin.com/in/joshua-d-costa/",
        salaryRange: "10-20 LPA",
        content: null,
        companyLogo: "https://cdn.techkareer.com/success-stories/dodo.jpeg",
        companyName: "Dodo",
      },
    ],
    "5-10 LPA": [
      {
        src: "https://cdn.techkareer.com/success-stories/akshat.jpeg",
        title: "Akshat Goel",
        category: "Software Engineer (Full-Time)",
        bio: "1.0 YOE, Ex SDE at Procurenet. Reported to the CEO Gurbaksh Chahal, a prominent serial entrepreneur.",
        linkedin: "https://www.linkedin.com/in/akshatgoel7/",
        salaryRange: "5-10 LPA",
        content: null,
        companyLogo: "https://cdn.techkareer.com/success-stories/enpointe.jpeg",
        companyName: "Enpointe",
      },
      {
        src: "https://cdn.techkareer.com/success-stories/Sahil.jpeg",
        title: "Sahil Zambani",
        category: "Software Engineer (Full-Time)",
        bio: "1.0 YOE, Runs his own frontend dev agency",
        linkedin: "https://linkedin.com/in/sahilzambani",
        salaryRange: "5-10 LPA",
        content: null,
        companyLogo: "https://cdn.techkareer.com/success-stories/enpointe.jpeg",
        companyName: "Enpointe",
      },
      {
        src: "https://cdn.techkareer.com/success-stories/manu.jpeg",
        title: "Manu Goel",
        category: "Software Engineer (Full-Time)",
        bio: "1.0 YOE, Launched his own Outlook extension to speed up reviewing emails and drafting new ones. Had good work experience, worked remotely for an AI startup where he built multiple products from scrach and mentored juniors.",
        linkedin: "https://www.linkedin.com/in/manu-goel-7899781a0",
        salaryRange: "5-10 LPA",
        content: null,
        companyLogo: "https://cdn.techkareer.com/success-stories/aeos.jpeg",
        companyName: "Aeos",
      },
    ],
    "3-5 LPA": [
      {
        src: "https://cdn.techkareer.com/success-stories/jignesh.jpeg",
        title: "Jignesh Sharma",
        category: "Software Engineer (Full-time)",
        bio: "0.5 YOE, Had PHP specific expertise which the hiring partner (FunnelKit) required",
        linkedin: "https://linkedin.com/in/jignesh-sharma-a6243b234",
        salaryRange: "3-5 LPA",
        content: null,
        companyLogo: "https://cdn.techkareer.com/success-stories/funnel_kit.jpeg",
        companyName: "Funnel Kit",
      },
      {
        src: "https://cdn.techkareer.com/success-stories/prakher.jpeg",
        title: "Prakhar Shukla",
        category: "Software Engineer (Internship)",
        bio: "1.0 YOE, Founder of Andronix (1.7M+ downloads, ranks #1), An app that lets you install linux distros on Android, and Lumoflo (beta) Centralised marketplace with separate domains for customers. All batteries included e-commerce store created for merchants.",
        linkedin: "https://linkedin.com/in/iamprakharshukla",
        salaryRange: "3-5 LPA",
        content: null,
        companyLogo: "https://cdn.techkareer.com/success-stories/casecraft.jpeg",
        companyName: "CaseCraft",
      },
      {
        src: "https://cdn.techkareer.com/success-stories/saket.jpeg",
        title: "Saket Sarin",
        category: "Software Engineer (Internship)",
        bio: "1.0 YOE, Ex SDE at DoWhile (Backed by Sequoia and Nexus Venture Partners), MFSewa, and E33 Productions",
        linkedin: "https://linkedin.com/in/saketsarin",
        salaryRange: "3-5 LPA",
        content: null,
        companyLogo: "https://cdn.techkareer.com/success-stories/banterai.jpeg",
        companyName: "BanterAI",
      },
      {
        src: "https://cdn.techkareer.com/success-stories/utkarsh.jpeg",
        title: "Utkarsh Utkarsh",
        category: "Software Engineer (Internship)",
        bio: "0.5 YOE, Built impressive projects for college hackathons and portfolio. Contributor to GeeksForGeeks articles.",
        linkedin: "https://linkedin.com/in/utkarsh575",
        salaryRange: "3-5 LPA",
        content: null,
        companyLogo: "https://cdn.techkareer.com/success-stories/Slashbase.jpeg",
        companyName: "Slashbase",
      },
      {
        src: "https://cdn.techkareer.com/success-stories/sagar.jpeg",
        title: "Sagar Pant",
        category: "3D Designer (Freelance)",
        bio: "2.0 YOE, Worked as an indie 3D generalist and VFX artist at Wrought Studios.",
        linkedin: "https://linkedin.com/in/dokutaiyo",
        salaryRange: "3-5 LPA",
        content: null,
        companyLogo: "https://cdn.techkareer.com/success-stories/reddygames_logo.jpeg",
        companyName: "Reddy Games",
      },
    ],
  }), []);

  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      {/* Hero Section */}
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <Vortex>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            style={{ opacity, scale, y }}
            className="relative min-h-[100vh] flex items-center justify-center overflow-hidden px-4"
          >
            <motion.div
              whileHover={{
                scale: 1.02,
                borderColor: "#a7e8e8",
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
                  className="mx-auto max-w-8xl mt-4"
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
                        className="md:text-8xl text-6xl font-limelight font-bold text-white drop-shadow-glow inline-block mr-2"
                      >
                        20+
                      </motion.div>
                    </motion.div>
                    <motion.div
                       initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="px-2 sm:px-2 md:px-3 bg-indigo-400 text-black py-0.5 sm:py-1 md:py-2 justify-center rounded-lg overflow-hidden"
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
                        elementLevelClassName="md:text-5xl text-3xl md:text-7xl font-display font-bold text-white"
                        splitBy="words"
                      />
                    </motion.div>
                  </div>
                  <p className="text-lg font-light leading-relaxed text-white text-center">
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
                  Swipe me
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
        </Vortex>
      </Suspense>

      {/* Salary Range Sections */}
      
      <div className="relative mx-auto max-w-7xl px-4 py-20">
        <div className="space-y-20">
          {Object.entries(salaryRanges).map(([range, cards], sectionIndex) => {
            const sectionRef = useRef<HTMLDivElement>(null);
            const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

            return (
              <motion.div
                ref={sectionRef}
                key={range}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: sectionIndex * 0.2 }}
                className="relative mb-16 backdrop-blur-sm rounded-lg p-4 md:p-6 transition-colors duration-500"
              >
                <div className="relative">
                  <div className="flex items-center justify-between mb-8">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, delay: sectionIndex * 0.2 + 0.1 }}
                      className="space-y-2"
                    >
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: sectionIndex * 0.2 + 0.2 }}
                        className="text-4xl font-display font-bold text-indigo-400"
                      >
                        {range}
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.5, delay: sectionIndex * 0.2 + 0.3 }}
                        className="text-lg text-indigo-400/70 font-light tracking-wide"
                      >
                        {cards.length} Success Stories
                      </motion.p>
                    </motion.div>
                    <div className="flex gap-1.5">
                      {cards.map((card, index) => (
                        <motion.button
                          key={index}
                          onClick={() => {
                            setSelectedRange(range as SalaryRange);
                            setSelectedCard(index);
                          }}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          className={cn(
                            "h-2 w-2 rounded-full transition-all duration-300",
                            selectedRange === range && selectedCard === index
                              ? "w-8 bg-white"
                              : "bg-white/50 hover:bg-white/75"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <Carousel
                  items={cards.map((card, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.3 + 0.1 * index,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                      whileHover={{
                        scale: 1.03,
                        boxShadow: "0 0 20px rgba(255, 105, 180, 0.6), 0 0 40px rgba(255, 105, 180, 0.3)",
                        transition: { boxShadow: { duration: 0.01 } }
                      }}
                      whileTap={{
                        scale: 0.78,
                      }}
                      className="rounded-3xl"
                    >
                      <CarouselCard
                        card={{
                          src: card.src,
                          title: card.title,
                          category: card.category,
                          content: card.content,
                          companyLogo: card.companyLogo,
                          companyName: card.companyName,
                          bio: card.bio,
                          linkedin: card.linkedin,
                          salaryRange: card.salaryRange,
                        }}
                        index={index}
                        layout={selectedRange === range && selectedCard === index}
                      />
                    </motion.div>
                  ))}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="relative mx-auto max-w-7xl px-4 py-20"
      >
        <TextRevealCard
          text="Your success story could be next"
          revealText="Join our community of achievers"
          className="mx-auto max-w-4xl w-full text-center"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-4 text-center"
          >
            <p className="text-lg text-white">
              Ready to start your journey to success?
            </p>
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 20px rgba(167, 232, 232, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="rounded-full bg-gradient-to-tr from-[#a7e8e8] via-[#f3e5f5] to-[#ff69b4] px-8 py-3 text-[rgb(30,30,30)] transition-all"
            >
              Get Started
            </motion.button>
          </motion.div>
        </TextRevealCard>
      </motion.div>
    </main>
  );
}
