import React, { useEffect, useState } from "react";
import {
  useParams,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import { listAvailableTables, updateTable, readReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function SeatReservation() {
  const { reservationId } = useParams();
  const [tables, setTables] = useState([]);
  const [reservation, setReservation] = useState({});
  const [tablesError, setTablesError] = useState(null);
  const [formData, setFormData] = useState({
    table_id: "",
    reservation_id: reservationId,
  });

  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    setTablesError(null);

    listAvailableTables(abortController.signal)
      .then((availableTables) => {
        setTables(availableTables);
      })
      .catch(setTablesError);

    readReservation(reservationId)
      .then((reservation) => {
        setReservation(reservation)
        console.log(reservation)
      })

    return () => abortController.abort();
  }, [reservationId]);

  const handleChange = ({ target }) => {
    setFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        [target.name]: target.value,
      };
      console.log(updatedFormData);
      return updatedFormData;
    });
  };

  function handleCancel() {
    history.goBack();
  }

  function handleSubmit(event) {
    event.preventDefault();
  
    const selectedTable = tables.find((table) => table.table_id === Number(formData.table_id));
  
    if (selectedTable && selectedTable.capacity >= reservation.people) {
      const updatedTable = {
        table_id: Number(selectedTable.table_id),
        reservation_id: Number(formData.reservation_id),
      };
  
      updateTable(updatedTable)
        .then(() => {
          // Handle success if needed
          console.log("Table updated successfully:", updatedTable);
          history.push("/dashboard");
        })
        .catch((error) => {
          // Handle errors
          console.error("Error updating table:", error);
          // Optionally, display an error message to the user
        });
    } else {
      // Handle the case where an invalid table is selected
      console.error("Invalid table selected or insufficient capacity.");
      // Optionally, display an error message to the user
    }
  }

  return (
    <div>
      seat reservation {reservationId}
      {tables && <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="table_id">
            Table Number:
          </label>
          <select
            id="table_id"
            name="table_id"
            className="form-control"
            onChange={handleChange}
            required
          >
            <option>- Select a Table -</option>
              {tables.map((table) => (
                <option key={table.table_id} value={table.table_id} disabled={table.capacity<reservation.people}>
                  {table.table_name} - {table.capacity}
                </option>
              ))}
          </select>
        </div>

        <div>
          <button onClick={handleCancel} className="btn btn-secondary m-1">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary m-1"
          >
            Submit
          </button>
        </div>
      </form>
      }
      <ErrorAlert error={tablesError} />
      
    </div>
  );
}

export default SeatReservation;
