import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DisplayReservations from "./DisplayReservation";
import DisplayTable from "./DisplayTable";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

function SeatReservation() {
  const [tables, setTables] = useState([]);
  const [reservation, setReservation] = useState({});
  const { reservation_id } = useParams();

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

  function handleSeat(table_id) {}

  return (
    <div>
      <h1>Seat Reservation</h1>
      <DisplayReservations reservation={reservation} />
      <select name="table_id" id="table_id">
        <option value="">Select a table</option>
        {tables.map((table) => (
          <option key={table.table_id} value={table.table_id}>
            {table.table_name} - {table.capacity}
          </option>
        ))}
      </select>
      <h2>Tables</h2>
      {tables.map((table) => (
        <DisplayTable key={table.table_id} table={table} />
      ))}
    </div>
  );
}

export default SeatReservation;
