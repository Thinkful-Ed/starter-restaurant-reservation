import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import { previous, today, next, formatAsDate } from "../utils/date-time"

function NavigationBtns({date}) {
const history = useHistory();
const { search } = useLocation()

  function prevDayHandler(event) {
    event.preventDefault();
    history.push(`/dashboard?date=${previous(date)}`);
  }

  function nextDayHandler(event) {
    event.preventDefault();
    history.push(`/dashboard?date=${next(date)}`);
  }

  function currentDayHandler(event) {
    event.preventDefault();
    history.push(`/dashboard?date=${today()}`);
  }

  return (
  <>
    <div className="d-flex">
      <button className="button" onClick={prevDayHandler}>
          Prev
      </button>
      <button className="button" onClick={currentDayHandler}>
          Today
      </button>
      <button className="button" onClick={nextDayHandler}>
          Next
      </button>
      </div>
      <h2>Reservations for {date}</h2>
    </>
  );
}

export default NavigationBtns;
