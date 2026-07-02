import { BRAND } from "../data/content.js";
import BookButton from "./BookButton.jsx";

// Sticky top navigation. Links jump to sections by their id.
export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <a href="#top" className="brand">
          {BRAND}
        </a>
        <div className="nav-links">
          <a href="#how">How it works</a>
          <a href="#roles">Roles</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </div>
        <BookButton label="Book a call" />
      </div>
    </nav>
  );
}
