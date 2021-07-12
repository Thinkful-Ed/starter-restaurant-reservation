import { listReservations } from "../utils/api";
import { useState, useEffect } from "react";
import ReservationCard from "../common-components/ReservationCard";
import ErrorAlert from "../layout/ErrorAlert";
import DateHandler from "./DateHandler";

function Reservations({ date, updateAll }) {
  const [reservations, setReservations] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(loadReservations, [date, updateAll]);

  function loadReservations() {
    const abortController = new AbortController();
    setErr(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setErr);
    return () => abortController.abort();
  }

  return (
    <div>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for: {date}</h4>
      </div>
      <DateHandler date={date} />
      <ErrorAlert error={err} />
      {reservations.map(
        (reservation, idx) =>
          reservation.status !== "finished" && (
            <ReservationCard key={idx} reservation={reservation} />
          )
      )}
    </div>
  );
}

export default Reservations;
