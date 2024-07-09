import React, { useState, useEffect } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { today, previous, next } from "../utils/date-time";
import DateButtons from "./DateButtons";
import ReservationsTable from "../tables/ReservationsTable";
import TablesTable from "../tables/TablesTable";
import useReservations from "../hooks/useReservations";
import useTables from "../hooks/useTables";

/**
 * 
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Dashboard({ date }) {
  const [errorMessages, setErrorMessages] = useState([]);


  const { reservations, setReservations, isLoadingReservations, reservationsError } = useReservations(date);
  const { tables, setTables, isLoadingTables, tablesError } = useTables();

  // Combine hook errors with existing errors, update errors whenever there are changes in reservationsError or tablesError
  useEffect(() => {
    const newErrors = [];
    if (reservationsError) {
        newErrors.push(...reservationsError); // assuming reservationsError might be an array
    }
    if (tablesError) {
        newErrors.push(...tablesError); // assuming tablesError might be an array
    }
    if (newErrors.length > 0) {
        setErrorMessages(previousErrorMessages => [...previousErrorMessages, ...newErrors]);
    }
  }, [reservationsError, tablesError]);

  if (isLoadingReservations || isLoadingTables) {
      return <p>Loading...</p>;
  }

  return (
      <main>
          <h1>Dashboard</h1>
          <div className="d-md-flex mb-3">
              <h4 className="mb-0">Reservations for date {date}</h4>
          </div>
          <DateButtons
              previous={`/dashboard?date=${previous(date)}`}
              today={`/dashboard?date=${today()}`}
              next={`/dashboard?date=${next(date)}`}
              date={date}
          />
          <ErrorAlert errors={errorMessages} />
          <h2>Reservations</h2>
          <ReservationsTable reservations={reservations} setReservations={setReservations} setErrorMessages={setErrorMessages} />
          <h2>Tables</h2>
          <TablesTable tables={tables} setTables={setTables} setErrorMessages={setErrorMessages} />
      </main>
  );
}

export default Dashboard;