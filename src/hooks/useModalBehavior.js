import { useEffect } from "react";

/**
 * Comportamento padrão de modais/overlays:
 *  - trava o scroll da página enquanto está aberto
 *  - fecha com a tecla ESC
 */
export default function useModalBehavior(isOpen, onClose) {
  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);
}
