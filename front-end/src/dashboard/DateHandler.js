import { useHistory } from "react-router-dom";
import dayjs from "dayjs";

function DateHandler({ date }) {
  const history = useHistory();

  const format = "YYYY-MM-DD";
  const parseDate = (dateString) => dayjs(dateString, format);

  const getPrev = (date) => parseDate(date).subtract(1, "d").format(format);
  const getNext = (date) => parseDate(date).add(1, "d").format(format);

  const prevHandler = () => history.push(`/dashboard?date=${getPrev(date)}`);
  const todayHandler = () => history.push(`/dashboard`);
  const nextHandler = () => history.push(`/dashboard?date=${getNext(date)}`);

  return (
    <div style={{ display: "flex" }}>
      <button onClick={prevHandler}>Previous</button>
      <button onClick={todayHandler}>Today</button>
      <button onClick={nextHandler}>Next</button>
    </div>
  );
}

export default DateHandler;
