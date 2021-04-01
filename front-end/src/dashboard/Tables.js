import React from "react";
import {finishTable} from "../utils/api";

function Tables({ tables = [] }) {

  function finishHandler({
      target: { dataset: { tableIdFinish, reservationIdFinish } } = {},
    }) {
      if (
        tableIdFinish &&
        window.confirm(
          "Is this table ready to seat new guests? This cannot be undone."
        )
      ) {
          finishTable(tableIdFinish, reservationIdFinish);
      }
  }


  const rows = tables.length ? (
    tables.map((table) => {
      return (
        <div className="form-group row" key={table.table_id}>
          <div className="col-sm-1">{table.table_name}</div>
          <div className="col-sm-1">{table.capacity}</div>
          <div className="col-sm-1" data-table-id-status={table.table_id}>{table.reservation_id ? "Occupied" : "Free"}</div>
          <div className="col-sm-1">
            {table.reservation_id ?
              <button type="button" className="btn" data-table-id-finish={table.table_id} onClick={finishHandler}>
                Finish
              </button> : ("")
            }
          </div>
        </div>
      );
    })
    ) : (
    <div>No results</div>
  );
  return (
      <div className="table">
      {rows}
      </div>
  )
}

export default Tables;
