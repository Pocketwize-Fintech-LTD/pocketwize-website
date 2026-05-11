"use client";

import { useEffect, useRef, useState } from "react";

type TypewriterProps = {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
};

export default function Typewriter({
  text,
  speed = 38,
  startDelay = 200,
  className = "",
}: TypewriterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [typed, setTyped] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStarted(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTyped(text);
      setDone(true);
      return;
    }

    let i = 0;
    const startTimer = window.setTimeout(() => {
      const interval = window.setInterval(() => {
        i += 1;
        setTyped(text.slice(0, i));
        if (i >= text.length) {
          window.clearInterval(interval);
          setDone(true);
        }
      }, speed);
      cleanup = () => window.clearInterval(interval);
    }, startDelay);

    let cleanup = () => window.clearTimeout(startTimer);
    return () => cleanup();
  }, [started, text, speed, startDelay]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden>{typed}</span>
      {!done && started && (
        <span aria-hidden className="pw-typewriter-caret" />
      )}
    </span>
  );
}
