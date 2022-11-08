import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationCard from "../reservations/ReservationCard";
import TablesInfo from "../tables/TablesInfo";
import "./dashboard.css";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ todaysDate }) {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const [tables, setTables] = useState([]);

  useEffect(loadDashboard, [todaysDate]);

  const { search } = useLocation();
  const selectedDate = search.replace("?date=", "");
  todaysDate = selectedDate ? selectedDate : todaysDate;

  const reservationByDate = reservations.filter(
    (res) => res.reservation_date === todaysDate
  );

  function loadDashboard() {
    const abortController = new AbortController();
    setError(null);
    async function loadReservations() {
      try {
        setReservations(await listReservations(abortController.signal));
        setError(null);
      } catch (error) {
        setError(error);
      }
    }

    async function loadTables() {
      try {
        setTables(await listTables(abortController.signal));
        setError(null);
      } catch (error) {
        setError(error);
      }
    }
    loadReservations();
    loadTables();
    return () => abortController.abort();
  }

  // async function loadDashboard() {
  //   try {
  //     const abortController = new AbortController();
  //     setError(null);
  //     setReservations(await listReservations(abortController.signal))
  //     setTables(await listTables(abortController.signal))

  //   return () => abortController.abort();
  //   } catch (error) {
  //     setError(error)
  //     console.log(error)
  //   }
  // }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="reservations-container">
        <h4>Reservations List:</h4>
        <ErrorAlert error={error} />

        {reservationByDate.length
          ? reservationByDate.map((reservation) => {
              if (
                reservation.status !== "finished" &&
                reservation.status !== "cancelled"
              ) {
                return (
                  <ReservationCard
                    key={reservation.reservation_id}
                    setError={setError}
                    reservation={reservation}
                    loadReservations={loadDashboard}
                    index={reservation.reservation_id}
                  />
                );
              }
            })
          : reservations.map((reservation) => {
              if (
                reservation.status !== "finished" &&
                reservation.status !== "cancelled"
              ) {
                return (
                  <ReservationCard
                    key={reservation.reservation_id}
                    setError={setError}
                    reservation={reservation}
                    loadReservations={loadDashboard}
                    index={reservation.reservation_id}
                  />
                );
              }
            })}
      </div>

      <div className="tables-container">
        <h4>Tables List:</h4>
        <ErrorAlert error={error} />
        {tables.map((table) => (
          <TablesInfo
            key={table.table_id}
            table={table}
            setError={setError}
            loadDashboard={loadDashboard}
            setReservations={setReservations}
            index={table.table_id}
          />
        ))}
      </div>
    </main>
  );
}

export default Dashboard;
