import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { listTables, seatCustomers } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function SeatReservation() {
  const [formData, setFormData] = useState("");
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);
  const { reservation_id } = useParams();
  const history = useHistory();

  console.log(reservation_id)

  console.log(tables)


  useEffect(() => {
    const abortController = new AbortController();
    setError(null);

    listTables(abortController.signal).then(setTables).catch(setError);

    return () => abortController.abort();
  }, [reservation_id]);

  async function submitHandler(e) {
    e.preventDefault();
    setError(null);
    const abortController = new AbortController();
    console.log("formData: ", formData)
    const tableId = Number(formData.table_id);
    const reservationId = Number(reservation_id);
    console.log("table_id:", tableId)
    console.log("reservationId: ", reservation_id)

    try {
      await seatCustomers(tableId, reservationId, abortController.signal);
      history.push("/");
    } catch (error) {
      if (error.name !== "AbortError") {
        setError(error);
      }
    }
  }

  const handleChange = (event) => {
    console.log("formData2: ", formData)
    setFormData((formData) => ({
      ...formData,
      [event.target.name]: event.target.value,
    }));
  };

  function handleCancel() {
    history.goBack();
  }

  return (
    <div className="container">
      <div className="row">
        <ErrorAlert error={error} />
      </div>
      <div className="my-3">
        <form onSubmit={submitHandler} className="bg-light p-3 rounded">
          <h2 className="mb-4">
            Seat Reservation - Reservation #{reservation_id}
          </h2>
          <div className="form-group">
            <label htmlFor="table_id">Select a Table:</label>
            <select onChange={handleChange} value={formData.table_Id} name="table_id" className="ml-2">
            <option value="">Choose a table</option>
              {
                tables.map((table) => (
                  <option
                    key={table.table_id}
                    
                    value={table.table_id}

                  >
                    {table.table_name} - {table.capacity}
                  </option>
                ))
              }
            </select>
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <button type="submit" className="btn btn-primary btn-block">
                Submit
              </button>
            </div>
            <div className="col-md-6">
              <button
                type="button"
                className="btn btn-danger btn-block"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SeatReservation;
