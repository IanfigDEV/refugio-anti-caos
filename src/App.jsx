import { Heart } from "lucide-react";
import { config } from "./config";
import Hero from "./components/Hero";
import SosButton from "./components/SosButton";
import FutureClinic from "./components/FutureClinic";
import Moodboard from "./components/Moodboard";
import TimeCapsules from "./components/TimeCapsules";

/**
 * Refúgio Anti-Caos — Single Page Application
 *
 * Ordem das seções:
 *  1. Hero            (boas-vindas + música + Lulu)
 *  2. SosButton       (respiração guiada)
 *  3. FutureClinic    (consultório do futuro)
 *  4. Moodboard       (polaroids + trechos de música)
 *  5. TimeCapsules    (envelopes com cartas)
 *
 * Tudo que é texto/foto/áudio é configurado em src/config.js
 */
export default function App() {
  return (
    <div className="min-h-screen bg-cream">
      <Hero />

      <main>
        <SosButton />
        <FutureClinic />
        <Moodboard />
        <TimeCapsules />
      </main>

      <footer className="px-6 pb-12 pt-6 text-center">
        <div className="mx-auto mb-4 h-px w-16 bg-rosegold-300" aria-hidden="true" />
        <p className="mx-auto flex max-w-sm items-center justify-center gap-2 font-serif text-base italic text-ink-700">
          <Heart size={14} className="shrink-0 text-rosegold-500" fill="currentColor" aria-hidden="true" />
          {config.footer}
        </p>
      </footer>
    </div>
  );
}
