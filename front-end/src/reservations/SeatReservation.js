import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { listTables, sitReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function SeatReservation() {
  const [error, setError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tableInfo, setTableInfo] = useState({
    table_id: "",
    reservation_id: "",
  });
  const history = useHistory();
  const { reservation_id } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    listTables(abortController.signal).then(setTables).catch(setError);
    return () => abortController.abort();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    sitReservation(tableInfo.table_id, reservation_id)
      .then(() => history.push("/"))
      .catch(setError);
    return () => abortController.abort();
  };

  const handleChange = ({ target }) => {
    setTableInfo({
      ...tableInfo,
      [target.name]: target.value,
    });
  };

  function handleCancel() {
    history.goBack();
  }

  const tablesMap = tables.map((table) => (
    <option value={table.table_id} key={table.table_id}>
      {table.table_name} - {table.capacity}
    </option>
  ));

  return (
    <>
      <div>
        <h1>Seating Options for Reservation {reservation_id}</h1>
        <ErrorAlert error={error} />
        <form onSubmit={handleSubmit}>
          <h3>Select a table for the party:</h3>
          <select
            id="table_form"
            name="table_id"
            value={tablesMap.table_id}
            onChange={handleChange}
            required
          >
            <option value="">Table Name - Capacity</option>
            {tablesMap}
          </select>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
          <button
            className="btn btn-secondary mx-1"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}

export default SeatReservation;
