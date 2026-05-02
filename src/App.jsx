import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import TemplatesPage from "./pages/TemplatesPage.jsx";
import PhotoboothPage from "./pages/PhotoboothPage.jsx";
import templates from "./data/templates.js";

function PageWrapper({ children }) {
  return (
    <motion.main
      className="flex-1"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.main>
  );
}

function App() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col text-ink">
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <LandingPage />
              </PageWrapper>
            }
          />
          <Route
            path="/templates"
            element={
              <PageWrapper>
                <TemplatesPage templates={templates} />
              </PageWrapper>
            }
          />
          <Route
            path="/photobooth"
            element={
              <PageWrapper>
                <PhotoboothPage templates={templates} />
              </PageWrapper>
            }
          />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
