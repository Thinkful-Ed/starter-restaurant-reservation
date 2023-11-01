import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function NewTable() {
  const history = useHistory();
  const [tableName, setTableName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const newTable = {
      table_name: tableName,
      capacity: Number(capacity),
    };

    try {
      await createTable(newTable);
    } catch (error) {
      setError(error);
      return;
    }
    history.push("/dashboard");
  }

  return (
    <main>
      <h1>Add a new Table</h1>
      <form>
        <div className="form-group">
          <label className="table_name">Table Name</label>
          <input
            name="table_name"
            id="table_name"
            type="text"
            value={tableName}
            onChange={(event) => setTableName(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="capacity">Capacity</label>
          <input
            name="capacity"
            id="capacity"
            type="number"
            value={capacity}
            onChange={(event) => setCapacity(event.target.valueAsNumber)}
          />
        </div>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => history.goBack()}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
      <ErrorAlert error={error} />
    </main>
  );
}

export default NewTable;
