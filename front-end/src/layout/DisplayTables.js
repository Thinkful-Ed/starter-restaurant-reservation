import { finishTable } from "../utils/api";

function DisplayTables({ tables, loadDashboard }) {

  const finishHandler = async (event) => {
    const tableId = event.target.getAttribute("data-table-id-finish");
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      await finishTable(tableId);
      loadDashboard();
    }
  };

  return tables.map((table, index) => {
    return (
      <tr key={index}>
        <td>
          <div name="table_id">{table.table_id}</div>
        </td>
        <td>
          <div name="table_name">{table.table_name}</div>
        </td>
        <td>
          <div name="capacity">{table.capacity}</div>
        </td>
        <td data-table-id-status={table.table_id}>
          <p>{table.reservation_id ? "occupied" : "free"}</p>
        </td>
        {table.reservation_id ? (
          <td>
            <button
              type="button"
              data-table-id-finish={table.table_id}
              onClick={finishHandler}
              name="Finish"
            >
              Finish
            </button>
          </td>
        ) : null}
      </tr>
    );
  });
}

export default DisplayTables;