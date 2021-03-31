import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { listTables, readReservation, seatReservation } from "../utils/api";

function ReservationSeat() {
  const history = useHistory();
  const { reservation_id } = useParams();

  const [reservation, setReservation] = useState({});
  const [reservationError, setReservationError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tableId, setTableId] = useState("");

  useEffect(() => {
    listTables().then(setTables);
  }, []);

  useEffect(() => {
      setReservationError(null);
      readReservation(reservation_id)
      .then(setReservation)
      .catch(setReservationError);
   }, [reservation_id]);

  function changeHandler({ target: { value } }) {
    setTableId(value);
  }

  function submitHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    seatReservation(reservation.reservation_id, tableId)
      .then(() => history.push("/dashboard"));
  }

  return (
    <main>
      <h1>Seat</h1>
      <form onSubmit={submitHandler}>
        <fieldset>
          <div className="row">
            <div className="col">
              <select id="table_id" name="table_id" value={tableId} required={true} onChange={changeHandler}>
                <option value="">Table</option>
                {tables.map((table) => (
                  <option key={table.table_id} value={table.table_id}>
                    {table.table_name} - {table.capacity}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button type="button" className="btn" onClick={() => history.goBack()}>Cancel</button>
          <button type="submit" className="btn">Submit</button>
        </fieldset>
      </form>
    </main>
  );
}

export default ReservationSeat;
