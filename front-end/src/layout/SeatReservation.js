import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  readReservation,
  listTables,
  seatReservation,
  seatTable,
} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";


function SeatReservation() {
  const [reservation, setReservation] = useState([]);
  const [error, setError] = useState(null);
  const { reservationId } = useParams();
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const [currentTable, setCurrentTable] = useState(null);
  const history = useHistory();

  const {
    reservation_id,
    first_name,
    last_name,
    reservation_date,
    reservation_time,
    people,
  } = reservation;

  useEffect(() => {   
    const abortController = new AbortController();
    setError(null);
    readReservation(reservationId, abortController.signal)
      .then(setReservation)
      .catch(setError);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
  }, [reservationId]);

  const handleChange = (event) => {
    setCurrentTable(event.target.value);
  };

  function submitHandler(e) {
    e.preventDefault();
    const abortController = new AbortController();
    seatReservation(reservation_id, abortController.signal)
      .then(() =>
        seatTable(currentTable, reservation_id, abortController.signal)
      )
      .then(() => history.push("/dashboard"));
  }

  let practicalDate;
  if (reservation_date) {
    practicalDate = reservation_date.substr(0, 10);
  }

  if (reservation) {
    return (
      <form onSubmit={submitHandler}>
        <ErrorAlert error={error} />
        <ErrorAlert error={tablesError} />
        <h1>Seat Reservation {reservation_id}</h1>
        <h3 className="mb-5">
          {first_name} {last_name}'s Reservation for {people} on {practicalDate}{" "}
          at {reservation_time}
        </h3>
        <div className="dropdown mb-3">
          <h6>Seat at:</h6>

          <select className="form-control" name="table_id" onChange={handleChange}>
            <option>Please select a table</option>
            {tables.map((table) => {
              return (
                <option value={table.table_id} key={table.table_id}>
                  {table.table_name} - {table.capacity}
                </option>
              );
            })}
          </select>
        </div>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => history.goBack()}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-info mx-3">
          Submit
        </button>
      </form>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}

export default SeatReservation;
