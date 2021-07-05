import { Link } from "react-router-dom";


const ReservationsTable = ({reservations}) => {

    // const [reservations, setReservations] = useState([]);
    // const [reservationsError, setReservationsError] = useState(null);
  
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
                <tr key={reservation.reservation_id}>
                <td>{reservation.last_name}</td>
                <td>{reservation.first_name}</td>
                <td>{reservation.mobile_number}</td>
                <td>{reservation.reservation_time}</td>
                <td>{reservation.people}</td>
                <td data-reservation-id-status={reservation.reservation_id}>{reservation.status}</td>
                {reservation.status === "booked" && <td><Link to={`/reservations/${reservation.reservation_id}/seat`} type="button" className="btn btn-success">Seat</Link></td>}
                <td><Link to={`/reservations/${reservation.reservation_id}/edit`} type="button" className="btn btn-alert">Edit</Link></td>
                <td><button type="button" className="btn btn-danger">Cancel</button> </td>
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