import React from "react"
import {useState} from "react"
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import TableErrors from "./TableError";

function TableForm(){
    const history = useHistory();
    const initialState = {
        "table_name": "",
        "capacity": 0
    }

    const [table, setTable] = useState(initialState);
    function changeHandler({ target: { name, value } }) {
      setReservation((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

    function changeHandlerNum({ target: { name, value } }) {
      setReservation((prevState) => ({
        ...prevState,
        [name]: Number(value),
      }));
    }

    const [error, setError] = useState(null);


    function validate(reservation){
        const errors = []
        return errors;
    }


    function submitHandler(event){
        event.preventDefault();
        event.stopPropagation();

        const tableErrors = validate(reservation);

        console.log(tableErrors);
        if (tableErrors.length) {
          return setError(tableErrors);
        }

        createTable(reservation)
        .then((createdTable) => {
        history.push(
          `/dashboard`
        ).catch(setError);
      })
    }

    return (
        <form onSubmit={submitHandler}>
            <TableErrors errors={error} />
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Table name:</label>
                <div className="col-sm-10">
                    <input name="table_name" value={table.table_name} onChange={changeHandler} />
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Number of people:</label>
                <div className="col-sm-10">
                    <input name="capacity" type="number" min={1} value={table.capacity} onChange={changeHandlerNum} />
                </div>
            </div>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => history.goBack()}>Cancel</button>
        </form>
    )
}

export default ReservationForm;
