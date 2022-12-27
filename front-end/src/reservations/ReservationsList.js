import React from "react";
import CreateReservation from "./CreateReservation";
import UpdateReservation from "./UpdateReservation";
import Reservation from "./Reservation";
import { createReservation } from "../utils/api";

import { Route, useHistory,  useRouteMatch } from "react-router-dom";

/**
 * Defines the reservation page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function ReservationsList({reservations}) {
  const history = useHistory();
    const {url} = useRouteMatch();
    
  
    const handleReservationDelete = async (id) => {
        const result = window.confirm("Delete this reservation?");
        if (result) {

            //const abortController = new AbortController();

            //deleteReservation(id, abortController.signal);

            history.push("/dashboard");
        }
    };

    // const handleReservationCreate = async (reservation) => {
       
    //     const result = window.confirm("Create this reservation?");
    //     if (result) {

    //         const abortController = new AbortController();

    //         createReservation(reservation, abortController.signal);

    //         history.push("/dashboard");
    //     }
    // };

    const list = reservations.map((reservation) => {
        return <Reservation key={reservation.reservation_id} reservation={reservation} handleReservationDelete={handleReservationDelete} />
    });

    
  return (
    <main>
     
      <div className="d-md-flex mb-3">      
        <div className="reservation-deck ptr-3 pt-3">{list}</div>
        <Route path={`${url}/reservations/new`}><CreateReservation /></Route>
        <Route path={`${url}/reservations/:reservationId/edit`}><UpdateReservation /></Route>
      </div>
    </main>
  );
}

export default ReservationsList;


