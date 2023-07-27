import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import useQuery from "../utils/useQuery";
import { today, previous, next } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsList from "../reservations/ReservationsList";
import TableList from "../tables/TablesList";
import { useHistory } from "react-router-dom";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState([]);
  const [tables, setTables] = useState([]);

  // Stores the query value if there is one present in the url
  const dateQuery = useQuery().get("date");
  const history = useHistory();

  if (dateQuery) {
    date = dateQuery;
  }

  const dateObj = new Date(`${date} PDT`);
  const dateString = dateObj.toDateString();

  // Use effect sends a get request to the database for reservations information
  // Filter the reservation information then store the array in state.
  useEffect(() => {
    const abortController = new AbortController();
    const loadData = async () => {
      try {
        const recallReservations = await listReservations(
          { date },
          abortController.signal
        );
        const rsvps = recallReservations.filter((rsvp) => {
          if (rsvp.status !== "cancelled" || rsvp.status !== "finished") {
            return rsvp;
          }
        });
        setReservations(rsvps);
      } catch (error) {
        setReservations([]);
        setReservationsError([error.message]);
      }
    };

    loadData();
    return () => abortController.abort();
  }, [date]);

  // Sends get request for tables stores information state
  useEffect(() => {
    const abortController = new AbortController();
    const loadData = async () => {
      try {
        const recallTables = await listTables(abortController.signal);
        setTables(recallTables);
      } catch (error) {
        setTables([]);
        setReservationsError([error.message]);
      }
    };
    loadData();
    return () => abortController.abort();
  }, []);

  const listRsvp = reservations.map((reservation) => {
    return (
      <ReservationsList
        key={reservation.reservation_id}
        reservation={reservation}
      />
    );
  });

  return (
    <main>
      <h1 className="text-center">Dashboard</h1>
      <div>
        <div className="text-center">
          <button
            type="button"
            className="btn btn-dark mr-3"
            onClick={() => {
              history.push(`/dashboard?date=${previous(date)}`);
            }}
          >
            Previous
          </button>
          <button
            type="button"
            className="btn btn-light mr-3"
            onClick={() => {
              history.push(`dashboard?date=${today()}`);
            }}
          >
            Today
          </button>
          <button
            type="button"
            className="btn btn-dark mr-3"
            onClick={() => {
              history.push(`dashboard?date=${next(date)}`);
            }}
          >
            Next
          </button>
        </div>
        <div className="d-md-flex justify-content-center pt-4">
          <h5 className="text-center"> Reservations for {dateString}</h5>
        </div>
      </div>
      <ErrorAlert error={reservationsError} />
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-xs-1">{listRsvp}</div>
          <div className="col-lg-6 col-xs-1">
            <h4 className="text-center">Tables</h4>
            <div>
              {tables.map((table, id) => {
                return (
                  <div key={table.table_id}>
                    <TableList
                      setTablesError={setReservationsError}
                      table={table}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;