"use client";

import { ArrowDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  count: number;
  onScrollToForm: () => void;
};

export function SelectionBar({ count, onScrollToForm }: Props) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
        >
          <button
            onClick={onScrollToForm}
            className="flex items-center gap-3 rounded-full border border-foreground/20 bg-foreground px-5 py-3 text-primary-foreground shadow-soft transition-opacity hover:opacity-90"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-foreground/20 font-mono text-xs font-semibold">
              {count}
            </span>
            <span className="text-sm font-medium">
              {count === 1 ? "1 role selected" : `${count} roles selected`}
            </span>
            <ArrowDown className="h-3.5 w-3.5 opacity-70" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
