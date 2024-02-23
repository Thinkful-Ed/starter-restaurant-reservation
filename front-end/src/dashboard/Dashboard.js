import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { listReservations, listTables } from "../utils/api"; // Import listTables
import ErrorAlert from "../layout/ErrorAlert";
import { today } from "../utils/date-time";

function Dashboard() {
    const [reservations, setReservations] = useState([]);
    const [tables, setTables] = useState([]); // State to store tables
    const [error, setError] = useState(null);
    const history = useHistory();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const date = query.get("date") || today();

    useEffect(() => {
        const abortController = new AbortController();
        setError(null); // Reset error state

        async function fetchData() {
            try {
                const reservations = await listReservations({ date }, abortController.signal);
                setReservations(reservations.sort((a, b) => a.reservation_time.localeCompare(b.reservation_time)));

                const tables = await listTables(abortController.signal); // Fetch tables
                setTables(tables);
            } catch (error) {
                setError(error);
            }
        }

        fetchData();

        return () => abortController.abort();
    }, [date]);

    const navigateTo = (newDate) => {
        history.push(`/dashboard?date=${newDate}`);
    };

    const handleNextDay = () => {
        const currentDate = new Date(date);
        currentDate.setDate(currentDate.getDate() + 1);
        navigateTo(currentDate.toISOString().slice(0, 10));
    };

    const handlePreviousDay = () => {
        const currentDate = new Date(date);
        currentDate.setDate(currentDate.getDate() - 1);
        navigateTo(currentDate.toISOString().slice(0, 10));
    };

    const handleToday = () => {
        navigateTo(today());
    };

    return (
      <main>
          <h1>Dashboard</h1>
          <div className="d-md-flex mb-3">
              <h4 className="mb-0">Reservations for {date}</h4>
          </div>
          <ErrorAlert error={error} />
          {reservations.map((reservation, index) => (
              <div key={index} className="reservation-card">
                  <p>First Name: {reservation.first_name}</p>
                  <p>Last Name: {reservation.last_name}</p>
                  <p>Mobile Number: {reservation.mobile_number}</p>
                  <p>Date of Reservation: {reservation.reservation_date}</p>
                  <p>Time of Reservation: {reservation.reservation_time}</p>
                  <p>Number of People: {reservation.people}</p>
                  <a href={`/reservations/${reservation.reservation_id}/seat`} className="btn btn-primary">Seat</a>
              </div>
          ))}
          <h2>Tables</h2>
          {tables.map((table, index) => (
              <div key={index} className="table-card">
                  <p>Table Name: {table.table_name}</p>
                  <p>Capacity: {table.capacity}</p>
                  <p data-table-id-status={table.table_id}>{table.reservation_id ? "Occupied" : "Free"}</p>
              </div>
          ))}
          <div className="date-navigation">
              <button onClick={handlePreviousDay} className="btn btn-secondary">Previous</button>
              <button onClick={handleToday} className="btn btn-primary">Today</button>
              <button onClick={handleNextDay} className="btn btn-secondary">Next</button>
          </div>
      </main>
  );
}

export default Dashboard;
