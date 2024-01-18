import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { listTables, updateTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

export default function Seat() {
  const history = useHistory();
  const { reservation_id } = useParams();

  const [tables, setTables] = useState([]);
  const [tableId, setTableId] = useState("");
  const [formErrors, setFormErrors] = useState([]);

  useEffect(loadTables, []);

  function loadTables() {
    const abortController = new AbortController();
    listTables(abortController.signal).then(setTables).catch(console.log);
    return () => abortController.abort();
  }

  const handleChange = ({ target }) => {
    setTableId(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    setFormErrors([]);

    const errors = [];

    setFormErrors(errors);

    updateTable(reservation_id, tableId, abortController.signal)
      .then((_) => {
        history.push(`/dashboard`);
      })
      .catch((e) => console.log(e));

    return () => abortController.abort();
  };

  let displayErrors = formErrors.map((error, index) => (
    <ErrorAlert key={index} error={error} />
  ));

  const tableList = tables.map((table) => (
    <option key={table.table_id} value={table.table_id}>
      {table.table_name} - {table.capacity}
    </option>
  ));

  return (
    <>
      <div>
        <h1>Select A Table</h1>
      </div>
      {formErrors.length > 0 && displayErrors} {/* Display form errors */}
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="table">Table Name:</label>
          <select
            required
            onChange={handleChange}
            value={tableId}
            name="table_id"
          >
            <option value="">-- Choose Table --</option>
            {tableList} {/* Render table options */}
          </select>
          <button type="submit">Submit</button>
          <button onClick={history.goBack} type="button">
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}
