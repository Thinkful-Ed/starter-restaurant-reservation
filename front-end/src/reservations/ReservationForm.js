import React from "react"
import { useHistory } from "react-router-dom";


function ReservationForm(){
    const history = useHistory();

    return (
        <form>
            <input name="first_name" />
            <input name="last_name" />
            <input name="mobile_number" />
            <input name="reservation_date" />
            <input name="reservation_time" />
            <input name="people" />
            <button type="submit">Submit</button>
            <button type="button" onClick={() => history.goBack()}>
              Cancel
            </button>
        </form>
    )
}

export default ReservationForm;
