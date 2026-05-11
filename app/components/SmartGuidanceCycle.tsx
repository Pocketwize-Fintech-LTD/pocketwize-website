"use client";

import { useEffect, useRef, useState } from "react";

const insights = [
  {
    body: (
      <>
        You spent <strong className="font-medium">₦41,200</strong> this week —
        most of it after 9pm. Want a quiet 9pm spending pause?
      </>
    ),
    cta: "Try it",
  },
  {
    body: (
      <>
        Your salary lands Friday. Pre-routing{" "}
        <strong className="font-medium">₦25,000</strong> to savings keeps your
        “fun money” on track this month.
      </>
    ),
    cta: "Auto-route",
  },
  {
    body: (
      <>
        Three subscriptions you haven’t used in 30+ days are quietly costing
        you <strong className="font-medium">₦8,400</strong>/month.
      </>
    ),
    cta: "Review",
  },
];

export default function SmartGuidanceCycle() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => setActive(e.isIntersecting)),
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % insights.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [active]);

  const current = insights[index];

  return (
    <div ref={ref} className="mt-7 flex flex-1 items-end">
      <div className="w-full rounded-2xl border border-line-soft bg-cream/60 p-4">
        <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.14em] text-soft">
          <span>Smart guidance</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-success pw-pulse-dot" />
            Live
          </span>
        </div>
        <div className="relative min-h-[68px]">
          <p
            key={index}
            className="pw-fade-up mt-3 text-[14px] leading-[1.55] text-ink"
          >
            {current.body}
          </p>
        </div>
        <div className="mt-3 flex gap-2">
          <span className="rounded-full bg-primary px-3 py-1 text-[11px] font-medium text-paper">
            {current.cta}
          </span>
          <span className="rounded-full border border-line px-3 py-1 text-[11px] font-medium text-mute">
            Not now
          </span>
        </div>
        <div className="mt-3 flex justify-center gap-1">
          {insights.map((_, i) => (
            <span
              key={i}
              className={`h-1 w-4 rounded-full transition-colors ${
                i === index ? "bg-primary" : "bg-line"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
