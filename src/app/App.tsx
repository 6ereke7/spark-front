import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { NavBar } from "../components/layout/NavBar";
import ScrollToHash from "../components/layout/ScrollToHash";

export function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
