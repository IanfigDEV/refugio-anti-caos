import { motion } from "framer-motion";
import { config } from "../config";

/**
 * Ilustração da Lulu.
 *
 * 👉 PLACEHOLDER: este SVG é uma coelhinha minimalista de óculos.
 *    Para usar sua própria imagem/ilustração, coloque o arquivo em
 *    public/images/lulu.png e mude `luluImage` em src/config.js
 *    para "/images/lulu.png".
 */
export default function LuluIllustration() {
  return (
    <motion.div
      className="relative mx-auto h-48 w-48 sm:h-60 sm:w-60"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* brilho suave atrás */}
      <div className="absolute inset-4 rounded-full bg-white/60 blur-2xl" aria-hidden="true" />

      {config.luluImage ? (
        <img
          src={config.luluImage}
          alt="Lulu, a coelhinha"
          className="relative h-full w-full rounded-full object-cover shadow-soft ring-4 ring-white/70"
        />
      ) : (
        <svg
          viewBox="0 0 240 260"
          role="img"
          aria-label="Ilustração da Lulu, uma coelhinha de óculos (placeholder)"
          className="relative h-full w-full drop-shadow-[0_12px_20px_rgba(90,70,130,0.18)]"
        >
          {/* orelhas */}
          <g>
            <ellipse cx="92" cy="58" rx="20" ry="52" fill="#FFFFFF" stroke="#CDBFE6" strokeWidth="3" transform="rotate(-8 92 58)" />
            <ellipse cx="92" cy="62" rx="9" ry="36" fill="#F0D5C9" transform="rotate(-8 92 62)" />
            <ellipse cx="148" cy="58" rx="20" ry="52" fill="#FFFFFF" stroke="#CDBFE6" strokeWidth="3" transform="rotate(8 148 58)" />
            <ellipse cx="148" cy="62" rx="9" ry="36" fill="#F0D5C9" transform="rotate(8 148 62)" />
          </g>

          {/* corpo */}
          <ellipse cx="120" cy="214" rx="56" ry="38" fill="#FFFFFF" stroke="#CDBFE6" strokeWidth="3" />
          <ellipse cx="96" cy="240" rx="16" ry="9" fill="#FFFFFF" stroke="#CDBFE6" strokeWidth="3" />
          <ellipse cx="144" cy="240" rx="16" ry="9" fill="#FFFFFF" stroke="#CDBFE6" strokeWidth="3" />

          {/* cabeça */}
          <ellipse cx="120" cy="136" rx="62" ry="54" fill="#FFFFFF" stroke="#CDBFE6" strokeWidth="3" />

          {/* bochechas */}
          <ellipse cx="82" cy="156" rx="11" ry="7" fill="#F0D5C9" opacity="0.75" />
          <ellipse cx="158" cy="156" rx="11" ry="7" fill="#F0D5C9" opacity="0.75" />

          {/* olhos */}
          <circle cx="96" cy="132" r="5" fill="#2B2540" />
          <circle cx="144" cy="132" r="5" fill="#2B2540" />
          <circle cx="97.5" cy="130.5" r="1.6" fill="#FFFFFF" />
          <circle cx="145.5" cy="130.5" r="1.6" fill="#FFFFFF" />

          {/* óculos */}
          <g fill="rgba(255,255,255,0.35)" stroke="#C98F78" strokeWidth="3.5">
            <circle cx="96" cy="132" r="20" />
            <circle cx="144" cy="132" r="20" />
          </g>
          <path d="M116 130 Q120 124 124 130" fill="none" stroke="#C98F78" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M76 128 L66 124 M164 128 L174 124" stroke="#C98F78" strokeWidth="3" strokeLinecap="round" />

          {/* nariz e boquinha */}
          <path d="M114 154 Q120 150 126 154 Q120 162 114 154 Z" fill="#DCA790" />
          <path d="M120 160 L120 166 M120 166 Q113 172 108 167 M120 166 Q127 172 132 167" fill="none" stroke="#B07560" strokeWidth="2.5" strokeLinecap="round" />

          {/* bigodes */}
          <g stroke="#CDBFE6" strokeWidth="2" strokeLinecap="round">
            <path d="M70 160 L52 156 M70 166 L52 170" />
            <path d="M170 160 L188 156 M170 166 L188 170" />
          </g>

          {/* coraçãozinho */}
          <path
            d="M120 205 c-6 -8 -18 -2 -12 8 c4 6 12 11 12 11 s8 -5 12 -11 c6 -10 -6 -16 -12 -8 z"
            fill="#E8C2B2"
          />
        </svg>
      )}
    </motion.div>
  );
}
