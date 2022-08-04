import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readReservation } from "../utils/api";
import TableNameCapacity from "./TableNameCapacity";
import { seatReservation } from "../utils/api";

export default function TableSeat() {
  const { reservation_id } = useParams();
  const [client, setClient] = useState([]);
  const [formData, setFormData] = useState(null);
  const history = useHistory();

  const changeHandler = (event) => {
    setFormData({ [event.target.name]: event.target.value });
  };

  async function submitHandler(event) {
    event.preventDefault();

    const table_id = formData.table_id;
    await seatReservation(reservation_id, table_id);
    history.push(`/dashboard`);
  }

  useEffect(() => {
    async function getClientReservation() {
      let clientInfo = await readReservation(reservation_id);
      setClient(clientInfo);
    }
    getClientReservation();
  }, [reservation_id]);

  return (
    <>
      <h1>Seat Reservation</h1>
      <h3>
        #
        {`${reservation_id}- ${client.first_name} ${client.last_name} on ${client.reservation_date} at ${client.reservation_time} for ${client.people}`}
      </h3>
      <form onSubmit={submitHandler}>
        <label htmlFor="seat">
          Seat at:
          <select name="table_id" required={true} onChange={changeHandler}>
            <option></option>
            <TableNameCapacity />
          </select>
        </label>
        <div>
          <button type="submit">Submit</button>
          <button type="button" onClick={() => history.goBack()}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
