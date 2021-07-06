import { Link } from "react-router-dom";
import { changeReservationStatus } from "../utils/api";

const ReservationsTable = ({reservations}) => {




  
    // useEffect(loadReservations, [date]);
  
  
    // function loadReservations() {
    //   const abortController = new AbortController();
    //   setReservationsError(null);
    //   listReservations({ date }, abortController.signal)
    //     .then(setReservations)
    //     .catch(setReservationsError);
    //   return () => abortController.abort();
    // }





    function renderTable (reservations) {

      function handleCancel(e) {
        const abortController = new AbortController();
        const result = window.confirm("Do you want to cancel this reservation? This cannot be undone.")
        if (result) {
          changeReservationStatus(e.target.value, abortController.signal)
          window.location.reload();
          return () => abortController.abort();
        }
      }

        return (
          <div className="row g-2">
            <table className="table table-dark">
      <thead>
        <tr>
          <th scope="col">Last Name</th>
          <th scope="col">First Name</th>
          <th scope="col">Mobile Number</th>
          <th scope="col">Time</th>
          <th scope="col">Party Of</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
      {reservations
      .map((reservation) => 
      (
                reservation.status !== "cancelled" && 
                <tr key={reservation.reservation_id}>
                <td>{reservation.last_name}</td>
                <td>{reservation.first_name}</td>
                <td>{reservation.mobile_number}</td>
                <td>{reservation.reservation_time}</td>
                <td>{reservation.people}</td>
                <td data-reservation-id-status={reservation.reservation_id}>{reservation.status}</td>
                {reservation.status === "booked" && <td><Link to={`/reservations/${reservation.reservation_id}/seat`} type="button" className="btn btn-success">Seat</Link></td>}
                <td><Link to={`/reservations/${reservation.reservation_id}/edit`} type="button" className="btn btn-warning">Edit</Link></td>
                <td><button data-reservation-id-cancel={reservation.reservation_id}  value={reservation.reservation_id} type="button" className="btn btn-danger" onClick={handleCancel}>Cancel</button> </td>
              </tr>
        ))}
      </tbody>
    </table>
          </div> 
        )
      }

    return ( 
        <div>
        {renderTable(reservations)}
        </div>
     );
}
 
export default ReservationsTable;