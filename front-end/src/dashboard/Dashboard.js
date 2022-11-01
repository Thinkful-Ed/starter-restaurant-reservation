import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationCard from "../reservations/ReservationCard";
import TableHeader from "./TableHeader";
import TablesInfo from "../tables/TablesInfo";

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
    Promise.all([
      listReservations({ todaysDate }, abortController.signal)
        .then(setReservations)
        .catch(setError),
      listTables(abortController.signal)
        .then(setTables)
        .catch(setError),
    ]);

    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div>
        <h4>Reservations for date:</h4>
        <ErrorAlert error={error} />
        <table>
          <TableHeader
            headers={[
              "id",
              "first name",
              "last name",
              "party size",
              "phone number",
              "date",
              "time",
              "status",
            ]}
          />
          <tbody>
            {reservationByDate.length
              ? reservationByDate.map((reservation) => {
                  return (
                    <ReservationCard
                      reservation={reservation}
                      key={reservation.reservation_id}
                    />
                  );
                })
              : reservations.map((reservation) => {
                  return (
                    <ReservationCard
                      reservation={reservation}
                      key={reservation.reservation_id}
                    />
                  );
                })}
          </tbody>
        </table>
      </div>

      <div>
        <h4>Tables List:</h4>
        <ErrorAlert error={error}/>
        <table>
          <TableHeader headers={[
            "id",
            "table name",
            "capacity",
            "reservation id",
            "table status"
          ]}/>
          <tbody>
            {tables.map((table)=> <TablesInfo table={table} key={table.table_id} />)}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Dashboard;
