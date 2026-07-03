import { useModel } from "../context/ModelContext.jsx";
import BookButton from "./BookButton.jsx";
import ModelToggle from "./ModelToggle.jsx";

// Sticky top navigation. The brand name reflects the active model
// (Brand 1 / Brand 2). The model toggle sits on the right, next to
// the Book-a-call button, so visitors can switch products from the nav.
export default function Navbar() {
  const { content } = useModel();

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <a href="#top" className="brand">
          {content.name}
        </a>
        <div className="nav-links">
          <a href="#how">How it works</a>
          <a href="#roles">Roles</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </div>
        <div className="nav-right">
          <ModelToggle size="sm" />
          <BookButton label="Book a call" />
        </div>
      </div>
    </nav>
  );
}
