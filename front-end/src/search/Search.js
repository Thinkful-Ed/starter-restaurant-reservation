import { useState } from "react";
import { listReservations } from "../utils/api";
import ReservationCard from "../common-components/ReservationCard";
import ErrorAlert from "../layout/ErrorAlert";

function Search() {
  const [number, setNumber] = useState("");
  const [reservations, setReservations] = useState([]);
  const [err, setErr] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();

    setErr(null);
    listReservations({ mobile_number: number })
      .then((res) => {
        if (!res.length) setErr({ message: "No reservations found" });
        return res;
      })
      .then(setReservations)
      .catch(setErr);
  };

  const changeHandler = (e) => {
    setNumber(e.target.value);
  };

  return (
    <>
      <div>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            name="mobile_number"
            onChange={changeHandler}
            value={number}
            placeholder="Enter a customer's phone number"
          />
          <button type="submit">Find</button>
        </form>
      </div>
      <ErrorAlert error={err} />
      <div>
        {reservations.map((reservation, idx) => (
          <ReservationCard key={idx} reservation={reservation} />
        ))}
      </div>
    </>
  );
}

export default Search;
