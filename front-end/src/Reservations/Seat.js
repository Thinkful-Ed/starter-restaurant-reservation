import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { listTables, seatReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function Seat() {
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({table_id: null})

  const { reservation_id } = useParams();

  const history = useHistory();

  function loadTables() {
    const ac = new AbortController();
    listTables(ac.signal).then(setTables).catch(setError);
    return () => ac.abort();
  }

  useEffect(loadTables, []);

  function handleChange({target}) {
      console.log(target.value.capacity)
    setFormData({
        ...formData,
        [target.name]: target.value,
    })
  }

  async function submitHandler(evt) {
      console.log(JSON.stringify(formData));
      const ac = new AbortController();
    evt.preventDefault();
    evt.stopPropagation();
    await seatReservation(reservation_id, formData, ac.signal)
  }

  let tableSelect = tables.map((table) => (
    <option key={table.table_id} value={table}>
      {table.table_name} - {table.capacity}
    </option>
  ));

  return (
    <div>
      <ErrorAlert error={error} />
      <form onSubmit={submitHandler}>
        <label htmlFor="table_id">Please select a table
          <select 
            onChange={handleChange} 
            className="form-select form-select-lg" 
            id="table_id"
            name="table_id"
            value={formData.table_id}
            >
            <option value="">--Select a table--</option>
            {tables.length && tableSelect}
          </select>
        </label>
        <button className="btn btn-secondary" onClick={() => history.goBack()}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Seat;
