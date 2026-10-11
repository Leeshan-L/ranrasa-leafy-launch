import { useEffect, useState } from "react";

// FM Arjunn is a legacy font: it draws ASCII characters as Sinhala shapes.
// We show the FM text visually and give Google / screen readers the real
// Unicode text. If the font fails to load, the Unicode text is shown instead
// (system Sinhala font) so nobody sees ASCII gibberish.
export function SinhalaText({ fm, unicode }: { fm: string; unicode: string }) {
  const [fontFailed, setFontFailed] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined" || !document.fonts) return;
    document.fonts
      .load('1em "FM Arjunn"', fm)
      .then((faces) => {
        if (faces.length === 0) setFontFailed(true);
      })
      .catch(() => setFontFailed(true));
  }, [fm]);

  if (fontFailed) return <span lang="si">{unicode}</span>;

  return (
    <>
      <span aria-hidden="true" className="font-normal" style={{ fontFamily: '"FM Arjunn"' }}>
        {fm}
      </span>
      <span lang="si" className="sr-only">
        {unicode}
      </span>
    </>
  );
}
