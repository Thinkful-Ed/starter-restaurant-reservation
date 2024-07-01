import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { listTables, seatReservation } from "../utils/api";

function SeatReservationForm() {
  const { reservation_id } = useParams();
  const [tables, setTables] = useState([]);
  const [tableId, setTableId] = useState("");
  const history = useHistory();

  useEffect(() => {
    async function loadTables() {
      const tables = await listTables();
      setTables(tables);
    }
    loadTables();
  }, []);

  function cancelHandler() {
    history.goBack();
}


  const handleChange = ({ target }) => {
    setTableId(target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await seatReservation(tableId, reservation_id);
      history.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="table_id">Table Number:</label>
      <select id="table_id" 
            name="table_id" 
           value={tableId} 
        onChange={handleChange} 
        required={true}>
      <option value="">Select a table</option>
        {tables.map((table) => (
          <option key={table.table_id} 
                value={table.table_id}>
          {table.table_name} - {table.capacity}
          </option>
        ))}
      </select>
      <div className="mb-3">
        <button type="submit">Submit
        </button>

        <button type="button" 
             onClick={cancelHandler}>Cancel
        </button>
      </div>
    </form>
  );
}

export default SeatReservationForm;
