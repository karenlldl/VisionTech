import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type HTMLMotionProps,
  type MotionProps,
} from "framer-motion";

import { useRef, type ElementType, type ReactNode } from "react";

const transitionEase = [0.22, 0.61, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
  amount?: number;
} & Omit<HTMLMotionProps<"div">, "children">;

export const Reveal = ({
  children,
  as = "div",
  delay = 0,
  y = 28,
  className,
  once = true,
  amount = 0.2,
  ...props
}: RevealProps) => {
  const prefersReducedMotion = useReducedMotion();

  const MotionComponent = motion(as as any);

  return (
    <MotionComponent
      initial={
        prefersReducedMotion
          ? false
          : {
              opacity: 0,
              y,
              filter: "blur(6px)",
            }
      }
      whileInView={
        prefersReducedMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }
      }
      viewport={{
        once,
        amount,
      }}
      transition={{
        duration: 0.9,
        delay,
        ease: transitionEase,
      }}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
} & Omit<MotionProps, "children">;

export const Stagger = ({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  amount = 0.15,
}: StaggerProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView={prefersReducedMotion ? undefined : "show"}
      viewport={{
        once: true,
        amount,
      }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  y?: number;
};

export const StaggerItem = ({
  children,
  className,
  y = 24,
}: StaggerItemProps) => {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y,
          filter: "blur(6px)",
        },

        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",

          transition: {
            duration: 0.8,
            ease: transitionEase,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

type ParallaxProps = {
  children: ReactNode;
  offset?: number;
  className?: string;
};

export const Parallax = ({
  children,
  offset = 80,
  className,
}: ParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(
    scrollYProgress,
    [0, 1],
    [offset, -offset]
  );

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={
          prefersReducedMotion
            ? undefined
            : {
                y: translateY,
                willChange: "transform",
              }
        }
      >
        {children}
      </motion.div>
    </div>
  );
};

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{
        scaleX: scrollYProgress,
        transformOrigin: "0% 50%",
      }}
      className="fixed left-0 right-0 top-0 z-60 h-0.5 bg-linear-to-r from-brand-ember via-brand-orange to-brand-orange-soft"
    />
  );
};

type ScaleOnScrollProps = {
  children: ReactNode;
  className?: string;
  from?: number;
  to?: number;
};

export const ScaleOnScroll = ({
  children,
  className,
  from = 0.94,
  to = 1,
}: ScaleOnScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 30%"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.6],
    [from, to]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.4],
    [0.6, 1]
  );

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={
          prefersReducedMotion
            ? undefined
            : {
                scale,
                opacity,
                willChange: "transform, opacity",
              }
        }
      >
        {children}
      </motion.div>
    </div>
  );
};