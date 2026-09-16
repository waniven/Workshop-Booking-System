import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import "./index.css";
import { ContactForm } from "./components/ContactFromComponent";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/contacts" element={<ContactForm />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
