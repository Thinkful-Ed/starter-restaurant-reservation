import React from "react";

function TablesList({ tables, onFinish }) {
    console.log("component tables:", tables);

    function finishHandler({ target: { dataset: { tableIdFinish, reservationIdFinish } } = {}, }) {
        if (
            tableIdFinish && reservationIdFinish &&
            window.confirm(
                "Is this table ready to seat new guests?\n\nThis cannot be undone."
            )
        ) {
            onFinish(tableIdFinish, reservationIdFinish);

        }
    }

    let mappedTables;

    if (Array.isArray(tables)) mappedTables = tables.map(table => {
        return (<tr key={table.table_id}>
            <td>{table.table_id}</td>
            <td>{table.table_name}</td>
            <td>{table.capacity}</td>
            <td data-table-id-status={table.table_id}>{!table.reservation_id ? "free" : "occupied"}</td>
            <td>{table.reservation_id &&
                (<button
                    type="button"
                    className="btn btn-light btn-sm btn-outline-secondary"
                    data-table-id-finish={table.table_id}
                    data-reservation-id-finish={table.reservation_id}
                    onClick={finishHandler}
                >Finish</button>)}
            </td>
        </tr>)
    });

    return (
        <div className="column col-md-6 mt-5">
            <table className="table table-hover table-dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>TABLE NAME</th>
                        <th>CAPACITY</th>
                        <th>FREE?</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {mappedTables}
                </tbody>
            </table>
        </div>
    )
}

export default TablesList;