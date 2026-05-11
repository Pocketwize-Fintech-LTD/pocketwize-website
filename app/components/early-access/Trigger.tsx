"use client";

import type { ReactNode } from "react";
import { useEarlyAccess } from "./Provider";

type TriggerProps = {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
};

export default function EarlyAccessTrigger({
  children,
  className = "",
  ariaLabel,
}: TriggerProps) {
  const { open } = useEarlyAccess();
  return (
    <button
      type="button"
      onClick={open}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </button>
  );
}
