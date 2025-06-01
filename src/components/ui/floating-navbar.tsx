"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
}) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 0,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
        className={cn(
          "flex max-w-fit fixed top-6 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full bg-white/90 backdrop-blur-md shadow-[0px_8px_16px_-6px_rgba(0,0,0,0.1),0px_2px_8px_-2px_rgba(0,0,0,0.05)] z-[5000] px-5 py-3 items-center justify-center space-x-6 dark:bg-black/80",
          className
        )}
      >
        {navItems.map((navItem, idx) => {
          const isActive = pathname === navItem.link;
          return (
            <Link
              key={`link-${idx}`}
              href={navItem.link}
              className={cn(
                "relative items-center flex space-x-1 px-3 py-1.5 rounded-full transition-all duration-200",
                isActive 
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-medium" 
                  : "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/50"
              )}
            >
              <span className="flex items-center justify-center">
                {navItem.icon && (
                  <span className={cn(
                    "mr-1.5",
                    isActive ? "text-blue-600 dark:text-blue-400" : "text-neutral-500 dark:text-neutral-400"
                  )}>
                    {navItem.icon}
                  </span>
                )}
                <span className={cn(
                  "text-sm font-medium",
                  isActive ? "" : "font-normal"
                )}>
                  {navItem.name}
                </span>
              </span>
            </Link>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
};
