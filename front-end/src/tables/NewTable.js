import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";

function NewTable() {
  const history = useHistory();
  const [form, setForm] = useState({
    table_name: "",
    capacity: "",
  });
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    createTable({ ...form, capacity: Number(form.capacity) })
      .then(history.push("/dashboard"))
      .catch(setErr);
  };

  return (
    <div>
      <form onSubmit={handleSumbit}>
        <label htmlFor="table_name">
          Table Name
          <input
            type="text"
            name="table_name"
            minLength="2"
            value={form.table_name}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="capacity">
          Capacity
          <input
            type="number"
            name="capacity"
            value={form.capacity}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Submit</button>
        <button type="button" onClick={history.goBack}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default NewTable;
