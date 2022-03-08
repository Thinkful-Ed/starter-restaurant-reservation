import { useHistory } from "react-router";
import { removeReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

export default function TablesTable({ tables, error }) {
  const history = useHistory();
  async function handleClick(reservation_id, table_id) {
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      await removeReservation(reservation_id, table_id);
      history.go(0);
    }
  }
  const tablesList = tables.map(
    ({ table_id, table_name, capacity, reservation_id }, index) => (
      <tr key={index}>
        <td>{table_id}</td>
        <td>{table_name}</td>
        <td>{capacity}</td>
        <td data-table-id-status={table_id}>
          {reservation_id ? "Occupied" : "Free"}
        </td>
        <td>
          {reservation_id && (
            <button
              className="btn btn-primary mr-2"
              data-table-id-finish={table_id}
              onClick={() => handleClick(reservation_id, table_id)}
            >
              Finish
            </button>
          )}
        </td>
      </tr>
    )
  );
  return (
    <div>
      <h4 className="mb-0">Tables</h4>
      <ErrorAlert error={error} />
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Table Name</th>
            <th>Capacity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{tablesList}</tbody>
      </table>
    </div>
  );
}
