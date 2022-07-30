import { deleteTableReservation } from "../utils/api";
import { useHistory } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_BASE_URL;
function DisplayTables({ tables, loadDashboard, setReservationError}) {
  const history = useHistory();
  // const finishHandler = async (event) => {
  //   const tableId = event.target.getAttribute("data-table-id-finish");
  //   if (
  //     window.confirm(
  //       "Is this table ready to seat new guests? This cannot be undone."
  //     )
  //   ) {
  //     await finishTable(tableId);
  //     loadDashboard();
  //     //wait 1.5 seconds
  //     // setTimeout(() => {
  //     //   loadDashboard();
  //     // }
  //     //   , 600);
  //     console.log("Ok!")
  //   }
  // };
  async function finishHandler(event, table) {
    const ac = new AbortController();
    event.preventDefault();
    setReservationError(null);
    console.log(table.table_id);
    let tableId = table.table_id;
    if(window.confirm("Is this table ready to seat new guests? This cannot be undone.")) {
        let ret = await fetch(`${apiUrl}/tables/${tableId}/seat`, {
          method: "DELETE",
          signal: ac.signal,
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            if (res.ok) {
            } else {
              setReservationError("Error");
            }
          }
            )
        loadDashboard();
        return;
    } else {
        console.log("Cancelled");
    }
  }

  return tables.map((table, index) => {
    return (
      <tr key={index}>
        <td>
          <div name="table_id">{table.table_id}</div>
        </td>
        <td>
          <div name="table_name">{table.table_name}</div>
        </td>
        <td>
          <div name="capacity">{table.capacity}</div>
        </td>
        <td data-table-id-status={table.table_id}>
          {table.reservation_id ? "occupied" : "free"}
        </td>
        {table.reservation_id ? (
          <td>
            <button
              type="button"
              data-table-id-finish={table.table_id}
              onClick={(event) => finishHandler(event, table)}
              name="Finish"
              className="btn btn-danger" 
            >
              <span className="oi oi-book"></span>&nbsp; Finish
            </button>
          </td>
        ) : null}
      </tr>
    );
  });
}

export default DisplayTables;