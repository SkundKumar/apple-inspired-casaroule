"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
  useCallback,
} from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconX,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import Image from "next/image";
import { useOutsideClick } from "@/hooks/use-outside-click";

interface CarouselProps {
  items: React.ReactElement[];
  initialScroll?: number;
}

type Card = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
  companyLogo?: string;
  companyName?: string;
  bio?: string;
  linkedin?: string;
  salaryRange?: string;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const checkScrollability = useCallback(() => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll, checkScrollability]);

  const scrollLeft = useCallback(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  }, []);

  const scrollRight = useCallback(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  }, []);

  const handleCardClose = useCallback((index: number) => {
    if (carouselRef.current) {
      const cardWidth = window.innerWidth < 768 ? 230 : 384;
      const gap = window.innerWidth < 768 ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  }, []);

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none] md:py-20"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div
            className={cn(
              "absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l",
            )}
          ></div>

          <div
            className={cn(
              "flex flex-row justify-start gap-4 pl-4",
              "mx-auto max-w-7xl", // remove max-w-4xl if you want the carousel to span the full width of its container
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.1 * index,
                  ease: [0.4, 0, 0.2, 1],
                }}
                key={`card-${index}`}
                className="rounded-3xl last:pr-[5%] md:last:pr-[33%]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mr-10 flex justify-end gap-2">
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100/10 backdrop-blur-sm transition-all hover:bg-gray-100/20 disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-white" />
          </button>
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100/10 backdrop-blur-sm transition-all hover:bg-gray-100/20 disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <IconArrowNarrowRight className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose } = useContext(CarouselContext);
  const controls = useAnimationControls();
  const [isHovered, setIsHovered] = useState(false);

  const handleClose = useCallback(() => {
    controls.start("closed");
    setTimeout(() => {
      setOpen(false);
      onCardClose(index);
    }, 300);
  }, [controls, onCardClose, index]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, handleClose]);

  useOutsideClick(containerRef as React.RefObject<HTMLDivElement>, handleClose);

  const handleOpen = () => {
    setOpen(true);
    controls.start("open");
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-50 h-screen overflow-auto px-4 sm:px-6 md:px-8"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="fixed inset-0 h-full w-full bg-black/80 backdrop-blur-sm"
            />
            <div className="relative min-h-screen flex items-center justify-center py-10">
              <motion.div
                ref={containerRef}
                layoutId={layout ? `card-${card.title}` : undefined}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="relative z-[60] w-full max-w-5xl rounded-3xl bg-neutral-900 p-4 font-sans md:p-10 px-6 sm:px-8 md:px-10"
              >
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="sticky top-4 right-0 ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all hover:bg-white/20"
                  onClick={handleClose}
                >
                  <IconX className="h-6 w-6 text-white" />
                </motion.button>
                <motion.p
                  layoutId={layout ? `category-${card.title}` : undefined}
                  className="text-base font-medium text-white"
                >
                  {card.category}
                </motion.p>
                <motion.p
                  layoutId={layout ? `title-${card.title}` : undefined}
                  className="mt-4 text-2xl font-semibold text-white md:text-5xl"
                >
                  {card.title}
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="py-10 space-y-6"
                >
                  <div className="flex items-center gap-4">
                    {card.companyLogo && (
                      <img
                        src={card.companyLogo}
                        alt={`${card.companyName || 'Company'} Logo`}
                        className="h-16 w-16 object-contain rounded-md bg-white p-2"
                      />
                    )}
                    <div>
                      {card.companyName && (
                        <h3 className="text-xl font-semibold text-white">{card.companyName}</h3>
                      )}
                    </div>
                  </div>

                  {card.bio && (
                     <p className="text-white/80 text-lg leading-relaxed">{card.bio}</p>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                    {card.salaryRange && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white/70">Salary Range:</span>
                        <span className="text-sm font-semibold text-white">{card.salaryRange}</span>
                      </div>
                    )}
                    {card.linkedin && (
                      <a
                        href={card.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        LinkedIn Profile
                      </a>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative z-10 flex h-80 w-56 flex-col items-start justify-end overflow-hidden rounded-3xl bg-neutral-900 md:h-[40rem] md:w-96"
        whileHover={{
          scale: 1.02,
          boxShadow: "0 20px 25px -5px rgba(167, 232, 232, 0.3), 0 10px 10px -5px rgba(255, 105, 180, 0.2)",
          transition: { duration: 0.2 }
        }}
        whileTap={{
          scale: 0.98
        }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.div 
          className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent"
          animate={{
            opacity: isHovered ? 0.7 : 0.5,
          }}
          transition={{ duration: 0.2 }}
        />
        {/* Content Area with Text and Logo (Glassmorphism Style) */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 z-40 w-full p-6 flex items-center justify-between gap-4 bg-[rgb(30,30,30)]/40 backdrop-blur-sm border-t rounded-2xl border-[#a7e8e8]/20"
          animate={{
            // Removed: y: isHovered ? -10 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Gradient Overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-[rgb(30,30,30)]/50 to-transparent"
            animate={{
              background: isHovered 
                ? "linear-gradient(to top right, rgba(167, 232, 232, 0.8), rgba(243, 229, 245, 0.3), rgba(255, 105, 180, 0.4))"
                : "linear-gradient(to top, rgba(30, 30, 30, 0.5), transparent)"
            }}
            transition={{ duration: 0.3 }}
            style={{
              boxShadow: isHovered ? "0 0 20px rgba(167, 232, 232, 0.3)" : "none"
            }}
          />

          {/* Text Container (Category and Title) */}
          <div className="relative z-10 flex flex-col">
            <motion.p
              layoutId={layout ? `category-${card.category}` : undefined}
              className="text-left font-sans text-sm font-medium md:text-base"
              animate={{
                color: isHovered ? "white" : "white",
                opacity: isHovered ? 0.8 : 1,
              }}
            >
              {card.category}
            </motion.p>
            <motion.p
              layoutId={layout ? `title-${card.title}` : undefined}
              className="mt-2 max-w-xs text-left font-sans text-xl font-semibold [text-wrap:balance] md:text-3xl"
              animate={{
                color: isHovered ? "white" : "white",
              }}
            >
              {card.title}
            </motion.p>
          </div>

          {/* Company Logo on Card */}
          {card.companyLogo && (
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <img
                src={card.companyLogo}
                alt={`${card.companyName || 'Company'} Logo`}
                className="h-12 w-12 object-contain rounded-md bg-white p-1"
              />
            </motion.div>
          )}
        </motion.div>
        <motion.div
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 z-10"
        >
          <div className="relative h-full w-full">
            <BlurImage
              src={card.src}
              alt={card.title}
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </motion.button>
    </>
  );
};

export const BlurImage = ({
  src,
  className,
  alt,
  ...rest
}: {
  src: string;
  className?: string;
  alt: string;
  [key: string]: unknown;
}) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className={cn(
        "object-cover transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className
      )}
      onLoad={() => setLoading(false)}
      {...rest}
    />
  );
};
