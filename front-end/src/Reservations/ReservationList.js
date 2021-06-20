import { useHistory } from "react-router-dom";
import { today, previous, next } from "../utils/date-time";
import ReservationTable from "./ReservationTable";

function ReservationList({ date, reservations }) {
  const history = useHistory();

  const handleTodaysDate = () => {
    history.push(`dashboard?date=${today()}`);
  };
  const handlePreviousDate = () => {
    history.push(`dashboard?date=${previous(date)}`);
  };
  const handleNextDate = () => {
    history.push(`dashboard?date=${next(date)}`);
  };

  const controlButtons = () => {
    return (
      <div
        className="btn-group btn-group-lg btn-block"
        aria-label="Today next and previous day buttons"
      >
        <button
          type="submit"
          className="btn btn-info"
          onClick={handleTodaysDate}
        >
          Today
        </button>
        <button type="submit" className="btn btn-info" onClick={handleNextDate}>
          Next
        </button>
        <button
          type="submit"
          className="btn btn-info"
          onClick={handlePreviousDate}
        >
          Previous
        </button>
      </div>
    );
  };

  const tableRows = reservations.map((reservation) => {
    return (
      <ReservationTable
        key={reservation.reservation_id}
        reservation={reservation}
      />
    );
  });

  return (
    <div>
      <div className="mb-3">{controlButtons()}</div>
      <table className="table table-hover table-responsive">
        <thead className="thead-light">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">First name</th>
            <th scope="col">Last name</th>
            <th scope="col">Phone</th>
            <th scope="col">Party of</th>
          </tr>
        </thead>
        {reservations.length ? tableRows : `No Reservations for ${date}`}
      </table>
    </div>
  );
}

export default ReservationList;
