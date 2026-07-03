// ============================================================
// MODEL REGISTRY
// The homepage toggle switches between these two engagement
// models. Each model is a complete content object (see the
// files below) rendered by the shared section components.
//
// To add a future dedicated page for one model, import the
// object you need — the data is already fully separated.
// ============================================================

import { hireYourself } from "./hireYourself.js";
import { fullyManaged } from "./fullyManaged.js";

// Keyed by model id. Components look up MODELS[model].
export const MODELS = {
  hire: hireYourself,
  managed: fullyManaged,
};

// Order the toggle renders options in (left → right).
export const MODEL_ORDER = ["hire", "managed"];
