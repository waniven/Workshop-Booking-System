import { useState, useEffect } from "react";

export function DBDropdown({
  label,
  endpoint,
  value,
  onChange,
  renderOptionText,
  refreshTrigger,
}) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(endpoint);
        if (response.ok) {
          const data = await response.json();
          setOptions(data);
        }
      } catch (error) {
        alert(`Error loading dropdown for ${label}:`, error);
      }
    };

    fetchOptions();
  }, [endpoint, label, refreshTrigger]);

  return (
    <label
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {label}:
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ marginLeft: "10px", width: "210px" }}
      >
        <option value="" disabled hidden>
          Select a {label}
        </option>
        {options.map((item) => (
          <option key={item._id} value={item._id}>
            {renderOptionText(item)}
          </option>
        ))}
      </select>
    </label>
  );
}
