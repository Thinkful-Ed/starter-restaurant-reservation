import React from "react";

function TableDisplay(table) {

  function finishHandler(){
    console.log("Hello! FInished@@@@")
  }
  
    const {
        table_id,
        table_name,
        capacity,
        reservation_id,
    } = table.table;

    
    return (
      <tr>
        <th scope="row">{table_id}</th>
        <td>
         {table_name}
        </td>
        <td>{capacity}</td>
        <td>{reservation_id ? "Occupied" : "Free"}</td>
        <button type="button" className="btn btn-info m-2" onClick={finishHandler}>Finish</button>
      </tr>
    );
  }

  export default TableDisplay;