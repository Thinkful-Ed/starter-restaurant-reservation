import { useHistory } from "react-router-dom";
import { useState } from "react";
import { createNewTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

// const MOCK_FORM_DATA = {
//   table_name: "James",
//   capacity: "2",
// };

const INITIAL_FORM_DATA = {
  table_name: "",
  capacity: "",
};

function NewTables() {
  const history = useHistory();
  const [reservationsError, setReservationsError] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const handleChange = (event) => {
    const { target } = event;
    setFormData({ ...formData, [target.id]: target.value });
  };

  async function onSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      await createNewTable(
        {
          ...formData,
          capacity: parseInt(formData.capacity),
        },
        abortController.signal
      );
      history.push(`/dashboard`);
    } catch (error) {
      setReservationsError(error);
    }
  }

  function handleCancel() {
    history.goBack();
  }

  return (
    <div>
      <h1>NEW TABLE</h1>
      <ErrorAlert error={reservationsError} />
      <form onSubmit={onSubmit}>
        <label for="table_name">Table Name</label>
        <input
          name="table_name"
          id="table_name"
          type="text"
          value={formData.table_name}
          onChange={handleChange}></input>

        <label for="capacity">Capacity</label>
        <input
          name="capacity"
          id="capacity"
          type="number"
          value={formData.capacity}
          onChange={handleChange}></input>

        <button type="submit">Submit</button>
        <button onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default NewTables;
