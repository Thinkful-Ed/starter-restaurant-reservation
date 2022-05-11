import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from "../utils/useQuery";
import { today } from "../utils/date-time";
import ReservationList from "./ReservationList";
import TableList from "./TableList";
import DateNav from "./DateNav";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
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

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <div>
        <ReservationList reservationData={reservations} />
        <ErrorAlert error={reservationsError} />
        <DateNav queryDate={queryDate} />
      </div>
      <div>
        <TableList tableData={tables} />
      </div>
    </main>
  );
}

export default Dashboard;
