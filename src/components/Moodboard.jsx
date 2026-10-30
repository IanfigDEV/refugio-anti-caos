import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Camera, Music2 } from "lucide-react";
import { config } from "../config";

/**
 * Uma polaroid que vira.
 *  - Em dispositivos com mouse: vira no hover (e no foco por teclado).
 *  - Em celulares/tablets (sem hover): vira ao tocar.
 */
function Polaroid({ photo, index, canHover }) {
  const [flipped, setFlipped] = useState(false);

  const hoverProps = canHover
    ? {
        onMouseEnter: () => setFlipped(true),
        onMouseLeave: () => setFlipped(false),
      }
    : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: photo.rotate * 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: photo.rotate }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay: (index % 2) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ rotate: 0, scale: 1.04, zIndex: 20 }}
      style={{ marginTop: photo.offset }}
      className="relative mx-auto w-full max-w-[220px] [perspective:1000px] sm:max-w-[240px]"
    >
      <button
        type="button"
        onClick={() => !canHover && setFlipped((f) => !f)}
        onFocus={() => setFlipped(true)}
        onBlur={() => setFlipped(false)}
        aria-pressed={flipped}
        aria-label={`Polaroid ${index + 1}: ${flipped ? "mostrando o trecho da música" : "toque para ver o trecho da música"}`}
        className="block w-full rounded-md focus:outline-none focus-visible:ring-4 focus-visible:ring-rosegold-300/70"
        {...hoverProps}
      >
        <motion.div
          className="relative aspect-[4/5] w-full [transform-style:preserve-3d]"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* FRENTE — foto */}
          <div className="backface-hidden absolute inset-0 flex flex-col rounded-md bg-white p-2.5 pb-9 shadow-soft sm:p-3 sm:pb-11">
            <div className="relative flex-1 overflow-hidden rounded-sm bg-gradient-to-br from-lavender-100 via-sage-100 to-rosegold-200">
              {photo.image ? (
                // 👉 FOTO REAL: public/images/... (definida em src/config.js)
                <img src={photo.image} alt={photo.caption} loading="lazy" className="h-full w-full object-cover" />
              ) : (
                // 👉 PLACEHOLDER: troque `image: null` por "/images/fotoX.jpg" no config
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-ink-500/80">
                  <Camera size={28} aria-hidden="true" />
                  <span className="text-xs tracking-widest">{photo.label}</span>
                </div>
              )}
            </div>
            <p className="absolute inset-x-0 bottom-2.5 text-center font-serif text-xs italic text-ink-500 sm:bottom-3.5 sm:text-sm">
              {canHover ? "passe o mouse" : "toque pra virar"}
            </p>
          </div>

          {/* VERSO — trecho + legenda */}
          <div
            className="backface-hidden absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-md bg-gradient-to-br from-cream via-white to-lavender-50 p-3 text-center shadow-soft sm:p-4"
            style={{ transform: "rotateY(180deg)" }}
          >
            <Music2 size={16} className="text-rosegold-500" aria-hidden="true" />
            <p className="mt-2 font-serif text-[12px] italic leading-snug text-ink-900 sm:text-sm">“{photo.lyric}”</p>
            <p className="mt-1.5 text-[9px] uppercase tracking-[0.2em] text-rosegold-600 sm:text-[10px]">
              {config.song.artist} · {photo.song}
            </p>
            <div className="my-2.5 h-px w-8 bg-rosegold-300 sm:my-3" aria-hidden="true" />
            <p className="text-[11px] leading-snug text-ink-700 sm:text-[13px]">{photo.caption}</p>
          </div>
        </motion.div>
      </button>
    </motion.div>
  );
}

export default function Moodboard() {
  const { moodboard } = config;

  // detecta se o aparelho realmente tem "hover" (mouse). Celular = false.
  const canHover = useMemo(
    () => typeof window !== "undefined" && window.matchMedia?.("(hover: hover) and (pointer: fine)").matches,
    []
  );

  return (
    <section id="moodboard" className="relative bg-gradient-to-b from-transparent via-lavender-50 to-transparent px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-rosegold-600">Moodboard</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">{moodboard.title}</h2>
          <p className="mx-auto mt-4 max-w-sm text-base font-light leading-relaxed">{moodboard.subtitle}</p>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-8 md:grid-cols-3 md:gap-y-14">
          {moodboard.photos.map((photo, i) => (
            <Polaroid key={i} photo={photo} index={i} canHover={canHover} />
          ))}
        </div>
      </div>
    </section>
  );
}
