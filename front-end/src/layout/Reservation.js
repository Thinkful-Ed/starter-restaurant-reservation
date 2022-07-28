import ResCard from "../dashboard/pieces/ResCard";
import { useParams, useHistory } from "react-router-dom";
import ErrorAlert from "./ErrorAlert";
import { useEffect, useState } from "react";
import { readReservation } from "../utils/api";
import MapTableOptions from "./MapTableOptions";


function Reservation(){
    const history = useHistory();
    const id = useParams().reservation_id;
    console.log(id)
    const resInit = {
        reservation_id: id,
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: "",
        status: ""
    }

    const tableFormInit = {
        table_name: "",
    }
    const [reservation, setReservation] = useState(resInit);
    const [reservationError, setReservationError] = useState(null);
    const [tableForm, setTableForm] = useState(false);
    const [selectedTable, setSelectedTable] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        const checkReservation = async () => {
          try {
            await readReservation(id, abortController.signal).then(
              setReservation
            );
          } catch (error) {
            setReservationError(error);
          }
        };
        checkReservation();
        return () => abortController.abort;
      }, [reservationError, id]);

    function cancelHandler(){
        setReservation(resInit);
        setTableForm(tableFormInit);
        history.push("/dashboard");
    }

    function submitHandler(e){
        e.preventDefault();
        console.log(reservation);
        setReservation(resInit);
        setTableForm(tableFormInit);
        history.push("/dashboard");
    }

    function changeHandler(e){
        const { value } = e.target
        setSelectedTable(value);
    }

    //table form will be a select box with all the tables



    return(
        <div className="Reservation">
            <h1>Reservation</h1>
            <ErrorAlert error={reservationError}/>
            <ResCard reservation={reservation} mode={"single"}/>
            <form onSubmit={submitHandler}>
        <fieldset>
          <div className="row">
            <div className="form-group col">
              <label htmlFor="table_id">Seat at:</label>
              <select
                id="table_id"
                name="table_id"
                className="form-control"
                required
                onClick={changeHandler}
              >
                <option value>Select a table</option>
                <MapTableOptions />
              </select>
            </div>
          </div>
          <button
            type="button"
            onClick={cancelHandler}
            className="btn btn-secondary mr-2 cancel"
          >
            <span className="oi oi-x"></span>
            &nbsp;Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            <span className="oi oi-check"></span>
            &nbsp;Submit
          </button>
        </fieldset>
      </form>
        </div>
    )
}


export default Reservation;