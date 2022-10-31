import React from "react";

function TableRow({ rowData, index }) {
  const handleFinishClick = () => console.log("finish");

  return (
    <tr>
      <td>{rowData.table_id}</td>
      <td>{rowData.table_name}</td>
      <td>{rowData.capacity}</td>
      <td>pending</td>
      <td>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleFinishClick}
        >
          Finish
        </button>
      </td>
    </tr>
  );
}

export default TableRow;
