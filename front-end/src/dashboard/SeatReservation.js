import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import DisplayReservations from "./DisplayReservation";
import DisplayTable from "./DisplayTable";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

function SeatReservation() {
  const [tables, setTables] = useState([]);
  const [reservation, setReservation] = useState({});
  const [tableId, setTableId] = useState(0);
  const { reservation_id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadTables() {
      const abortController = new AbortController();
      const signal = abortController.signal;
      try {
        const response = await axios.get(`${API_BASE_URL}/tables`, { signal });
        setTables(response.data.data);
      } catch (error) {
        console.log(error, "error loading tables");
      }
    }
    loadTables();
  }, []);

  useEffect(() => {
    async function loadReservation() {
      const abortController = new AbortController();
      const signal = abortController.signal;
      try {
        const response = await axios.get(
          `${API_BASE_URL}/reservations/${reservation_id}`,
          {
            signal,
          }
        );

        setReservation(response.data.data);
      } catch (error) {
        console.log(error, "error loading reservation");
      }
    }
    loadReservation();
  }, [reservation_id]);

  function handleChange({ target }) {
    setTableId(target.value);
  }

  function handleSubmit(table_id) {
    console.log({ table_id });
    async function updateTable(table_id) {
      const abortController = new AbortController();
      const signal = abortController.signal;
      try {
        const response = await axios.put(
          `${API_BASE_URL}/tables/${table_id}/seat`,
          { data: { reservation_id: reservation_id } },
          { signal }
        );
        // i think that this section should be redundant after
        // implementing knex transaction in the backend
        // tables put shoould also updaate reservation table
        const reservationUpdate = await axios.put(
          `${API_BASE_URL}/reservations/${reservation_id}/status`,
          { data: { status: "seated" } },
          { signal }
        );
        console.log({ reservationUpdate });
        setTableId(response.data.data.table_id);
        history.push(`/dashboard`);
      } catch (error) {
        console.log(error, "error updating table");
      }
    }
    updateTable(table_id);
  }

  function handleCancel() {
    history.goBack();
  }

  return (
    <div>
      <h1>Seat Reservation</h1>
      <DisplayReservations reservation={reservation} />
      <select name="table_id" id="table_id" onChange={handleChange}>
        <option value="">Select a table</option>
        {tables.map((table) => (
          <option key={table.table_id} value={table.table_id}>
            {table.table_name} - {table.capacity}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="btn btn-primary"
        onClick={() => handleSubmit(tableId)}
      >
        Submit
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={handleCancel}
      >
        Cancel
      </button>
      <h2>Tables</h2>
      {tables.map((table) => (
        <DisplayTable key={table.table_id} table={table} />
      ))}
    </div>
  );
}

export default SeatReservation;
