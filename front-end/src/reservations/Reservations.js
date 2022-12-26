import React, {useState, useEffect}  from "react";
import { listReservations } from "../utils/api";

import ReservationsList from "./ReservationsList";
/**
 * Defines the reservation page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Reservations() {
 
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
      const abortController = new AbortController();
  
      listReservations( abortController.signal).then((data) => { setReservations(data); setReservations(data.reservations); });
  
      return () => abortController.abort();
    }, []);
  
  

  return (
    <main>
      <h1>Reservations</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
        <ReservationsList reservations={reservations} />
      </div>
    </main>
  );
}

export default Reservations;
