import React from "react";
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
  const { reservations, isLoadingReservations, errorReservations } = useReservations(date);
  const { tables, isLoadingTables, errorTables } = useTables();
 
if(isLoadingReservations || isLoadingTables) {
     return <p>...Loading</p>
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
      />
      <ErrorAlert errors={errorReservations} />
      <h2>Reservations</h2>
      <ReservationsTable reservations={reservations}/>
      <ErrorAlert  errors={errorTables} />
      <h2>Tables</h2>
      <TablesTable tables={tables}/>
      
    </main>
  );

}

export default Dashboard;