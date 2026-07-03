import { useModel } from "./context/ModelContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import ManagedPage from "./managed/ManagedPage.jsx";

// The toggle switches between two entirely different products:
//   hire    → Hire Yourself (Brand 1): warm, editorial landing page
//   managed → Fully Managed (Brand 2): dark, premium ops platform w/ globe
export default function App() {
  const { model } = useModel();

  if (model === "managed") {
    return <ManagedPage />;
  }

  return (
    <div className="app" data-model={model}>
      <Navbar />
      <HomePage />
      <Footer />
    </div>
  );
}
