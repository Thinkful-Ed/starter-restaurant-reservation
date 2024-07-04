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
    <form onSubmit={submitHandler}>

      <label htmlFor="table_id">Table Number:</label>
      <select name="table_id"
              id="table_id"              
              value={tableId} 
              onChange={changeHandler} 
              required={true}>
        <option value="">Select a table</option>
        {tables.map((table) => (
            <option key={table.table_id} 
                    value={table.table_id}>
            {table.table_name} - {table.capacity}
            </option>))
        }
      </select>

      <div className="mb-3">
        <button type="submit">
            Submit
        </button>
        <button type="button" onClick={cancelHandler}>
             Cancel
        </button>
      </div>

    </form>
  );
}

export default SeatReservationForm;
