import { useHistory } from "react-router";
import { today, previous, next } from "../utils/date-time";
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
  const reservationCards = reservations
    .filter(({ reservation_date }) => reservation_date === date)
    .map(
      ({
        reservation_id,
        first_name,
        last_name,
        mobile_number,
        reservation_date,
        reservation_time,
        people,
      }) => {
        return (
          <div
            className="card border-success mb-3"
            style={{ maxWidth: "40rem" }}
            key={reservation_id}
          >
            <div className="card-header bg-transparent border-success">
              {reservation_date}
            </div>
            <div className="card-body text-success">
              <h5 className="card-title">{reservation_time}</h5>
              <p className="card-text">
                {first_name} {last_name}
              </p>
              <p className="card-text">Number of people: {people}</p>
            </div>
            <div className="card-footer bg-transparent border-success">
              {mobile_number}
            </div>
          </div>
        );
      }
    );

  return (
    <div>
      <div className="mb-3"> {controlButtons()}</div>
      <div className="card-columns">{reservationCards}</div>
    </div>
  );
}

export default ReservationList;
