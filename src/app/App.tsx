import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { CourseDetail } from "../pages/CourseDetail";
import { Enroll } from "../pages/Enroll";
import { NavBar } from "../components/layout/NavBar";
import ScrollToHash from "../components/layout/ScrollToHash";
import { Footer } from "../components/layout/Footer";
import EffectGlitch from "../components/layout/EffectGlitch";

export function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <NavBar />
      <EffectGlitch>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />
          <Route path="/enroll" element={<Enroll />} />
        </Routes>
      </EffectGlitch>
      <Footer />
    </BrowserRouter>
  );
}
