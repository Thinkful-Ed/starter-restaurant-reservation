import React from "react";
import { useHistory } from "react-router-dom";

function SeatReservationForm({ tables, tableId, setTableId, submitHandler }) {
  
  const history = useHistory();
 
  function cancelHandler() {
    history.goBack();
  }

  const changeHandler = ({ target }) => {
    setTableId(target.value);
  };

  return (
    <form onSubmit={submitHandler} className="form-inline">

      <label htmlFor="table_id">Table Number:</label>
      <select name="table_id"
              id="table_id"
              className="form-control"
              value={tableId} 
              onChange={changeHandler} 
              required={true}>
        <option value="">Select a table</option>
        {tables.map((table) => (
            <option key={table.table_id} 
                    value={table.table_id}>
            {table.table_name} - Capacity: {table.capacity}
            </option>))
        }
      </select>

      <div className="form-group mt-2">
        <button type="submit" className="btn btn-primary">
            Submit
        </button>
        <button type="button" className="btn btn-secondary ml-2" onClick={cancelHandler}>
             Cancel
        </button>
      </div>

    </form>
  );
}

export default SeatReservationForm;
