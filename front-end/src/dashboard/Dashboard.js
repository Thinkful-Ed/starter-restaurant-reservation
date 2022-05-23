import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from "../utils/useQuery";
import { today } from "../utils/date-time";
import ReservationList from "../Reservations/ReservationList";
import TableList from "../Table/TableList";
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
  const [error, setError] = useState(null);
  let queryDate = useQuery().get("date");

  if (!queryDate) {
    queryDate = today();
  }

  useEffect(() => {
    async function loadDashboard() {
      const abortController = new AbortController();
      setError(null);
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
        setTables(tableData);
      } catch (err) {
        setError(err.message);
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
      <div className="m-auto">
        <div>
          <ErrorAlert error={error} />
          <DateNav queryDate={queryDate} />
        </div>
        <div className="row d-flex m-auto text-center font-weight-bolder">
          <div className="col w-auto flex border border-dark rounded-lg p-0 ">
            <div className="bg-info text-white border-bottom border-dark">
              <h5 className="text-center ">Reservation List</h5>
            </div>
            <ReservationList
              reservationData={reservations}
              setError={setError}
            />
          </div>
          <div className="col  flex border border-dark rounded-lg p-0">
            <div className="w-auto bg-info text-white border-bottom border-dark">
              <h5 className="text-center">Table List</h5>
            </div>
            <TableList tableData={tables} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
