"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "../content";
import { t } from "./copy";

/**
 * "Wanna collab?" bottom sheet. Simone-style sentence form:
 * big statement lines with underline inputs, multi-select need pills,
 * then Send opens the visitor's email app with a pre-filled template.
 * No backend — pure mailto.
 */
export default function CollabSheet() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [project, setProject] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [needs, setNeeds] = useState<string[]>([]);
  const sheetRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const valid = name.trim().length > 0 && needs.length > 0;

  const toggleNeed = (need: string) =>
    setNeeds((prev) =>
      prev.includes(need) ? prev.filter((n) => n !== need) : [...prev, need]
    );

  // ESC closes, Tab stays trapped inside, body scroll locks while open.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !sheetRef.current) return;
      const focusables = sheetRef.current.querySelectorAll<HTMLElement>(
        'button, input, select, textarea, [href], [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    // Focus the name field once the sheet is up.
    const timer = window.setTimeout(() => {
      sheetRef.current?.querySelector<HTMLInputElement>('input[name="name"]')?.focus();
    }, 120);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(timer);
      triggerRef.current?.focus();
    };
  }, [open ]);

  const send = () => {
    if (!valid) return;
    const cleanName = name.trim();
    const needsLine = needs.join(", ");
    const subject = `Collab: ${needsLine} — ${cleanName}`;
    const lines = [
      "Hi DEXA,",
      "",
      `I'm ${cleanName}${project.trim() ? ` from ${project.trim()}` : ""}.`,
      `I need help with: ${needsLine}.`,
      email.trim() ? `You can reach me at: ${email.trim()}` : null,
      "",
      "About the project:",
      details.trim() ? details.trim() : "-",
      "",
      "—",
      "Sent from dexa-portfolio.vercel.app",
    ].filter((l): l is string => l !== null);
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
    setOpen(false);
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="collab-btn"
        onClick={() => setOpen(true)}
      >
        {t.collabButton} <span aria-hidden="true">→</span>
      </button>

      {open && (
        <div className="sheet-backdrop" onClick={() => setOpen(false)} aria-hidden="true" />
      )}
      {open && (
        <div
          ref={sheetRef}
          className="sheet"
          role="dialog"
          aria-modal="true"
          aria-label={t.collabButton}
        >
          <div className="sheet-inner">
            <button
              type="button"
              className="sheet-close"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              ×
            </button>

            <p className="sheet-kicker">{t.collabKicker}</p>
            <h2 className="sheet-title">{t.collabTitle}</h2>
            <p className="sheet-sub">{t.collabSub}</p>

            <p className="sheet-line">{t.collabHi}</p>
            <input
              name="name"
              className="sheet-input"
              placeholder={t.collabNamePh}
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />

            <p className="sheet-line">{t.collabWorkFor}</p>
            <input
              name="project"
              className="sheet-input"
              placeholder={t.collabProjectPh}
              value={project}
              onChange={(e) => setProject(e.target.value)}
              autoComplete="organization"
            />

            <p className="sheet-label">
              {t.collabNeedLabel} <span aria-hidden="true">*</span>
            </p>
            <div className="need-pills" role="group" aria-label={t.collabNeedLabel}>
              {t.collabNeeds.map((need) => (
                <button
                  key={need}
                  type="button"
                  className="need-pill"
                  aria-pressed={needs.includes(need)}
                  onClick={() => toggleNeed(need)}
                >
                  {need}
                </button>
              ))}
            </div>

            <p className="sheet-line">{t.collabWriteAt}</p>
            <input
              name="email"
              type="email"
              className="sheet-input"
              placeholder={t.collabEmailPh}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />

            <p className="sheet-line">{t.collabTalk}</p>

            <p className="sheet-label">{t.collabMoreLabel}</p>
            <textarea
              name="details"
              className="sheet-textarea"
              placeholder={t.collabMorePh}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={3}
            />

            <button
              type="button"
              className="sheet-send"
              disabled={!valid}
              onClick={send}
            >
              {t.collabSend} <span aria-hidden="true">→</span>
            </button>
            <p className="sheet-fine">{t.collabFine}</p>
          </div>
        </div>
      )}
    </>
  );
}
