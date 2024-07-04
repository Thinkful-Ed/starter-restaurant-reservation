import React from "react";

function TablesTable( {tables} ) {

const columnHeadingsForTablesTable = <tr>
<th scope="col">#</th>
<th scope="col">Table Name</th>
<th scope="col">Capacity</th>
<th scope="col">Status</th>
</tr> ;

const rowsForTablesTable =  tables.map((table) => (
<tr key={table.table_id}>
<th scope="row">{table.table_id}</th>
<td>{table.table_name}</td>
<td>{table.capacity}</td>
<td>{table.reservation_id ? "Occupied" : "Free"}</td>
</tr>
));


    return (
       <table className="table">
         <thead>
            {columnHeadingsForTablesTable}
         </thead>
         <tbody>
             {rowsForTablesTable}
         </tbody>
      </table>
    );
}

export default TablesTable;