"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type AssistantState = {
  isOpen: boolean;
  seed: string | null;
  open: (seed?: string) => void;
  close: () => void;
};

const Ctx = createContext<AssistantState>({
  isOpen: false,
  seed: null,
  open: () => {},
  close: () => {},
});

export function AssistantProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [seed, setSeed] = useState<string | null>(null);

  const open = useCallback((s?: string) => {
    setSeed(s ?? null);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setSeed(null);
  }, []);

  const value = useMemo(() => ({ isOpen, seed, open, close }), [isOpen, seed, open, close]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useAssistant = () => useContext(Ctx);
