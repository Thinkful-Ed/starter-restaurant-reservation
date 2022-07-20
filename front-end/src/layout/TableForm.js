import React from "react";
import { useHistory } from "react-router-dom";

function TableForm({handleSubmit, handleChange, formData}) {
  const history = useHistory();

  return (
    <div>
      <h1 className="mb-2">Create a Table</h1>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label for="table_name">Table Name</label>
          <input
            type="text"
            class="form-control"
            id="table_name"
            placeholder="Table Name"
            name="table_name"
            onChange={handleChange}
            value={formData.table_name}
            required
          />
        </div>
        <div class="form-group">
          <label for="capacity">Capacity</label>
          <input
            type="number"
            class="form-control"
            id="capacity"
            placeholder="Capacity"
            name="capacity"
            onChange={handleChange}
            value={formData.capacity}
            required
          />
        </div>

        <button
          type="cancel"
          class="btn btn-secondary"
          onClick={() => history.push("/")}
        >
          Cancel
        </button>
        <button type="submit" class="btn btn-info mx-3">
          Submit
        </button>
      </form>
    </div>
  );
}

export default TableForm;
