import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { config } from "../config";

/**
 * Player minimalista no topo da tela.
 *
 * 👉 ÁUDIO: coloque seu arquivo em  public/audio/musica.mp3
 *    (o caminho é definido em `song.src` no src/config.js).
 *
 * Tenta tocar sozinho ao abrir. Como a maioria dos navegadores
 * bloqueia autoplay, também tenta no primeiro toque/clique da pessoa
 * e sempre mantém o botão "Play para acalmar a alma" visível.
 */
export default function AudioPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const userPausedRef = useRef(false);

  const tryPlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || failed) return;
    try {
      await audio.play();
    } catch {
      /* navegador bloqueou o autoplay — ok, o botão resolve */
    }
  }, [failed]);

  // Tenta tocar ao carregar
  useEffect(() => {
    tryPlay();
  }, [tryPlay]);

  // Se bloqueado, tenta de novo no primeiro gesto da pessoa
  useEffect(() => {
    const onFirstGesture = () => {
      if (!userPausedRef.current) tryPlay();
    };
    window.addEventListener("pointerdown", onFirstGesture, { once: true });
    return () => window.removeEventListener("pointerdown", onFirstGesture);
  }, [tryPlay]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio || failed) return;
    if (audio.paused) {
      userPausedRef.current = false;
      try {
        await audio.play();
      } catch {
        setFailed(true);
      }
    } else {
      userPausedRef.current = true;
      audio.pause();
    }
  };

  return (
    <div className="fixed right-3 top-3 z-40 sm:right-5 sm:top-5" style={{ paddingTop: "env(safe-area-inset-top)" }}>
      {/* 👉 O ARQUIVO DE ÁUDIO É CARREGADO AQUI (public/audio/musica.mp3) */}
      <audio
        ref={audioRef}
        src={config.song.src}
        loop
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setFailed(true)}
      />

      <motion.button
        type="button"
        onClick={toggle}
        whileTap={{ scale: 0.96 }}
        aria-label={playing ? "Pausar música" : "Tocar música para acalmar a alma"}
        className="glass flex items-center gap-2.5 rounded-full py-2 pl-2 pr-4 text-xs font-medium text-ink-700 shadow-glass transition-colors hover:bg-white/60 focus:outline-none focus-visible:ring-4 focus-visible:ring-rosegold-300/60 sm:text-sm"
      >
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-rosegold-400 to-rosegold-500 text-white">
          {playing && (
            <motion.span
              className="absolute inset-0 rounded-full bg-rosegold-400/50"
              animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              aria-hidden="true"
            />
          )}
          {playing ? <Pause size={14} className="relative" /> : <Play size={14} className="relative ml-0.5" />}
        </span>

        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={playing ? "on" : "off"}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="max-w-[9.5rem] truncate"
          >
            {failed
              ? import.meta.env.DEV
                ? "Falta o áudio (public/audio)"
                : "Play para acalmar a alma"
              : playing
              ? config.song.title
              : "Play para acalmar a alma"}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
