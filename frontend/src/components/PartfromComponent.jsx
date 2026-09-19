import { useState } from "react";
import { validateString, validateStockQuantity } from "../utils/validatorUtil";

export function PartForm() {
  const [partName, setPartName] = useState("");
  const [partNumber, setPartNumber] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !partName.trim() ||
      !partNumber.trim() ||
      !manufacturer.trim() ||
      !stockQuantity
    ) {
      alert("All fields are required. Please fill out every item.");
      return;
    }

    if (!validateString(partNumber)) {
      alert("Invalid Part Number. Use only letters, numbers, and spaces.");
      return;
    }

    if (!validateString(manufacturer)) {
      alert("Invalid manufacturer. Use only letters, numbers, and spaces.");
      return;
    }

    if (!validateStockQuantity(stockQuantity)) {
      alert("Stock Quantity cannot be a negative number.");
      return;
    }

    const formData = {
      partName: partName.trim(),
      partNumber: partNumber.trim(),
      manufacturer: manufacturer.trim(),
      stockQuantity: Number(stockQuantity.trim()),
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

        setPartName("");
        setPartNumber("");
        setManufacturer("");
        setStockQuantity("");
      } else {
        const errorBody = await response.json().catch(() => ({}));
        alert(`Server error: ${response.status} ${JSON.stringify(errorBody)}`);
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
          Part Name:
          <input
            type="text"
            value={partName}
            onChange={(e) => setPartName(e.target.value)}
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
          Stock Quantity:
          <input
            type="number"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
            style={{ marginLeft: "10px" }}
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
