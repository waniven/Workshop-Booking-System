export function PartForm() {
  return (
    <form>
      <label style={{ display: "block", marginTop: "5px" }}>
        Part Number:
        <input type="text" style={{ marginLeft: "10px" }} />
      </label>
      <label style={{ display: "block", marginTop: "5px" }}>
        Manufacturer:
        <input type="text" style={{ marginLeft: "10px" }} />
      </label>
      <label style={{ display: "block", marginTop: "5px" }}>
        status:
        <select defaultValue="" style={{ marginLeft: "10px" }}>
          <option value="" disabled hidden>
            Please Select
          </option>
          <option value="Available">Available</option>
          <option value="Ordered">Ordered</option>
          <option value="Requested">Requested</option>
        </select>
      </label>
    </form>
  );
}
