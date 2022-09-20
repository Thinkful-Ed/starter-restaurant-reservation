import React from "react";

export default function TableOptions({ table }) {
  return (
    <option value={table.table_id}>
      {table.table_name} - {table.capacity}
    </option>
  );
}
