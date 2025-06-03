import React from "react";
import { motion } from "framer-motion";
import { TextRevealCard } from "@/components/ui/text-reveal-card";

export default function CallToActionSection() {
  return (
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
  );
} 