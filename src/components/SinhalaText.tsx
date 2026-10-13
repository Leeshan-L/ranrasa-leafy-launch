import { useEffect, useState } from "react";

type Line = { fm: string; unicode: string; className?: string };

// FM Arjunn is a legacy font: it draws ASCII characters as Sinhala shapes.
// We show the FM text visually and give Google / screen readers the real
// Unicode text (once, as one sentence). If the font fails to load, the Unicode
// text is shown instead (system Sinhala font) so nobody sees ASCII gibberish.
// Pass `fm` + `unicode` for one line, or `lines` for separately styled lines
// (each rendered as its own block).
export function SinhalaText(props: { fm: string; unicode: string } | { lines: Line[] }) {
  const lines = "lines" in props ? props.lines : [{ fm: props.fm, unicode: props.unicode }];
  const multiline = lines.length > 1;
  const fmText = lines.map((l) => l.fm).join(" ");
  const [fontFailed, setFontFailed] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined" || !document.fonts) return;
    // load() doesn't reliably reject when the file fails, so check the
    // @font-face's own status once loading has settled.
    const faces = [...document.fonts].filter((f) => f.family.replace(/["']/g, "") === "FM Arjunn");
    let cancelled = false;
    document.fonts
      .load('1em "FM Arjunn"', fmText)
      .catch(() => undefined)
      .then(() => {
        if (!cancelled && !faces.some((f) => f.status === "loaded")) setFontFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [fmText]);

  const lineClass = (l: Line) => [multiline && "block", l.className].filter(Boolean).join(" ") || undefined;

  if (fontFailed) {
    return (
      <span lang="si">
        {lines.map((l, i) => (
          <span key={i} className={lineClass(l)}>
            {i > 0 && " "}
            {l.unicode}
          </span>
        ))}
      </span>
    );
  }

  return (
    <>
      <span aria-hidden="true" className="font-normal" style={{ fontFamily: '"FM Arjunn"' }}>
        {lines.map((l, i) => (
          <span key={i} className={lineClass(l)}>
            {l.fm}
          </span>
        ))}
      </span>
      <span lang="si" className="sr-only">
        {lines.map((l) => l.unicode).join(" ")}
      </span>
    </>
  );
}
