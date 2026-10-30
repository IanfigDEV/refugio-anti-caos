import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { config, withName } from "../config";
import AudioPlayer from "./AudioPlayer";
import LuluIllustration from "./LuluIllustration";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  const scrollToNext = () => {
    document.getElementById("sos")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="bg-calm-gradient relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">
      <AudioPlayer />

      {/* bolhas decorativas bem sutis */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-lavender-200/50 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-24 h-80 w-80 rounded-full bg-sage-200/50 blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, -24, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div {...fade(0.1)} className="relative">
        <LuluIllustration />
      </motion.div>

      <motion.p
        {...fade(0.3)}
        className="relative mt-8 text-[11px] font-medium uppercase tracking-[0.35em] text-rosegold-600"
      >
        Refúgio Anti-Caos
      </motion.p>

      <motion.h1
        {...fade(0.45)}
        className="relative mt-4 max-w-2xl text-4xl font-medium leading-tight sm:text-6xl"
      >
        {withName(config.hero.title)}
      </motion.h1>

      <motion.p
        {...fade(0.65)}
        className="relative mt-5 max-w-md text-base font-light leading-relaxed text-ink-700 sm:text-lg"
      >
        {config.hero.subtitle}
      </motion.p>

      <motion.button
        type="button"
        onClick={scrollToNext}
        aria-label="Descer para o próximo bloco"
        {...fade(1)}
        className="relative mt-12 flex flex-col items-center gap-1 text-xs text-ink-500 focus:outline-none focus-visible:ring-4 focus-visible:ring-rosegold-300/60"
      >
        <span className="tracking-widest">devagar, sem pressa</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown size={22} />
        </motion.span>
      </motion.button>
    </header>
  );
}
