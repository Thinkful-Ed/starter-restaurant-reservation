import { useState } from "react";
import { useHistory } from "react-router-dom";

function NewTable() {
  const history = useHistory();
  const [form, setForm] = useState({
    table_name: "",
    capacity: "",
  });
  console.log(history);

  const handleChange = (e) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSumbit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSumbit}>
        <label for="table_name">
          Table Name
          <input
            type="text"
            name="table_name"
            minlength="2"
            value={form.table_name}
            onChange={handleChange}
          />
        </label>
        <label for="capacity">
          Capacity
          <input
            type="number"
            name="capacity"
            value={form.capacity}
            onChange={handleChange}
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
