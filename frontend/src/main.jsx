import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import "./index.css";
import { ContactForm } from "./components/ContactFromComponent";
import { BookingFrom } from "./components/BookingFormComponent";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/contacts" element={<ContactForm />} />
        <Route path="/booking" element={<BookingFrom />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
