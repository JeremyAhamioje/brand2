import { useInView } from "./hooks.js";

// Wraps children in a scroll-reveal. `as` picks the element, `delay`
// staggers it (seconds). Uses the .reveal / .in classes in managed.css.
export default function Reveal({
  as: Tag = "div",
  delay = 0,
  className = "",
  style,
  children,
  ...rest
}) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "in" : ""} ${className}`.trim()}
      style={{ transitionDelay: `${delay}s`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
