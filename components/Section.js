"use client";

import { useState, useId } from "react";

export default function Section({ title, subtitle, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();

  return (
    <section className={"acc" + (open ? " open" : "")}>
      <button
        type="button"
        className="acc-head"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="acc-titles">
          <span className="acc-title">{title}</span>
          {subtitle && <span className="acc-sub">{subtitle}</span>}
        </span>
        <span className="acc-icon" aria-hidden="true">
          <span className="acc-icon-h" />
          <span className="acc-icon-v" />
        </span>
      </button>
      {open && (
        <div className="acc-body" id={id}>
          <div className="acc-body-inner">{children}</div>
        </div>
      )}
    </section>
  );
}
