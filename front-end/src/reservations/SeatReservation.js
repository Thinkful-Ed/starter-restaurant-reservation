import { useState, useEffect } from "react";
import { listTables, readReservation, seatReservation } from "../utils/api";
import { useHistory, useParams } from "react-router-dom";
import { normalizeISODate } from "../utils/parse-dateTime";
import ErrorAlert from "../layout/ErrorAlert";

function SeatReservation() {
  const [tableId, setTableId] = useState("none");
  const [tables, setTables] = useState([]);
  const [reservation, setReservation] = useState(null);
  const [err, setErr] = useState(null);

  const history = useHistory();
  const { reservationId } = useParams();

  useEffect(loadTables, []);
  useEffect(loadReservation, [reservationId]);

  function loadTables() {
    const abortController = new AbortController();
    setErr(null);
    listTables(abortController.signal).then(setTables).catch(setErr);
    return () => abortController.abort();
  }

  function loadReservation() {
    const abortController = new AbortController();
    readReservation(Number(reservationId), abortController.signal)
      .then(setReservation)
      .catch(setErr);
    return () => abortController.abort();
  }

  function validateTable() {
    const tableToSeat = tables.find(
      (table) => table.table_id === Number(tableId)
    );

    let err = null;

    if (!tableToSeat) err = "Please select a table to seat.";
    if (tableToSeat.reservation_id !== null) err = "Table is already occupied.";
    if (tableToSeat.capacity < reservation.people)
      err = `Cannot sit party of ${reservation.people} at table of ${tableToSeat.capacity}.`;

    if (err) {
      setErr({ message: err });
      return false;
    }

    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validateTable()) return;

    seatReservation(Number(reservationId), Number(tableId))
      .then(() =>
        history.push(
          `/dashboard?date=${normalizeISODate(reservation.reservation_date)}`
        )
      )
      .catch(setErr);
  }

  return (
    <div>
      {tables.length && reservation && (
        <>
          <ErrorAlert error={err} />
          <form onSubmit={handleSubmit}>
            <select
              name="table_id"
              onChange={(e) => setTableId(e.target.value)}
              value={tableId}
              required
            >
              <option value="none" disabled hidden>
                Select a Table
              </option>
              {tables.map((table) => (
                <option value={table.table_id} key={table.table_id}>
                  {table.table_name} - {table.capacity}
                </option>
              ))}
            </select>
            <br />
            <button type="submit">Submit</button>
            <button type="button" onClick={history.goBack}>
              Cancel
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default SeatReservation;
