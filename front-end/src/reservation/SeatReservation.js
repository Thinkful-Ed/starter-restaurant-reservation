import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { listTables, updateSeatReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function SeatReservation() {
  const history = useHistory();
  const params = useParams();
  const [tables, setTables] = useState([]);
  const [tableForm, setTableForm] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    setError(null);
    listTables().then(setTables).catch(setError);
    return () => abortController.abort();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);
    const tableObject = JSON.parse(tableForm);
    updateSeatReservation(tableObject.table_id, params.reservation_id)
      .then((response) => {
        const newTables = tables.map((table) => {
          return table.table_id === response.table_id ? response : table;
        });
        setTables(newTables);
        history.push("/dashboard");
      })
      .catch(setError);
  };

  if (tables) {
    return (
      <div>
        <ErrorAlert error={error} />
        <div>
          <h3>Seat Reservation {params.reservation_id}</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Select Table:</label>
          <select
            name="table_id"
            onChange={(event) => setTableForm(event.target.value)}
          >
            <option value="">Table Name: Capacity</option>
            {tables.map((table) => (
              <option
                key={table.table_id}
                value={JSON.stringify(table)}
                required={true}
              >
                {table.table_name} - {table.capacity}
              </option>
            ))}
          </select>
          <div>
            <button className="btn btn-primary" type="submit">
              Submit:
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => history.goBack()}
            >
              Cancel:
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <h3>There are no tables available.</h3>
      </div>
    );
  }
}

export default SeatReservation;
