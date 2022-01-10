import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { listTables, updateTable, readReservation } from "../../utils/api";
import { Link } from "react-router-dom";
import ErrorAlert from "../ErrorAlert";
import ShowReservationsList from "../../dashboard/ShowReservationsList";

function Seat() {
  const [tables, setTables] = useState([]);
  const [reservation, setReservation] = useState({});
  const [err, setErr] = useState(null);
  const [tableId, setTableId] = useState(-1);
  const history = useHistory();

  const validationErrors = [];

  const { reservation_id } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    //below lists only tables which are available
    listTables(abortController.signal)
      .then((tables) =>
        setTables(tables.filter((table) => table.reservation_id === null))
      )
      .catch(setErr);
    return () => abortController.abort;
  }, [reservation_id]);

  useEffect(() => {
    const abortController = new AbortController();
    readReservation(reservation_id, abortController.signal)
      .then(setReservation)
      .catch(setErr);
    return () => abortController.abort();
  }, [reservation_id]);

  const changeHandler = ({ target: { value } }) => {
    setTableId(value);
  };

  function hasCapacity() {
    const index = tables.findIndex(
      (table) => table.table_id === Number(tableId)
    );
    if (index > -1 && tables[index].capacity < reservation.people) {
      validationErrors.push("Number of guests are more than table's capacity");
      setErr("Number of guests are more than table's capacity");
    }
  }

  const submitHandler = (event) => {
    event.preventDefault();

    try {
      hasCapacity();
      if (validationErrors.length) {
        throw new Error(validationErrors.join(", "));
      } else {
        updateTable(tableId, reservation_id)
          .then(history.push("/dashboard"))
          .catch(setErr);
      }
    } catch (error) {
      setErr(error);
    }
  };

  return (
    <form className="border border-1 m-4 p-4" onSubmit={submitHandler}>
      <ErrorAlert error={err} />
      <div className="card">
        <div className="card-header alert alert-primary">Pick a Table</div>
        <div className="card-body">
          <div className="row">
            <div className="form-group col-6">
              <select
                className="form-control form-control-lg"
                name="table_id"
                id="table_id"
                onChange={changeHandler}
                value={tableId}
              >
                <option key="-1">--- click to select ---</option>
                {tables.map((table, index) => (
                  <option
                    key={index.toString()}
                    value={table.table_id}
                  >{`${table.table_name} - ${table.capacity}`}</option>
                ))}
              </select>
            </div>
            <div className="form-group col">
              <button type="submit" className="btn btn-primary btn-lg">
                Submit
              </button>
              <Link to="/dashboard" className="btn btn-secondary btn-lg ml-2">
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="card mt-3">
        <div className="card-header alert alert-primary">
          {" "}
          Reservation Information
        </div>
        <div className="card-body">
            <ShowReservationsList reservations={[reservation]}/>
          
        </div>
      </div>
    </form>
  );
}

export default Seat;



/* <table className="table table-striped">
            <thead>
              <tr>
                <th>id#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Time</th>
                <th>Guests</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{reservation.reservation_id}</td>
                <td>{reservation.first_name}</td>
                <td>{reservation.last_name}</td>
                <td>{reservation.mobile_number}</td>
                <td>{reservation.reservation_date}</td>
                <td>{reservation.reservation_time}</td>
                <td>{reservation.people}</td>
              </tr>
            </tbody>
          </table> */