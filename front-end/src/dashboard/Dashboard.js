import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Reservation from "../dashboard/Reservation";
import Table from "../dashboard/Table";

function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]); //Stores the tables
  const [tablesError, setTablesError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables(abortController.signal)
      .then(setTables) //update tables state
      .catch(setTablesError);
    return () => abortController.abort();
  }

  const reservationList = reservations.map((reservation) => (
    <Reservation key={reservation.reservation_id} reservation={reservation} />
  ));

  const reservationContent = reservations.length ? (
    <div>
      <div>
        <div>{reservationList}</div>
      </div>
    </div>
  ) : (
    <h3>No reservations found</h3>
  );

  const tableList = tables.map((table) => (
    <Table key={table.table_id} table={table} />
  ));

  const tableContent = tables.length ? (
    <div>
      <h4>Tables:</h4>
      {tableList} {/* renders the list of Table components */}
    </div>
  ) : (
    <h3>No Tables Found</h3>
  );

  return (
    <main>
      <h1>Dashboard</h1>
      <div>
        <h4>Reservations for date</h4>
      </div>
      <div>
        {reservationContent}
        {tableContent}
      </div>

      <ErrorAlert error={reservationsError} />
    </main>
  );
}

export default Dashboard;
