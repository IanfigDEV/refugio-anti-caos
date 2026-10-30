import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarHeart, Heart, X } from "lucide-react";
import { config, withName } from "../config";
import useModalBehavior from "../hooks/useModalBehavior";

export default function FutureClinic() {
  const { clinic, yourName } = config;
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  useModalBehavior(open, close);

  return (
    <section id="clinica" className="relative overflow-hidden px-6 py-20 sm:py-28">
      {/* fundo colorido suave para o vidro "aparecer" */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-[85%] -translate-y-[60%] rounded-full bg-lavender-300/60 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-[10%] -translate-y-[30%] rounded-full bg-sage-300/60 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-[40%] translate-y-[10%] rounded-full bg-rosegold-200/70 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-rosegold-600">
            Consultório do Futuro
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl">Quem você está se tornando</h2>
        </motion.div>

        {/* CARTÃO DE VISITAS EM GLASSMORPHISM */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: -1.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -6 }}
          className="glass relative mx-auto mt-10 w-full max-w-md overflow-hidden rounded-[28px] p-8 shadow-glass sm:p-10"
        >
          {/* brilho diagonal */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-10 -top-20 h-40 rotate-12 bg-gradient-to-b from-white/60 to-transparent"
          />
          {/* fio dourado */}
          <div
            aria-hidden="true"
            className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-rosegold-400 to-transparent"
          />

          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-white/70 bg-white/40 shadow-soft"
          >
            <span
              className="font-serif text-6xl leading-none"
              style={{
                background: "linear-gradient(135deg, #dca790, #b07560)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
              aria-label="Símbolo da Psicologia"
            >
              Ψ
            </span>
          </motion.div>

          <h3 className="relative mt-6 text-2xl font-medium sm:text-3xl">{withName(clinic.title)}</h3>
          <p className="relative mt-1 font-serif text-lg italic text-ink-700">{clinic.subtitle}</p>
          <p className="relative mt-4 text-[11px] uppercase tracking-[0.3em] text-ink-500">{clinic.registry}</p>

          <div className="relative mx-auto my-6 h-px w-16 bg-rosegold-300" aria-hidden="true" />

          <button type="button" onClick={() => setOpen(true)} className="btn-gold relative">
            <CalendarHeart size={18} aria-hidden="true" />
            Agendar Consulta
          </button>
        </motion.div>
      </div>

      {/* MODAL COM O BILHETE */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="clinic-modal"
            className="fixed inset-0 z-50 flex items-center justify-center px-5"
            style={{ background: "rgba(43, 37, 64, 0.55)", backdropFilter: "blur(5px)", WebkitBackdropFilter: "blur(5px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Bilhete"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 40, scale: 0.94, rotate: -2 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ type: "spring", damping: 24, stiffness: 240 }}
              className="relative w-full max-w-sm rounded-3xl bg-cream p-8 text-center shadow-soft"
            >
              <button
                type="button"
                onClick={close}
                aria-label="Fechar bilhete"
                className="absolute right-3 top-3 rounded-full p-2 text-ink-500 transition hover:bg-lavender-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-rosegold-300/60"
              >
                <X size={18} />
              </button>

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rosegold-200/70 text-rosegold-600">
                <Heart size={22} fill="currentColor" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-serif text-2xl">{clinic.modalTitle}</h3>

              <p className="mt-4 font-serif text-lg italic leading-relaxed text-ink-700">“{clinic.note}”</p>

              <p className="mt-6 text-sm text-ink-500">— {yourName}</p>

              <button type="button" onClick={close} className="btn-gold mt-7">
                Que lindo, obrigada
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
