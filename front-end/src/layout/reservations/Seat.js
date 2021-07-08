import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { listTables, updateTable, getReservationPeople } from "../../utils/api";
import { Link } from "react-router-dom";
import ErrorAlert from "../ErrorAlert";

function Seat() {
  const [tables, setTables] = useState([]);
  const [err, setErr] = useState(null);
  const [tableId, setTableId] = useState(-1);
  const history = useHistory();
  const [message, setMessage] = useState ("No Log");
//   const loc = useLocation();
//   const query = new URLSearchParams(loc.search);
//   const people = query.get("people") || -1;
  const validationErrors = [];

  const { reservation_id } = useParams();
  const people = getReservationPeople(reservation_id) || 0; 

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

  const changeHandler = ({ target: { value } }) => {
    setTableId(value);
  };

  function hasCapacity() {
    setMessage("Inside hasCapacity");
    const index = tables.findIndex((table) => table.table_id === Number(tableId));
    //setLog(" index of: "+index);

    if (index > -1 && tables[index].capacity < people) {
      validationErrors.push("Number of guests are more than table's capacity");
      setErr("Number of guests are more than table's capacity");
    }
  }

  const submitHandler = (event) => {
    event.preventDefault();
    setMessage("Inside submitHandler before hasCapacity");

    try {

      hasCapacity();
      if (validationErrors.length) {
        throw new Error(validationErrors.join(", "));
      }else{
      updateTable(tableId, reservation_id)
      .then(history.push("/dashboard"))
      .catch(setErr);
      }
    } 
    catch (error) {
      setErr(error);
    }
  };

  return (
    <form className="border border-1 m-4 p-4" onSubmit={submitHandler} >
      <h1>reservation_id : {reservation_id}</h1>  
      <h1>Log : {message}</h1>  
      <h1>People : {people}</h1>  
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
                    <option key={index.toString()} value={table.table_id}>{`${table.table_name} - ${table.capacity}`}</option>
                  ))}
                </select>
            </div>
            <div className="form-group col">
                <button type="submit" className="btn btn-primary btn-lg">Submit</button>
                <Link to="/dashboard" className="btn btn-secondary btn-lg ml-2">Cancel</Link>            
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Seat;
