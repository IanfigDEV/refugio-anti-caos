import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, Heart, Lock, MailOpen, Sparkles, Wind, X } from "lucide-react";
import { config, withName } from "../config";
import useModalBehavior from "../hooks/useModalBehavior";

const ICONS = { calendar: CalendarCheck, wind: Wind, sparkles: Sparkles, heart: Heart };

const isLocked = (letter) => !!letter.unlockAt && new Date(letter.unlockAt).getTime() > Date.now();

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

/** Desenho do envelope. `open` controla a aba abrindo. */
function EnvelopeGraphic({ open = false, small = false, icon: Icon = Heart }) {
  return (
    <div className={`relative w-full [perspective:800px] ${small ? "" : "drop-shadow-xl"}`} style={{ aspectRatio: "4 / 3" }}>
      {/* fundo do envelope */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-rosegold-200 to-rosegold-300" />

      {/* carta saindo (só aparece quando abre) */}
      <motion.div
        className="absolute inset-x-[8%] top-[10%] h-[70%] rounded-md bg-white shadow-sm"
        initial={false}
        animate={{ y: open ? "-38%" : "0%" }}
        transition={{ duration: 0.7, delay: open ? 0.35 : 0, ease: "easeOut" }}
      >
        <div className="mx-auto mt-4 h-1 w-1/2 rounded bg-lavender-200" />
        <div className="mx-auto mt-2 h-1 w-2/3 rounded bg-lavender-100" />
        <div className="mx-auto mt-2 h-1 w-1/2 rounded bg-lavender-100" />
      </motion.div>

      {/* frente (bolsos laterais e inferior) */}
      <div
        className="absolute inset-0 rounded-lg bg-gradient-to-br from-rosegold-300 to-rosegold-400"
        style={{ clipPath: "polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)" }}
      />
      <div
        className="absolute inset-0 rounded-lg bg-rosegold-300/90"
        style={{ clipPath: "polygon(0 100%, 50% 45%, 100% 100%)" }}
      />

      {/* aba superior */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[58%] [transform-style:preserve-3d]"
        style={{ transformOrigin: "top", clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
        initial={false}
        animate={{ rotateX: open ? 180 : 0, zIndex: open ? 0 : 5 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="h-full w-full bg-gradient-to-b from-rosegold-400 to-rosegold-300" />
      </motion.div>

      {/* selo de cera */}
      <motion.div
        className="absolute left-1/2 top-[50%] z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-white shadow-md sm:h-10 sm:w-10"
        style={{ background: "radial-gradient(circle at 35% 30%, #c98f78, #8d5b49)" }}
        initial={false}
        animate={{ opacity: open ? 0 : 1, scale: open ? 0.4 : 1 }}
        transition={{ duration: 0.25 }}
      >
        <Icon size={16} aria-hidden="true" />
      </motion.div>
    </div>
  );
}

/** Modal: envelope abre → carta aparece */
function LetterModal({ letter, onClose }) {
  const [stage, setStage] = useState("opening"); // opening → letter
  const [flapOpen, setFlapOpen] = useState(false);
  const Icon = ICONS[letter.icon] || Heart;

  useModalBehavior(true, onClose);

  useEffect(() => {
    const t1 = setTimeout(() => setFlapOpen(true), 250);
    const t2 = setTimeout(() => setStage("letter"), 1700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
      style={{ background: "rgba(43, 37, 64, 0.6)", backdropFilter: "blur(5px)", WebkitBackdropFilter: "blur(5px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar carta"
        className="absolute right-4 top-4 rounded-full bg-white/15 p-2.5 text-white transition hover:bg-white/25 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
        style={{ marginTop: "env(safe-area-inset-top)" }}
      >
        <X size={20} />
      </button>

      <AnimatePresence mode="wait">
        {stage === "opening" ? (
          <motion.div
            key="envelope"
            className="w-full max-w-xs"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            <EnvelopeGraphic open={flapOpen} icon={Icon} />
            <p className="mt-6 text-center font-serif text-lg italic text-white/90">{letter.trigger}</p>
          </motion.div>
        ) : (
          <motion.article
            key="letter"
            role="dialog"
            aria-modal="true"
            aria-label={letter.letterTitle}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 70, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", damping: 22, stiffness: 160 }}
            className="relative max-h-[85svh] w-full max-w-md overflow-y-auto rounded-2xl bg-cream p-7 shadow-soft sm:p-9"
          >
            <div className="flex items-center justify-center gap-2 text-rosegold-500">
              <span className="h-px w-8 bg-rosegold-300" aria-hidden="true" />
              <Icon size={18} aria-hidden="true" />
              <span className="h-px w-8 bg-rosegold-300" aria-hidden="true" />
            </div>

            <p className="mt-3 text-center text-[11px] uppercase tracking-[0.3em] text-ink-500">{letter.trigger}</p>
            <h3 className="mt-2 text-center font-serif text-2xl sm:text-3xl">{letter.letterTitle}</h3>

            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink-700">
              {letter.body.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.35, duration: 0.7 }}
                >
                  {withName(p)}
                </motion.p>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + letter.body.length * 0.35, duration: 0.8 }}
              className="mt-7 text-right"
            >
              <p className="font-serif text-base italic text-ink-700">{letter.sign}</p>
              <p className="font-serif text-xl text-rosegold-600">{config.yourName}</p>
            </motion.div>

            <div className="mt-7 flex justify-center">
              <button type="button" onClick={onClose} className="btn-gold">
                Guardar no coração
              </button>
            </div>
          </motion.article>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function TimeCapsules() {
  const { capsules } = config;
  const [active, setActive] = useState(null);
  const [opened, setOpened] = useState(() => new Set());
  const [lockedHint, setLockedHint] = useState(null);

  const openLetter = (letter) => {
    if (isLocked(letter)) {
      setLockedHint(letter.id);
      setTimeout(() => setLockedHint(null), 3500);
      return;
    }
    setActive(letter);
    setOpened((prev) => new Set(prev).add(letter.id));
  };

  const close = useCallback(() => setActive(null), []);

  return (
    <section id="capsulas" className="relative px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-rosegold-600">Cápsulas do Tempo</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">{capsules.title}</h2>
          <p className="mx-auto mt-4 max-w-sm text-base font-light leading-relaxed">{capsules.subtitle}</p>
        </motion.div>

        {/* fileira de envelopes: rola de lado no celular, vira grade no desktop */}
        <div className="-mx-5 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[10vw] pb-6 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {capsules.letters.map((letter, i) => {
            const Icon = ICONS[letter.icon] || Heart;
            const locked = isLocked(letter);
            const wasOpened = opened.has(letter.id);

            return (
              <motion.div
                key={letter.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="w-[70vw] max-w-[280px] shrink-0 snap-center sm:w-auto sm:max-w-none"
              >
                <motion.button
                  type="button"
                  onClick={() => openLetter(letter)}
                  whileHover={{ y: -8, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label={`${letter.trigger}${locked ? " (ainda trancada)" : ""}`}
                  className="group block w-full rounded-2xl p-3 text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-rosegold-300/70"
                >
                  <div className={locked ? "opacity-60 saturate-50" : ""}>
                    <EnvelopeGraphic small icon={locked ? Lock : wasOpened ? MailOpen : Icon} />
                  </div>

                  <p className="mt-4 text-center font-serif text-base leading-snug text-ink-900 sm:text-[17px]">
                    {letter.trigger}
                  </p>
                  <p className="mt-1 text-center text-xs text-ink-500">
                    {locked
                      ? `Libera em ${formatDate(letter.unlockAt)}`
                      : wasOpened
                      ? "já aberta · toque pra reler"
                      : "toque para abrir"}
                  </p>
                </motion.button>

                <AnimatePresence>
                  {lockedHint === letter.id && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-1 text-center text-xs text-rosegold-600"
                      role="status"
                    >
                      Calma, ainda não é a hora. Essa vale a espera. 💛
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {active && <LetterModal key={active.id} letter={active} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}
