import { unseatTable } from "../utils/api";
import { useHistory } from "react-router-dom";

function Table({ table }) {
  const history = useHistory();
  function clickHandler() {
    if (window.confirm("Is this table ready to seat new guests?")) {
      const abortController = new AbortController();
      unseatTable(table.table_id, abortController.signal)
        .then(() => history.go(0))
        .catch((error) => console.log("error", error));
      return () => abortController.abort();
    }
  }

  return (
    <div class="card">
      <h5 class="card-header">Table Name: {table.table_name}</h5>
      <div class="card-body">
        <h5 class="card-title">Capacity: {table.capacity}</h5>
        {table.reservation_id ? (
          <>
            <a
              onClick={clickHandler}
              class="btn btn-primary"
              data-table-id-finish={table.table_id}
            >
              Finish
            </a>
            <p data-table-id-status={table.table_id}>Occupied</p>
          </>
        ) : (
          <p data-table-id-status={table.table_id}>Free</p>
        )}
      </div>
    </div>
  );
}

export default Table;
