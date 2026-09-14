import { useState } from "react";
import { validateString, validatePartStatus } from "../utils/validatorUtil";

export function PartForm() {
  const [partNumber, setPartNumber] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!partNumber.trim() || !manufacturer.trim() || !status) {
      alert("All fields are required! Please fill out every item.");
      return;
    }

    if (!validateString(partNumber)) {
      alert("Invalid Part Number! Use only letters, numbers, and spaces.");
      return;
    }

    if (!validatePartStatus(status)) {
      alert("Please select a valid status!");
      return;
    }

    const formData = {
      partNumber: partNumber.trim(),
      manufacturer: manufacturer.trim(),
      status: status,
    };

    try {
      const response = await fetch("http://localhost:3000/api/parts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Success! Part data saved to the system.");

        setPartNumber("");
        setManufacturer("");
        setStatus("");
      } else {
        alert("Server error: Failed to save part data.");
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
        <h1>Add Part</h1>
        <label
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Part Number:
          <input
            type="text"
            value={partNumber}
            onChange={(e) => setPartNumber(e.target.value)}
            style={{ marginLeft: "10px" }}
          />
        </label>

        <label
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Manufacturer:
          <input
            type="text"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            style={{ marginLeft: "10px" }}
          />
        </label>

        <label
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Status:
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{ marginLeft: "10px", width: "188px" }}
          >
            <option value="" disabled hidden>
              Please Select
            </option>
            <option value="Available">Available</option>
            <option value="Ordered">Ordered</option>
            <option value="Requested">Requested</option>
          </select>
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
