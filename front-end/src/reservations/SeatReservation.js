import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { readReservation, listTables, seatTable } from "../utils/api";

export default function SeatReservation() {
  const initialFormState = {
    table_id: "",
  };

  const [form, setForm] = useState({ ...initialFormState });
  const [reservation, setReservation] = useState({});
  const [tables, setTables] = useState([]);
  const [seatError, setSeatError] = useState([]);

  const history = useHistory();
  const { reservation_id } = useParams();

  // read reservation from database by reservation_id
  // load all tables from database and store the array of tables that have a free status in state
  useEffect(() => {
    const abortController = new AbortController();

    async function loadData() {
      try {
        const reservationResponse = await readReservation(
          reservation_id,
          abortController.signal
        );
        const tablesResponse = await listTables(abortController.signal);
        const freeTables = tablesResponse.filter((table) => {
          if (!table.reservation_id) {
            return table;
          }
        });
        setReservation(reservationResponse);
        setTables(freeTables);
      } catch (error) {
        setSeatError([error.message]);
      }
    }
    loadData();
    return () => abortController.abort();
  }, [reservation_id]);

  const handleChange = ({ target }) => {
    // verify the party will fit at the selected table
    const selectedTable = tables.find(
      (table) => table.table_id === parseInt(target.value)
    );

    if (!selectedTable) {
      setSeatError(["Please select a table."]);
    }

    if (selectedTable && selectedTable.capacity < reservation.people) {
      setSeatError(["Reservation party size will not fit at selected table."]);
    }

    // set the form state
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  // Sends a put request to the API
  // Put request updates the status of the table to occupied and the status of the reservation to seated
  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    async function seatReservation() {
      try {
        await seatTable(form, reservation_id, abortController.signal);
        history.push("/dashboard");
      } catch (error) {
        setSeatError([...seatError, error.message]);
      }
    }
    seatReservation();
  };

  return (
    <>
      <ErrorAlert error={seatError} />
      <h3>Seat</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="table_id">
            Table Number
            <select
              className="form-control"
              id="table_id"
              name="table_id"
              onChange={handleChange}
              value={form.table_id}
            >
              <option value="">-- Select a Table --</option>
              {tables.map((table) => (
                <option key={table.table_id} value={table.table_id}>
                  {table.table_name} - {table.capacity}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button className="btn btn-dark" type="submit">
          Submit
        </button>
        <button
          className="btn btn-dark ml-3"
          type="button"
          onClick={() => history.goBack()}
        >
          Cancel
        </button>
      </form>
    </>
  );
}