"use client";

import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { TextRevealCard } from "@/components/ui/text-reveal-card";
import { Modal } from "@/components/ui/modal";
import { useState, useCallback, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

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
  const { scrollYProgress } = useScroll();

  // Add scroll-based animations
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, 100]);

  const handleCardClose = useCallback((index: number) => {
    setSelectedCard(index);
  }, []);

  const getCurrentCard = useCallback(() => {
    const range = salaryRanges[selectedRange];
    if (!range || !range[selectedCard]) {
      return defaultCard;
    }
    return range[selectedCard];
  }, [selectedRange, selectedCard]);

  const salaryRanges = useMemo(() => ({
    "20-40 LPA": [
      {
        src: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
        title: "Manan Adhikari",
        category: "Product Designer (Contract)",
        companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png",
        companyName: "Google",
        content: (
          <div className="space-y-6">
            {/* Header */}
            <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20">
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-xl bg-white p-2 flex items-center justify-center">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png" 
                      alt="Google" 
                      className="h-12 w-12 object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white">Google</h3>
                    <p className="text-base text-neutral-300">Product Designer</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-black/50">
                  <h4 className="text-sm font-medium text-neutral-400">Experience</h4>
                  <p className="text-xl font-semibold text-white mt-1">4 Years</p>
                </div>
                <div className="p-4 rounded-xl bg-black/50">
                  <h4 className="text-sm font-medium text-neutral-400">Role</h4>
                  <p className="text-xl font-semibold text-white mt-1">Product Designer</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-neutral-400">About</h4>
                <p className="text-lg leading-relaxed text-neutral-300">
                  4.0 YOE, Ex Silver, HackerRank, Innovacer, and more.
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-neutral-400">Salary Range:</span>
                  <span className="text-sm font-semibold text-neutral-200">20-40 LPA</span>
                </div>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
        ),
      },
    ],
    "10-20 LPA": [
      {
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
        title: "Debabrata Mondal",
        category: "AI Engineer (Full-Time)",
        content: (
          <div className="space-y-4">
            <p className="text-lg text-neutral-300">
              2.0 YOE, Founder of citrus, an open-source vector database. Worked at Dashibase and Pebblely.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-neutral-400">Salary Range:</span>
              <span className="text-sm font-semibold text-neutral-200">10-20 LPA</span>
            </div>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
            >
              LinkedIn Profile
            </a>
          </div>
        ),
      },
      {
        src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
        title: "Royal Sanga",
        category: "AI Engineer (Full-Time)",
        content: (
          <div className="space-y-4">
            <p className="text-lg text-neutral-300">
              3.0 YOE, Extensive experience in building AI-powered apps
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-neutral-400">Salary Range:</span>
              <span className="text-sm font-semibold text-neutral-200">10-20 LPA</span>
            </div>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
            >
              LinkedIn Profile
            </a>
          </div>
        ),
      },
      {
        src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
        title: "Tushar Verma",
        category: "Software Engineer (Full-Time)",
        content: (
          <div className="space-y-4">
            <p className="text-lg text-neutral-300">
              1.0 YOE, Founder of CrafturaAI (craftura.art) and GupShupAI (gupshap.fun). Ex ChatGPT Writer and Adimis.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-neutral-400">Salary Range:</span>
              <span className="text-sm font-semibold text-neutral-200">10-20 LPA</span>
            </div>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
            >
              LinkedIn Profile
            </a>
          </div>
        ),
      },
      {
        src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
        title: "Marvel John",
        category: "QA Engineer (Full-Time)",
        content: (
          <div className="space-y-4">
            <p className="text-lg text-neutral-300">
              3.0 YOE, Experienced with Web/iOS/Android testing. At last company, worked on 5+ AI based apps & 15+ hyper-casual games. Worked at Quiet Games (Game publisher), Gameberry Labs (Game Dev company), Indium Software (IT consulting firm), and more.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-neutral-400">Salary Range:</span>
              <span className="text-sm font-semibold text-neutral-200">10-20 LPA</span>
            </div>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
            >
              LinkedIn Profile
            </a>
          </div>
        ),
      },
      {
        src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
        title: "Lavish Goyal",
        category: "Software Engineer (Contract)",
        content: (
          <div className="space-y-4">
            <p className="text-lg text-neutral-300">
              2.0 YOE, Working at a YC startup
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-neutral-400">Salary Range:</span>
              <span className="text-sm font-semibold text-neutral-200">10-20 LPA</span>
            </div>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
            >
              LinkedIn Profile
            </a>
          </div>
        ),
      },
      {
        src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
        title: "Joshua D'Costa",
        category: "Growth Lead (Full-Time)",
        content: (
          <div className="space-y-4">
            <p className="text-lg text-neutral-300">
              4.0 YOE, At last job at Xoxoday, generated over $150k in revenue & $2M pipeline via growth. Ex Unifynd Technologies and Points for Good.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-neutral-400">Salary Range:</span>
              <span className="text-sm font-semibold text-neutral-200">10-20 LPA</span>
            </div>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
            >
              LinkedIn Profile
            </a>
          </div>
        ),
      },
    ],
    "5-10 LPA": [
      {
        src: "https://images.unsplash.com/photo-1504257432389-52343af06ae3",
        title: "Akshat Goel",
        category: "Software Engineer (Full-Time)",
        content: (
          <div className="space-y-4">
            <p className="text-lg text-neutral-300">
              1.0 YOE, Ex SDE at Procurenet. Reported to the CEO Gurbaksh Chahal, a prominent serial entrepreneur.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-neutral-400">Salary Range:</span>
              <span className="text-sm font-semibold text-neutral-200">5-10 LPA</span>
            </div>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
            >
              LinkedIn Profile
            </a>
          </div>
        ),
      },
      {
        src: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c",
        title: "Sahil Zambani",
        category: "Software Engineer (Full-Time)",
        content: (
          <div className="space-y-4">
            <p className="text-lg text-neutral-300">
              1.0 YOE, Runs his own frontend dev agency
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-neutral-400">Salary Range:</span>
              <span className="text-sm font-semibold text-neutral-200">5-10 LPA</span>
            </div>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
            >
              LinkedIn Profile
            </a>
          </div>
        ),
      },
    ],
    "3-5 LPA": [
      {
        src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
        title: "Manu Goel",
        category: "Software Engineer (Full-Time)",
        content: (
          <div className="space-y-4">
            <p className="text-lg text-neutral-300">
              1.0 YOE, Launched his own Outlook extension to speed up reviewing emails and drafting new ones. Had good work experience, worked remotely for an AI startup where he built multiple products from scrach and mentored juniors.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-neutral-400">Salary Range:</span>
              <span className="text-sm font-semibold text-neutral-200">3-5 LPA</span>
            </div>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
            >
              LinkedIn Profile
            </a>
          </div>
        ),
      },
      {
        src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
        title: "Jignesh Sharma",
        category: "Software Engineer (Full-time)",
        content: (
          <div className="space-y-4">
            <p className="text-lg text-neutral-300">
              0.5 YOE, Had PHP specific expertise which the hiring partner (FunnelKit) required
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-neutral-400">Salary Range:</span>
              <span className="text-sm font-semibold text-neutral-200">3-5 LPA</span>
            </div>
            <a
              href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
            >
              LinkedIn Profile
            </a>
          </div>
        ),
      },
      {
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
        title: "Prakhar Shukla",
        category: "Software Engineer (Internship)",
        content: (
          <div className="space-y-4">
            <p className="text-lg text-neutral-300">
              1.0 YOE, Founder of Andronix (1.7M+ downloads, ranks #1), An app that lets you install linux distros on Android, and Lumoflo (beta) Centralised marketplace with separate domains for customers. All batteries included e-commerce store created for merchants.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-neutral-400">Salary Range:</span>
              <span className="text-sm font-semibold text-neutral-200">3-5 LPA</span>
            </div>
            <a
              href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
          >
              LinkedIn Profile
          </a>
        </div>
        ),
      },
      {
        src: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
        title: "Saket Sarin",
        category: "Software Engineer (Internship)",
        content: (
          <div className="space-y-4">
            <p className="text-lg text-neutral-300">
              1.0 YOE, Ex SDE at DoWhile (Backed by Sequoia and Nexus Venture Partners), MFSewa, and E33 Productions
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-neutral-400">Salary Range:</span>
              <span className="text-sm font-semibold text-neutral-200">3-5 LPA</span>
            </div>
            <a
              href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
            >
              LinkedIn Profile
            </a>
          </div>
        ),
      },
      {
        src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
        title: "Utkarsh Utkarsh",
        category: "Software Engineer (Internship)",
        content: (
          <div className="space-y-4">
            <p className="text-lg text-neutral-300">
              0.5 YOE, Built impressive projects for college hackathons and portfolio. Contributor to GeeksForGeeks articles.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-neutral-400">Salary Range:</span>
              <span className="text-sm font-semibold text-neutral-200">3-5 LPA</span>
            </div>
            <a
              href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
            >
              LinkedIn Profile
            </a>
          </div>
        ),
      },
      {
        src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
        title: "Sagar Pant",
        category: "3D Designer (Freelance)",
        content: (
          <div className="space-y-4">
            <p className="text-lg text-neutral-300">
              2.0 YOE, Worked as an indie 3D generalist and VFX artist at Wrought Studios.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-neutral-400">Salary Range:</span>
              <span className="text-sm font-semibold text-neutral-200">3-5 LPA</span>
            </div>
            <a
              href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
            >
              LinkedIn Profile
            </a>
          </div>
        ),
      },
    ],
  }), []);

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
        <TextRevealCard
          text="You know the business"
          revealText="We know the chemistry"
          className="text-center will-change-transform w-full max-w-4xl mx-auto"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="mx-auto max-w-2xl mt-8"
          >
            <p className="text-xl font-light leading-relaxed text-neutral-300">
              Helped 20+ founders and 20+ candidates find their right match
            </p>
          </motion.div>
        </TextRevealCard>
      </motion.div>

      {/* Salary Range Sections */}
      <div className="relative mx-auto max-w-7xl px-4 py-20">
        <div className="space-y-20">
          {Object.entries(salaryRanges).map(([range, cards], sectionIndex) => {
            const sectionRef = useRef(null);
            const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

            return (
              <motion.div
                ref={sectionRef}
                key={range}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{
                  duration: 0.8,
                  delay: 0.1 * sectionIndex,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="space-y-8"
              >
                <motion.div 
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.2 + 0.1 * sectionIndex }}
                >
                  <h2 className="text-3xl font-bold text-white md:text-4xl">
                    {range} Range
                  </h2>
                  <div className="flex gap-2">
                    {cards.map((_, index) => (
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
                </motion.div>

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
                    >
                      <Card
                        card={card}
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
            <p className="text-lg text-neutral-400">
              Ready to start your journey to success?
            </p>
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-3 text-white transition-all"
            >
              Get Started
            </motion.button>
          </motion.div>
        </TextRevealCard>
      </motion.div>
    </main>
  );
}
