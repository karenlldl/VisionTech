import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";

const HeroLoader = () => {
  const progress = useMotionValue(0);
  const width = useTransform(progress, (value) => `${value}%`);
  const percent = useTransform(progress, (value) =>
    Math.round(value).toString().padStart(3, "0")
  );

  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const controls = animate(progress, 100, {
      duration: 2.8,
      ease: [0.16, 0.84, 0.24, 1],
    });

    return controls.stop;
  }, [progress]);

  useMotionValueEvent(progress, "change", (value) => {
    if (value >= 99.9) {
      setIsFinished(true);
    }
  });

  return (
    <div className="relative mx-auto w-full max-w-[320px] select-none">
      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6, filter: "blur(6px)" }}
            transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
            className="flex flex-col items-center gap-3"
          >
            <div className="flex w-full items-center justify-between text-[10px] font-medium uppercase tracking-[0.28em] text-black/55">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1 w-1 animate-pulse rounded-full bg-brand-orange" />
                Inicializando
              </span>

              <motion.span className="font-mono tabular-nums text-black/45">
                {percent}
              </motion.span>
            </div>

            <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-brand-dark/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_10px_30px_-12px_rgba(0,0,0,0.4)]">
              <motion.div
                style={{ width }}
                className="relative h-full rounded-full bg-linear-to-r from-[#E85002] via-[#E85002] to-[#F16001]"
              >
                <div className="absolute inset-0 rounded-full bg-linear-to-r from-[#E85002] via-[#E85002] to-[#F16001] opacity-80 blur-[6px]" />
              </motion.div>

              <motion.div
                initial={{ x: "-40%" }}
                animate={{ x: "260%" }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-y-0 w-1/4 bg-linear-to-r from-transparent via-white/45 to-transparent"
              />
            </div>

            <p className="text-[11px] font-medium tracking-tight text-black/65">
              Inicializando inteligência operacional
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="finished"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
            className="flex flex-col items-center gap-3"
          >
            <div className="flex w-full items-center justify-between text-[10px] font-medium uppercase tracking-[0.28em] text-black/55">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-brand-orange" />
                Pronto
              </span>

              <span className="font-mono tabular-nums text-black/45">%100</span>
            </div>

            <div className="relative h-px w-full">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
                style={{ transformOrigin: "50% 50%" }}
                className="h-px w-full bg-linear-to-r from-transparent via-[#E85002] to-transparent"
              />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="absolute inset-0 bg-linear-to-r from-transparent via-[#F16001] to-transparent blur-[6px]"
              />
            </div>

            <motion.p
              initial={{
                letterSpacing: "0.05em",
                opacity: 0,
                filter: "blur(8px)",
              }}
              animate={{
                letterSpacing: "0.42em",
                opacity: 1,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 1.1,
                ease: [0.22, 0.61, 0.36, 1],
                delay: 0.15,
              }}
              className="bg-linear-to-r from-[#E85002] via-[#E85002] to-[#F16001] bg-clip-text text-[12px] font-semibold uppercase text-transparent"
            >
              Vision
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroLoader;