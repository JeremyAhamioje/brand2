import { useModel } from "../context/ModelContext.jsx";
import { MODELS, MODEL_ORDER } from "../data/models/index.js";

// A segmented pill control that switches the whole page between
// the "Hire Yourself" and "Fully Managed" models. The sliding
// thumb is positioned by the active option's index.
export default function ModelToggle({ size = "md" }) {
  const { model, setModel } = useModel();
  const activeIndex = MODEL_ORDER.indexOf(model);

  return (
    <div
      className={`model-toggle model-toggle-${size}`}
      data-index={activeIndex}
      role="tablist"
      aria-label="Choose how you'd like to work with us"
    >
      <span className="model-toggle-thumb" aria-hidden="true" />
      {MODEL_ORDER.map((id) => {
        const m = MODELS[id];
        const isActive = id === model;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={isActive}
            data-active={isActive}
            className="model-toggle-btn"
            onClick={() => setModel(id)}
          >
            <span className="model-toggle-label">{m.toggle.label}</span>
            <span className="model-toggle-sub">{m.toggle.sub}</span>
          </button>
        );
      })}
    </div>
  );
}
