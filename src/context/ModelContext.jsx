import { fullyManaged } from "../data/models/fullyManaged.js";

// ============================================================
// This is now a single-product site: Fully Managed (Brand 2).
// The old two-model toggle has been removed. `useModel` stays as
// a thin content accessor so the section components keep a single,
// stable source of copy without each importing the data directly.
// ============================================================
export function useModel() {
  return { model: "managed", content: fullyManaged };
}
