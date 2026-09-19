import { useState } from "react";
import { validateString, validateVehicleDate } from "../utils/validatorUtil";

export function VehicleForm() {
  const [year, setYear] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!year.trim() || !manufacturer.trim() || !model.trim()) {
      alert("All fields are required! Please fill out every item.");
      return;
    }

    if (!validateVehicleDate(year)) {
      alert("Invalid year input. Use 1886 to next year.");
      return;
    }

    if (!validateString(manufacturer)) {
      alert(
        "Invalid manufacturer input. Use only letters, numbers, and spaces.",
      );
      return;
    }

    if (!validateString(model)) {
      alert("Invalid model input. Use only letters, numbers, and spaces.");
      return;
    }

    const formData = {
      year: year.trim(),
      manufacturer: manufacturer.trim(),
      model: model.trim(),
    };

    try {
      const response = await fetch("http://localhost:3000/api/vehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Success! Vehicle data saved to the system.");

        setYear("");
        setManufacturer("");
        setModel("");
      } else {
        alert("Server error: Failed to save vehicle data.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error: Could not connect to the server: " + error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Add Vehicle</h1>

        <label
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Year:</span>
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            style={{ width: "200px" }}
          />
        </label>

        <label
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Manufacturer:</span>
          <input
            type="text"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            style={{ width: "200px" }}
          />
        </label>

        <label
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Model:</span>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            style={{ width: "200px" }}
          />
        </label>

        <button
          type="submit"
          style={{
            marginTop: "10px",
            padding: "8px 16px",
            alignSelf: "center",
          }}
        >
          Submit Part
        </button>
      </form>
    </div>
  );
}
