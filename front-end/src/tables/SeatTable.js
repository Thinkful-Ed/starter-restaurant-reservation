import React, { useEffect, useState } from "react";
import { listTables, updateSeat, getReservation } from "../utils/api";
import { useLocation, useHistory, useParams } from "react-router-dom";
import SeatTableForm from "./SeatTableForm";
import ErrorAlert from "../layout/ErrorAlert";

function SeatTable() {
  const initTableData = {
    table_id: null,
    reservation_id: null,
    table_status: "free",
    created_at: "",
    updated_at: ""
  };
  const [tables, setTables] = useState([]);
  const [currentReservation, setCurrentReservation] = useState({})
  const [tableData, setTableData] = useState(initTableData);
  const [error, setError] = useState(null);
  const { reservation_id } = useParams();
  const history = useHistory();
  let date;
  const { search } = useLocation();
  if (search) {
    date = search.replace("?date=", "");
  }

  useEffect(() => {
    const abortController = new AbortController();
    setError(null);
    Promise.all([
        listTables(abortController.signal).then(setTables).catch(setError),
        getReservation(reservation_id, abortController.signal).then(setCurrentReservation).catch(setError)
    ])
    return () => abortController.abort();
  }, [reservation_id]);

  const submitHandler = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      const updatedTable = await updateSeat(
        tableData.table_id,
        reservation_id,
        abortController.signal
      );
      const newTables = tables.map((table) =>
        table.table_id === updatedTable.table_id ? updatedTable : table
      );
      setTables(newTables);
      history.push(`/dashboard${date ? `?date=${date}` : ""}`);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  if (tables) {
    return (
      <>
        <ErrorAlert error={error} />
        <h3>Seat the reservation:</h3>
        <br></br>
        <span>Current Reservation:</span>
       <table>
       <thead>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PHONE</th>
                <th>DATE</th>
                <th>TIME</th>
                <th>PEOPLE</th>
                <th>STATUS</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{currentReservation.reservation_id}</td>
                <td>{currentReservation.first_name} {currentReservation.last_name}</td>
                <td>{currentReservation.mobile_number}</td>
                <td>{currentReservation.reservation_date}</td>
                <td>{currentReservation.reservation_tim}</td>
                <td>{currentReservation.people}</td>
                <td>{currentReservation.status}</td>
            </tr>
        </tbody>
       </table>
        <SeatTableForm
          tables={tables}
          tableData={tableData}
          setTableData={setTableData}
          submitHandler={submitHandler}
        />
      </>
    );
  } else {
    return (
      <div>
        <h4>No open tables.</h4>
      </div>
    );
  }
}

export default SeatTable;
