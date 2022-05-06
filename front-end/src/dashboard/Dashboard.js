import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from "../utils/useQuery";
import { today, next, previous } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const url = "/dashboard";
  const history = useHistory();
  let queryDate = useQuery().get("date");

  if (!queryDate) {
    queryDate = today();
  }

  useEffect(() => {
    async function loadDashboard() {
      const abortController = new AbortController();
      setReservationsError(null);
      try {
        const reservationData = await listReservations(
          { date: queryDate },
          abortController.signal
        );
        if (reservationData.error) {
          throw reservationData.error;
        }
        setReservations(reservationData);

        const tableData = await listTables(abortController.signal);
        if (tableData.error) {
          throw tableData.error;
        }
        console.log(tableData);
        setTables(tableData);
      } catch (err) {
        setReservationsError(err.message);
      }
      return () => abortController.abort();
    }
    return loadDashboard();
  }, [queryDate]);

  const formatedReservations = reservations.map((reservation, index) => {
    return (
      <div key={index}>
        <h3>
          {reservation.first_name} {reservation.last_name}
        </h3>
        <h5>{reservation.reservation_date}</h5>
        <h5>{reservation.reservation_time}</h5>
        <a href={`/reservations/${reservation.reservation_id}/seat`}>
          <button type="button">Seat</button>
        </a>
      </div>
    );
  });

  const formatedTables = tables.map((table) => {
    return (
      <div key={table.table_id}>
        <h3>{table.table_name}</h3>
        <span data-table-id-status={table.table_id} value={table.table_id}>
          {table.reservation_id ? "occupied" : "free"}
        </span>
        {table.reservation_id ? (
          <button data-table-id-finish={table.table_id} type="button">
            Finish
          </button>
        ) : (
          ""
        )}
      </div>
    );
  });

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <div>
        {formatedReservations}
        <ErrorAlert error={reservationsError} />
        <button
          onClick={() => history.push(`${url}?date=${previous(queryDate)}`)}
        >
          Previous Date
        </button>
        <button onClick={() => history.push(`${url}?date=${today()}`)}>
          Current Date
        </button>
        <button onClick={() => history.push(`${url}?date=${next(queryDate)}`)}>
          Next Date
        </button>
      </div>
      <div>{formatedTables}</div>
    </main>
  );
}

export default Dashboard;
