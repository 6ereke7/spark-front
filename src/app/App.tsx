import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { CourseDetail } from "../pages/CourseDetail";
import { NavBar } from "../components/layout/NavBar";
import ScrollToHash from "../components/layout/ScrollToHash";
import { Footer } from "../components/layout/Footer";

export function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses/:slug" element={<CourseDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
