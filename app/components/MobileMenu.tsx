"use client";

import { useEffect, useState } from "react";
import EarlyAccessTrigger from "./early-access/Trigger";

type NavLink = { label: string; href: string };

export default function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  // Lock background scroll while the menu is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink/30"
      >
        {open ? (
          <svg
            aria-hidden
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          >
            <path d="M5 5l10 10M15 5 5 15" />
          </svg>
        ) : (
          <svg
            aria-hidden
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          >
            <path d="M3 6h14M3 10h14M3 14h14" />
          </svg>
        )}
      </button>

      {open && (
        <>
          {/* Click-catcher to close on outside tap. */}
          <button
            aria-hidden
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 top-16 z-40 cursor-default"
          />
          <div className="pw-fade-up fixed inset-x-0 top-16 z-50 border-b border-line bg-paper">
            <nav className="flex flex-col gap-1 px-5 py-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-3 text-[15px] font-medium text-mute transition-colors hover:bg-cream hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
              <EarlyAccessTrigger
                ariaLabel="Join early access"
                className="pw-sheen mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-3 text-[15px] font-medium text-paper transition-colors hover:bg-primary-ink"
              >
                Join early access
                <svg
                  aria-hidden
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M3 7h8M7.5 3.5 11 7l-3.5 3.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </EarlyAccessTrigger>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
