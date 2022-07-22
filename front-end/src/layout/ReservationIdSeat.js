import React, {useState} from "react";
import {useParams, useHistory} from "react-router-dom"


function ReservationIdSeat(){
    const params = useParams()
    const history = useHistory()
    const [tableNumber, setTableNumber] = useState(null)

    console.log("params: ", params.reservation_id)
    //table coming from...?

    return(
        <>
            <h2>params</h2>
            <form>
                <label htmlFor="table_id">
                    Table Number:
                </label>
                <select name="table_id" id="table_id" size="1" required>
                    {/* <option value="">{table.table_name} - {table.capacity}</option> */}
                </select>

                <div className="row">
                <div className="col-sm">
                    <button type="cancel" className="btn btn-secondary" onClick={()=> history.push("/")}>Cancel</button>
                    <button type="submit" className="btn btn-primary" value="submit">Submit</button>
                </div>
                
            </div>
            </form>
        </>
        
    )
}

export default ReservationIdSeat