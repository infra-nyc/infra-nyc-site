"use client";

import { motion, type MotionProps } from "framer-motion";

type RevealProps = MotionProps & {
  children: React.ReactNode;
  className?: string;
};

export function Reveal({ children, className, ...props }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
