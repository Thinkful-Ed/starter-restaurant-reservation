import { useHistory } from "react-router-dom";
import { today, previous, next } from "../utils/date-time";
import ReservationCards from "./ReservationCards";

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

  const active = reservations.map((reservation) => {
    return (
      <ReservationCards
        key={reservation.reservation_id}
        reservation={reservation}
      />
    );
  });
  return (
    <div>
      <div className="mb-3">{controlButtons()}</div>
      <div>{active}</div>
    </div>
  );
}

export default ReservationList;
