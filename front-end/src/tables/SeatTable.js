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
    updated_at: "",
  };
  const [tables, setTables] = useState([]);
  const [currentReservation, setCurrentReservation] = useState({});
  const [tableData, setTableData] = useState(initTableData);
  const [error, setError] = useState(null);
  const { reservation_id } = useParams();
  const history = useHistory();
  let date;
  const { search } = useLocation();
  if (search) {
    date = search.replace("?date=", "");
    console.log(date)
  }

  useEffect(() => {
    async function loadTables(){
      const abortController = new AbortController();
      setError(null);
      setCurrentReservation(await getReservation(reservation_id, abortController.signal))
      setTables(await listTables(abortController.signal))
      return () => abortController.abort();
    }
    loadTables()
  }, [reservation_id]);

  const submitHandler = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      const updatedTable = await updateSeat(
        reservation_id,
        parseInt(tableData.table_id),
        abortController.signal
      );
      console.log(updatedTable)
      history.push(`/dashboard?date=${currentReservation.reservation_date}`);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  if (currentReservation.status === "booked") {
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
              <td>
                {currentReservation.first_name} {currentReservation.last_name}
              </td>
              <td>{currentReservation.mobile_number}</td>
              <td>{currentReservation.reservation_date}</td>
              <td>{currentReservation.reservation_time}</td>
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
          history={history}
        />
      </>
    );
  } else {
    return <></>;
  }
}

export default SeatTable;
