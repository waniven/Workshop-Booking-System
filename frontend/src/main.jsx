import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { BookingForm } from "./components/BookingFormComponent";
import { BookingList } from "./components/BookingListComponent";
import { BookingDetail } from "./components/BookingDetailComponent";
import { VehicleList } from "./components/VehicleListComponent";
import { ContactList } from "./components/ContactsListComponent";
import { ContactDetail } from "./components/ContactDetailComponent";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<BookingList />} />
        <Route path="/vehicles" element={<VehicleList />} />
        <Route path="/contacts" element={<ContactList />} />
        <Route path="/contacts/:id" element={<ContactDetail />} />
        <Route path="/bookings" element={<BookingList />} />
        <Route path="/bookings/create" element={<BookingForm />} />
        <Route path="/bookings/:id" element={<BookingDetail />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
