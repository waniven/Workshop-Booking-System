import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { BookingForm } from "./components/BookingFormComponent";
import { BookingList } from "./components/BookingListComponent";
import { BookingDetail } from "./components/BookingDetailComponent";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookingList />} />
        <Route path="/bookings" element={<BookingList />} />
        <Route path="/bookings/create" element={<BookingForm />} />
        <Route path="/bookings/:id" element={<BookingDetail />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
