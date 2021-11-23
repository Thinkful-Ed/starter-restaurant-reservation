import React from "react";
import TableInfo from "./TableInfo";

export default function TableList({ tables }) {
  if (!tables) {
    return null;
  }

  const formatted = tables.map((table) => {
    return <TableInfo key={table.table_id} table={table} />;
  });

  return (
    <div>
      <table className="table table-sm table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Table</th>
            <th scope="col">Capacity</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>{formatted}</tbody>
      </table>
    </div>
  );
}
