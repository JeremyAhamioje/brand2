import { useModel } from "../context/ModelContext.jsx";

export default function Footer() {
  const { content } = useModel();
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        © {year} {content.name}. All rights reserved.
      </div>
    </footer>
  );
}
