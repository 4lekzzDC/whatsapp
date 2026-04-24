"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AlertTriangle } from "lucide-react";

type ConfirmOptions = {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
};

type ConfirmApi = (opts: ConfirmOptions) => Promise<boolean>;

const Ctx = createContext<ConfirmApi | null>(null);

export function useConfirm(): ConfirmApi {
  const api = useContext(Ctx);
  if (!api) throw new Error("useConfirm fora do ConfirmProvider");
  return api;
}

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [opts, setOpts] = useState<ConfirmOptions | null>(null);
  const resolver = useRef<((v: boolean) => void) | null>(null);

  const confirm: ConfirmApi = useCallback((o) => {
    setOpts(o);
    return new Promise<boolean>((resolve) => {
      resolver.current = resolve;
    });
  }, []);

  function settle(value: boolean) {
    resolver.current?.(value);
    resolver.current = null;
    setOpts(null);
  }

  return (
    <Ctx.Provider value={confirm}>
      {children}
      {opts && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="glass-card rounded-2xl max-w-sm w-full p-6 border border-white/10 relative animate-slide-up">
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  opts.destructive
                    ? "bg-red-500/15 text-red-400"
                    : "bg-green-primary/15 text-green-primary"
                }`}
              >
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{opts.title}</h3>
                {opts.description && (
                  <p className="text-sm text-text-muted mt-1">{opts.description}</p>
                )}
              </div>
            </div>
            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                onClick={() => settle(false)}
                className="text-sm text-white/80 hover:text-white px-3 py-2 rounded-lg hover:bg-white/[0.04]"
              >
                {opts.cancelLabel ?? "Cancelar"}
              </button>
              <button
                onClick={() => settle(true)}
                autoFocus
                className={`text-sm font-semibold px-3 py-2 rounded-lg ${
                  opts.destructive
                    ? "bg-red-500 hover:bg-red-500/90 text-white"
                    : "bg-green-primary hover:bg-green-primary/90 text-black"
                }`}
              >
                {opts.confirmLabel ?? "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}
