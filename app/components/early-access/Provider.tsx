"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import EarlyAccessModal from "./Modal";

type EarlyAccessContextValue = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const EarlyAccessContext = createContext<EarlyAccessContextValue | null>(null);

export function useEarlyAccess() {
  const ctx = useContext(EarlyAccessContext);
  if (!ctx) {
    throw new Error("useEarlyAccess must be used inside <EarlyAccessProvider>");
  }
  return ctx;
}

export default function EarlyAccessProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <EarlyAccessContext.Provider value={{ open, close, isOpen }}>
      {children}
      <EarlyAccessModal open={isOpen} onClose={close} />
    </EarlyAccessContext.Provider>
  );
}
