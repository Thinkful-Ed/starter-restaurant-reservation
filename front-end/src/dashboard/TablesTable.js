export default function TablesTable({
  table: { table_id, table_name, capacity, reservation_id },
}) {
  return (
    <div>
      <p>Table: {table_name}</p>
      <p>Capacity: {capacity}</p>
      <p data-table-id-status={table_id}>
        Status: {reservation_id ? "Occupied" : "Free"}
      </p>
    </div>
  );
}
