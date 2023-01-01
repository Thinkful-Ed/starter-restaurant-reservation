import React from "react";
// import CreateReservation from "./CreateReservation";
// import UpdateReservation from "./UpdateReservation";
import Reservation from "./Reservation";
// import { createReservation } from "../utils/api";
import { useHistory } from "react-router-dom";
// import TableSeating from "../tables/TableSeating";

/**
 * Defines the reservation page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function ReservationsList({reservations}) {
  const history = useHistory();
    // const {url} = useRouteMatch();
    
  
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
    //       console.log("Inside list res:", reservation)
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
      <table className="table bordered table-striped table-hover table-condensed">
        <tbody>
          <tr>
          <td>First Name</td>
          <td>Last Name</td>
          <td>Phone</td>
          <td>Date</td>
          <td>Time</td>
          <td># of People</td>
          <td>Status</td>
          <td className="text-center">Actions:</td>
          </tr>
          {list}
        </tbody>
        </table>   
        {/* <Route path={`${url}/reservations/new`}><CreateReservation handleReservationCreate={handleReservationCreate} /></Route>
        <Route path={`${url}/reservations/:reservationId/edit`}><UpdateReservation /></Route>
        <Route path={`${url}/reservations/:reservationId/seat`}><TableSeating /></Route> */}

      </div>
    </main>
  );
}

export default ReservationsList;


