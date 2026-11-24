"use client";

import React from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  HTMLMotionProps,
  Variants,
} from "framer-motion";

/**
 * Historical Museum Archive Motion System
 * Sophisticated, gentle, respectful transitions matching archive aesthetics.
 */

export { motion, AnimatePresence, useReducedMotion };

// Standard museum archive easing curve
export const ARCHIVE_EASE = [0.22, 1, 0.36, 1] as const;

// Stagger container variants
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: (custom: { stagger?: number; delay?: number } = {}) => ({
    opacity: 1,
    transition: {
      delayChildren: custom.delay ?? 0.1,
      staggerChildren: custom.stagger ?? 0.08,
    },
  }),
};

// Item fade up variants
export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: ARCHIVE_EASE,
    },
  },
};

// Item fade in variants
export const fadeInItem: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

interface FadeInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  children: React.ReactNode;
  className?: string;
}

export function FadeIn({
  delay = 0,
  duration = 0.6,
  direction = "up",
  distance = 20,
  children,
  className = "",
  ...props
}: FadeInProps) {
  const prefersReduced = useReducedMotion();

  const getInitial = () => {
    if (prefersReduced) return { opacity: 0 };
    switch (direction) {
      case "up":
        return { opacity: 0, y: distance };
      case "down":
        return { opacity: 0, y: -distance };
      case "left":
        return { opacity: 0, x: distance };
      case "right":
        return { opacity: 0, x: -distance };
      case "none":
      default:
        return { opacity: 0 };
    }
  };

  const getAnimate = () => {
    if (prefersReduced) return { opacity: 1 };
    switch (direction) {
      case "up":
      case "down":
        return { opacity: 1, y: 0 };
      case "left":
      case "right":
        return { opacity: 1, x: 0 };
      case "none":
      default:
        return { opacity: 1 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: prefersReduced ? 0.2 : duration,
        delay,
        ease: ARCHIVE_EASE,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps extends HTMLMotionProps<"div"> {
  stagger?: number;
  delay?: number;
  children: React.ReactNode;
  className?: string;
}

export function StaggerContainer({
  stagger = 0.08,
  delay = 0.1,
  children,
  className = "",
  ...props
}: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={staggerContainer}
      custom={{ stagger, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  ...props
}: HTMLMotionProps<"div"> & { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUpItem} className={className} {...props}>
      {children}
    </motion.div>
  );
}

/**
 * Subtle interactive hover card for museum photographs & editorial pieces
 */
export function MotionCard({
  children,
  className = "",
  ...props
}: HTMLMotionProps<"div"> & { children: React.ReactNode; className?: string }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      whileHover={
        prefersReduced
          ? undefined
          : {
              y: -4,
              transition: { duration: 0.25, ease: "easeOut" },
            }
      }
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Text reveal animation for headlines
 */
export function TextReveal({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(" ");

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: 0.04,
          },
        },
      }}
      className={`inline-block ${className}`}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block whitespace-nowrap mr-[0.25em]">
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 14 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: ARCHIVE_EASE },
              },
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
