import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, RotateCcw, Wind, X } from "lucide-react";
import { config } from "../config";
import useModalBehavior from "../hooks/useModalBehavior";

const PHASES = ["Inspire", "Segure", "Expire"];

export default function SosButton() {
  const { cycles, seconds, buttonLabel, afterMessage } = config.sos;
  const totalTicks = cycles * PHASES.length * seconds;

  const [open, setOpen] = useState(false);
  const [tick, setTick] = useState(0);
  const done = tick >= totalTicks;

  const close = useCallback(() => {
    setOpen(false);
    setTick(0);
  }, []);

  useModalBehavior(open, close);

  // relógio da respiração: 1 tick por segundo
  useEffect(() => {
    if (!open || done) return undefined;
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [open, done]);

  const { phaseIndex, countdown } = useMemo(() => {
    const t = Math.min(tick, totalTicks - 1);
    return {
      phaseIndex: Math.floor(t / seconds) % PHASES.length,
      countdown: seconds - (t % seconds),
    };
  }, [tick, totalTicks, seconds]);

  // Círculo cresce na inspiração, segura, e encolhe na expiração
  const circleTarget = phaseIndex === 2 ? 0.62 : 1.12;
  const circleDuration = phaseIndex === 1 ? 0.3 : seconds;

  return (
    <section id="sos" className="relative px-6 py-20 sm:py-28">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-rosegold-600">
            Botão SOS
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl">Um minuto só pra você</h2>
          <p className="mt-4 max-w-sm text-base font-light leading-relaxed">
            Quando tudo parecer grande demais, é só apertar. Eu te guio na respiração.
          </p>

          <div className="relative mt-10">
            {/* ondas de pulsação */}
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-rosegold-300/50"
              animate={{ scale: [1, 1.35], opacity: [0.55, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-rosegold-300/40"
              animate={{ scale: [1, 1.35], opacity: [0.45, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 1.2 }}
            />
            <motion.button
              type="button"
              onClick={() => setOpen(true)}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              whileTap={{ scale: 0.95 }}
              className="relative flex h-44 w-44 flex-col items-center justify-center gap-2 rounded-full px-6 text-center text-sm font-medium leading-snug text-white shadow-soft focus:outline-none focus-visible:ring-4 focus-visible:ring-rosegold-300/70 sm:h-48 sm:w-48"
              style={{ background: "linear-gradient(145deg, #e8c2b2, #c98f78 60%, #b07560)" }}
            >
              <Wind size={26} aria-hidden="true" />
              <span>{buttonLabel}</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* OVERLAY DE RESPIRAÇÃO */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="sos-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Exercício de respiração guiada"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6"
            style={{ background: "rgba(36, 30, 58, 0.78)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Fechar exercício"
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2.5 text-white/80 transition hover:bg-white/20 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
              style={{ marginTop: "env(safe-area-inset-top)" }}
            >
              <X size={20} />
            </button>

            <AnimatePresence mode="wait">
              {!done ? (
                <motion.div
                  key="breathing"
                  className="flex flex-col items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="relative flex h-72 w-72 items-center justify-center sm:h-80 sm:w-80">
                    {/* anel guia */}
                    <div className="absolute inset-0 rounded-full border border-white/20" aria-hidden="true" />
                    {/* círculo que respira */}
                    <motion.div
                      className="absolute h-64 w-64 rounded-full sm:h-72 sm:w-72"
                      style={{
                        background:
                          "radial-gradient(circle at 35% 30%, #f6e4db, #dca790 55%, #b98570)",
                        boxShadow: "0 0 80px 10px rgba(220,167,144,0.35)",
                      }}
                      initial={{ scale: 0.62 }}
                      animate={{ scale: circleTarget }}
                      transition={{ duration: circleDuration, ease: "easeInOut" }}
                    />
                    <div className="relative z-10 text-center text-white" aria-live="polite">
                      <p className="font-serif text-3xl sm:text-4xl">{PHASES[phaseIndex]}</p>
                      <p className="mt-1 text-lg font-light opacity-90">{countdown}s</p>
                    </div>
                  </div>

                  <p className="mt-8 text-center font-serif text-lg italic text-white/90">
                    Inspire ({seconds}s)... Segure ({seconds}s)... Expire ({seconds}s)
                  </p>
                  <p className="mt-2 text-xs tracking-widest text-white/60">
                    ciclo {Math.min(Math.floor(tick / (PHASES.length * seconds)) + 1, cycles)} de {cycles}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="message"
                  className="flex max-w-md flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    className="text-rosegold-300"
                  >
                    <Heart size={40} fill="currentColor" aria-hidden="true" />
                  </motion.div>
                  <p className="mt-6 font-serif text-2xl leading-relaxed text-white sm:text-3xl" aria-live="polite">
                    {afterMessage}
                  </p>
                  <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setTick(0)}
                      className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm text-white/90 transition hover:bg-white/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
                    >
                      <RotateCcw size={16} aria-hidden="true" />
                      Respirar de novo
                    </button>
                    <button type="button" onClick={close} className="btn-gold">
                      Voltar pro refúgio
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
