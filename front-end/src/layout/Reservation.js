import ResCard from "../dashboard/pieces/ResCard";
import { useParams, useHistory } from "react-router-dom";
import ErrorAlert from "./ErrorAlert";
import { useEffect, useState } from "react";
import { readReservation } from "../utils/api";
import MapTableOptions from "./MapTableOptions";
import { seatTable } from "../utils/api";

function Reservation(){
    const initialReservation = {
        first_name: "Loading...",
        last_name: "Loading...",
        reservation_time: "Loading...",
        reservation_date: "Loading...",
        people: "Loading...",
        status: "Loading...",
    }



    const { reservation_id } = useParams();
    const [reservation, setReservation] = useState(initialReservation);
    const [reservationError, setReservationError] = useState(null);
    const [selectedTableId, setSelectedTableId] = useState(3);
    const history = useHistory();
  
    useEffect(() => {
      const abortController = new AbortController();
      const checkReservation = async () => {
        try {
          await readReservation(reservation_id, abortController.signal).then(
            setReservation
          );
        } catch (error) {
          setReservationError(error);
        }
      };
      checkReservation();
      return () => abortController.abort;
    }, [reservationError, reservation_id]);
  
    function cancelHandler() {
      history.goBack();
    }
  
    async function submitHandler(event) {
      event.preventDefault();
      const abortController = new AbortController();
      try {
        setReservationError(null);
        await seatTable(reservation_id, selectedTableId, abortController.signal);
        history.push("/dashboard");
      } catch (error) {
        setReservationError(error);
      }
    }
  
    function changeHandler({ target }) {
      setSelectedTableId(Number(target.value));
    }
  

    //table form will be a select box with all the tables



    return(
        <div className="Reservation">
            <h1>Reservation</h1>
            <ErrorAlert error={reservationError}/>
            <ResCard reservation={reservation} mode={"single"}/>
            <form>
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
          <button type="submit" onClick={submitHandler} className="btn btn-primary">
            <span className="oi oi-check"></span>
            &nbsp;Submit
          </button>
        </fieldset>
      </form>
        </div>
    )
}


export default Reservation;