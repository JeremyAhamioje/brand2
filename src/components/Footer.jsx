import { BRAND } from "../data/content.js";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        © {year} {BRAND}. All rights reserved.
      </div>
    </footer>
  );
}
