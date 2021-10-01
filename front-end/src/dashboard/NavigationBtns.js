import { useHistory } from "react-router-dom";
import { previous, today, next } from "../utils/date-time"

function NavigationBtns({date}) {
const history = useHistory();

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
  <h2>Reservations for {date}</h2>
  <br/>
    <div className="d-flex justify-content-between ">
      <button className= "btn btn-secondary" type="button" onClick={prevDayHandler}>
          Prev
      </button>
      <button className= "btn btn-primary" type="button" onClick={currentDayHandler}>
          Today
      </button>
      <button className= "btn btn-secondary" type="button" onClick={nextDayHandler}>
          Next
      </button>
      </div>
      <br/>
    </>
  );
}

export default NavigationBtns;
