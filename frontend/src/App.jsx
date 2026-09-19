import { ContactForm } from "./components/ContactFromComponent";
import { VehicleForm } from "./components/VehiclefromComponent";
import { PartForm } from "./components/PartfromComponent";
import { BookingFrom } from "./components/BookingFormComponent";

function App() {
  return (
    <div className="App">
      <ContactForm />
      <VehicleForm />
      <PartForm />
      <BookingFrom />
    </div>
  );
}

export default App;
