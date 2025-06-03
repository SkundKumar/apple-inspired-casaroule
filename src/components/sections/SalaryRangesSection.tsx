import React, { useMemo, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Carousel, Card as CarouselCard } from "@/components/ui/apple-cards-carousel";
import { cn } from "@/lib/utils";

type SalaryRange = "20-40 LPA" | "10-20 LPA" | "5-10 LPA" | "3-5 LPA";

interface CardContent {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
  companyLogo?: string;
  companyName?: string;
}

// Data for the success stories by salary range
const salaryRangesData = {
  "20-40 LPA": [
    {
      src: "https://cdn.techkareer.com/success-stories/manan.jpeg",
      title: "Manan Adhikari",
      category: "Product Designer (Contract)",
      companyLogo: "https://cdn.techkareer.com/success-stories/Luppa.jpeg",
      companyName: "Luppa",
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-neutral-200">Experience</h3>
            <p className="text-neutral-400">4.0 YOE, Ex Silver, HackerRank, Innovacer, and more.</p>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-neutral-400">Salary Range:</span>
              <span className="text-sm font-semibold text-neutral-200">20-40 LPA</span>
            </div>
            <a
              href="https://linkedin.com/in/mananadhikari"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              LinkedIn Profile
            </a>
          </div>
        </div>
      ),
    },
  ],
  "10-20 LPA": [
    {
      src: "https://cdn.techkareer.com/success-stories/Debabrata.jpeg",
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
            href="https://www.linkedin.com/in/0xdebabrata/"
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
      src: "https://cdn.techkareer.com/success-stories/Royal.jpeg",
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
            href="https://linkedin.com/in/royal-sanga-267655191"
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
      src: "https://cdn.techkareer.com/success-stories/Tushar.jpeg",
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
            href="https://linkedin.com/in/tushar-verma-developer"
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
      src: "https://cdn.techkareer.com/success-stories/Marvel.jpeg",
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
            href="https://linkedin.com/in/marveljohn"
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
      src: "https://cdn.techkareer.com/success-stories/lavish.jpeg",
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
            href="https://www.linkedin.com/in/goellavish10/"
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
      src: "https://cdn.techkareer.com/success-stories/Joshua.jpeg",
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
            href="https://www.linkedin.com/in/joshua-d-costa/"
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
      src: "https://cdn.techkareer.com/success-stories/akshat.jpeg",
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
            href="https://www.linkedin.com/in/akshatgoel7/"
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
      src: "https://cdn.techkareer.com/success-stories/Sahil.jpeg",
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
            href="https://linkedin.com/in/sahilzambani"
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
      src: "https://cdn.techkareer.com/success-stories/manu.jpeg",
      title: "Manu Goel",
      category: "Software Engineer (Full-Time)",
      content: (
        <div className="space-y-4">
          <p className="text-lg text-neutral-300">
            1.0 YOE, Launched his own Outlook extension to speed up reviewing emails and drafting new ones. Had good work experience, worked remotely for an AI startup where he built multiple products from scrach and mentored juniors.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-neutral-400">Salary Range:</span>
            <span className="text-sm font-semibold text-neutral-200">5-10 LPA</span>
          </div>
          <a
            href="https://www.linkedin.com/in/manu-goel-7899781a0"
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
      src: "https://cdn.techkareer.com/success-stories/jignesh.jpeg",
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
            href="https://linkedin.com/in/jignesh-sharma-a6243b234"
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
      src: "https://cdn.techkareer.com/success-stories/prakher.jpeg",
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
            href="https://linkedin.com/in/iamprakharshukla"
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
      src: "https://cdn.techkareer.com/success-stories/saket.jpeg",
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
            href="https://linkedin.com/in/saketsarin"
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
      src: "https://cdn.techkareer.com/success-stories/utkarsh.jpeg",
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
            href="https://linkedin.com/in/utkarsh575"
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
      src: "https://cdn.techkareer.com/success-stories/sagar.jpeg",
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
            href="https://linkedin.com/in/dokutaiyo"
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
};

export default function SalaryRangesSection() {
  const [selectedCard, setSelectedCard] = useState(0);
  const [selectedRange, setSelectedRange] = useState<SalaryRange>("20-40 LPA");

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const cards = useMemo(() => salaryRangesData[selectedRange], [selectedRange]);

  return (
    <div
      ref={sectionRef}
      className="relative mx-auto max-w-7xl px-4 py-20"
    >
      <div className="space-y-20">
        {Object.entries(salaryRangesData).map(([range, cards], sectionIndex) => {
          const currentSectionIsInView = useInView(useRef<HTMLDivElement>(null), { once: true, margin: "-100px" });

          return (
            <motion.div
              key={range}
              initial={{ opacity: 0, y: 20 }}
              animate={currentSectionIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: sectionIndex * 0.2 }}
              className="relative mb-16 p-8 rounded-3xl border border-neutral-800/30 hover:border-neutral-700/50 transition-colors duration-500"
            >
              <div className="relative">
                <div className="flex items-center justify-between mb-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={currentSectionIsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: sectionIndex * 0.2 + 0.1 }}
                    className="space-y-2"
                  >
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={currentSectionIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: sectionIndex * 0.2 + 0.2 }}
                      className="text-4xl font-display font-bold text-white"
                    >
                      {range}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={currentSectionIsInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.5, delay: sectionIndex * 0.2 + 0.3 }}
                      className="text-lg text-neutral-400 font-light tracking-wide"
                    >
                      {cards.length} Success Stories
                    </motion.p>
                  </motion.div>
                  <div className="flex gap-1.5">
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
                </div>
              </div>

              <Carousel
                items={cards.map((card, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={currentSectionIsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.3 + 0.1 * index,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  >
                    <CarouselCard
                      card={{
                        src: card.src,
                        title: card.title,
                        category: card.category,
                        content: card.content,
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
  );
} 