import React from "react";
import { useHistory } from "react-router-dom";
import { assignTable } from "../utils/api";
import { formatAsDate } from "../utils/date-time";
// import { hasValidDateAndTime } from "../validations/hasValidDateAndTime";

function TablesForm({ tableAssignment, setTableAssignment, errors, setTableAssignErrors }) {
   
    const history = useHistory();

    function cancelHandler() {
        history.goBack();
    }

//  const submitHandler = async (event) => {
//     event.preventDefault();
//    const abortController = new AbortController();
//    const errors = hasValidDateAndTime(reservation);
//    if (errors.length) {
//         return setReservationErrors(errors);
//     }
//    try {
//        const savedReservation = await createReservation(reservation, abortController.signal);
//        const formattedDate = formatAsDate(savedReservation.reservation_date);
//        console.log("Formatted Date:", formattedDate);
//        history.push(`/dashboard?date=${savedReservation.reservation_date}`);
//     } 
//     catch (error) {
//       setReservationErrors([error]);
//     }
//    return () => abortController.abort();
//     };

const submitHandler = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    // const validationErrors = hasValidDateAndTime(reservation);
  
    // if (Object.keys(validationErrors).length > 0) {
    //   const errorMessages = Object.values(validationErrors).map(error => error.message||error);
    //   return setTableAssignErrors(errorMessages);
    // }
  
    try {
      const savedTableAssignment = await  assignTable(tableAssignment, abortController.signal);
      const formattedDate = formatAsDate(savedTableAssignment.reservation_date);
      history.push(`/dashboard?date=${formattedDate}`);
    } catch (error) {
    console.log(" TablesForm -submitHandler - error: ", error, " error.message: ",error.message);
    setTableAssignErrors([error.message || "Unknown error occurred."]); // Ensure error message is a string

    }
  
    return () => abortController.abort();
};

function changeHandler(event) {
    const { name, value } = event.target;
    setTableAssignment((previousTableAssignment) => ({
        ...previousTableAssignment,
        [name]: name === "capacity" ? Number(value) : value,
    }));
}


    
return (
    <form onSubmit={submitHandler} className="mb-4">
        {/* <ErrorAlert errors={errors} /> */}
        <div className="mb-3">
            
                <label className="form-label" htmlFor="table_name">
                    Table Name
                </label>
                <input
                    className="form-control"
                    id="table_name"
                    name="table_name"
                    type="text"
                    placeholder="Table Name"
                    pattern="^[a-zA-Z0-9'-. ]+$"
                    value={tableAssignment.table_name}
                    onChange={changeHandler}
                    required={true}
                />
        </div>
           
        <div className="mb-3">
            <label className="form-label" htmlFor="capacity">
                Capacity
            </label>
            <input  
                className="form-control"
                id="capacity"
                name="capacity"
                type="number"
                min= {1}
                value={tableAssignment.capacity}
                onChange={changeHandler}
                required={true}
            />
        </div>

        <div className="mb-3"> 
            <button         
                type="button" 
                className="btn btn-secondary mr-2"
                onClick={cancelHandler}
            >Cancel
            </button>
          
            <button
                type="submit"
                className="btn btn-primary"
            >Submit
            </button>
        
        </div>    
    </form> 
);

}

export default TablesForm;