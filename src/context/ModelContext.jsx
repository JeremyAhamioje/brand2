import { createContext, useContext, useMemo, useState } from "react";
import { MODELS } from "../data/models/index.js";
import { DEFAULT_MODEL } from "../data/content.js";

// ============================================================
// MODEL CONTEXT
// Holds the currently-selected engagement model ("hire" |
// "managed") and exposes the resolved content object for it.
// The toggle writes to `setModel`; every section reads
// `content` — so switching the toggle updates the whole page
// without leaving it.
// ============================================================

const ModelContext = createContext(null);

export function ModelProvider({ children }) {
  const [model, setModel] = useState(DEFAULT_MODEL);

  const value = useMemo(
    () => ({
      model, // "hire" | "managed"
      setModel,
      content: MODELS[model], // resolved copy for the active model
    }),
    [model]
  );

  return (
    <ModelContext.Provider value={value}>{children}</ModelContext.Provider>
  );
}

// Convenience hook used by every section component.
export function useModel() {
  const ctx = useContext(ModelContext);
  if (!ctx) {
    throw new Error("useModel must be used within a <ModelProvider>");
  }
  return ctx;
}
