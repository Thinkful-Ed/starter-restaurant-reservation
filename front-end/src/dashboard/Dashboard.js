import React from "react";

import ErrorAlert from "../layout/ErrorAlert";
import {previous, next} from "../utils/date-time";
import Reservation from "../reservation/Reservation";
import {finishTable} from "../utils/api";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({
  date,
  setDate,
  tables,
  reservations,
  reservationsError,
  tablesError,
  setLoadTrigger,
}) {
  const previousHandler = () => {
    setDate(() => previous(date));
  };
  const nextHandler = () => {
    setDate(() => next(date));
  };

  function finishHandler(table_id) {
    const userConfirmed = window.confirm(
      "Is this table ready to seat new guests?"
    );
    if (userConfirmed) {
      const abortController = new AbortController();
      finishTable(table_id, abortController.signal)
        .then(() => {
          setLoadTrigger((prev) => prev + 1);
        })
        .catch(console.log);
      return () => abortController.abort();
    }
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date {date}</h4>
      </div>
      <h2>Reservations</h2>
      <button onClick={previousHandler}>Previous</button>
      <button onClick={nextHandler}>Next</button>
      <ErrorAlert error={reservationsError} />
      {reservations &&
        reservations.map((r) => (
          <React.Fragment key={r.reservation_id}>
            {r.status === "booked" && (
              <Reservation reservation={r} setLoadTrigger={setLoadTrigger} />
            )}
          </React.Fragment>
        ))}
      <h3>Tables</h3>
      <ErrorAlert error={tablesError} />

      {tables &&
        tables.map((t) => (
          <div key={t.table_name}>
            <div>
              <h6>{t.table_name}</h6>
              <p data-table-id-status={t.table_id}>
                {t.reservation_id ? "occupied" : "free"}
              </p>
            </div>
            {t.reservation_id && (
              <button
                data-table-id-finish={t.table_id}
                onClick={() => finishHandler(t.table_id)}
              >
                Finish
              </button>
            )}
          </div>
        ))}
    </main>
  );
}

export default Dashboard;
