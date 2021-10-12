import { useHistory } from "react-router";
import { useState } from "react"
import { today } from "../utils/date-time";
import {assignTable} from "../utils/api"
import ErrorAlert from "../layout/ErrorAlert";

function SeatButtons(inputData, reservation_id){
    
    console.log(inputData);
    const history = useHistory();
    const [tablesError, setTablesError] = useState("");

    const submitHandler = (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        setTablesError(null);
    
        assignTable(reservation_id, inputData.table_id, abortController.signal)
          .then(() => history.push("/dashboard"))
          .catch(setTablesError);
        return () => abortController.abort();
      };


      function cancelHandler(event) {
        event.preventDefault();
        history.push(`/dashboard?date=${today()}`);
      }


return(
    <>
    <button type="submit" onClick={submitHandler} className="btn btn-primary mr-5">
        Submit
        </button>
        <button type="submit" onClick={cancelHandler} className="btn btn-danger">
        Cancel
        </button>
        <ErrorAlert error={tablesError} />
    </>
)
}

export default SeatButtons;