import { removeReservation } from "../utils/api";

export default function TablesTable({
  table: { table_id, table_name, capacity, reservation_id },
  reloadVal,
  reload,
}) {
  async function handleClick() {
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      await removeReservation(reservation_id, table_id);
      reload(!reloadVal);
    }
  }
  return (
    <div>
      <p>Table: {table_name}</p>
      <p>Capacity: {capacity}</p>
      <p data-table-id-status={table_id}>
        Status: {reservation_id ? "Occupied" : "Free"}
      </p>
      {reservation_id && (
        <button
          className="btn btn-primary mr-2"
          data-table-id-finish={table_id}
          onClick={handleClick}
        >
          Finish
        </button>
      )}
    </div>
  );
}
