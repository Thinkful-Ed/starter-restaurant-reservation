import React from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import { formatAsDate } from "../utils/date-time";
import { hasValidDateAndTime } from "../validations/hasValidDateAndTime";

function ReservationsForm({ reservation, setReservation, errors, setReservationErrors }) {

    const history = useHistory();
    function cancelHandler(){
        history.goBack();
    }

   
//     function submitHandler(event) {
//         event.preventDefault();
//         const abortController = new AbortController();
//         createReservation(reservation, abortController.signal)
//         // .then((savedReservations) => { history.push(`/dashboard?date=${formatAsDate(savedReservations.reservation_date)}`); })
//         .then((savedReservation) => {
//             const formattedDate = formatAsDate(savedReservation.reservation_date);
//             console.log("Formatted Date:", formattedDate);
//             history.push(`/dashboard?date=${formattedDate}`);
//           })
//         .catch(setReservationError);
//         return () => abortController.abort();
//  }
    
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
        const errors = hasValidDateAndTime(reservation);
      
        if (Object.keys(errors).length > 0) {
          // Convert the errors object to an array of error messages to setReservationErrors
          console.log("CreateRes...Form - errors object: ", errors);
          const errorMessages = Object.values(errors).map(error => error.message);
          console.log("CreateRes...Form - errorMessages: ",errorMessages);
          return setReservationErrors(errorMessages);
        }
      
        try {
          const savedReservation = await createReservation(reservation, abortController.signal);
          const formattedDate = formatAsDate(savedReservation.reservation_date);
          history.push(`/dashboard?date=${formattedDate}`);
        } catch (error) {
          setReservationErrors([error.message]);
        }
      
        return () => abortController.abort();
      };

    // function changeHandler({ target: { name, value } }) {
        function changeHandler(event) {
        if (event.target.name ==="people") {setReservation((previousReservation) => ({
            ...previousReservation,
            [event.target.name]: Number(event.target.value),
          }));
            
        }else{
        setReservation((previousReservation) => ({
         ...previousReservation,
            [event.target.name]: event.target.value,
        }));
    }
    }

    // function numberChangeHandler({ target: { name, value } }) {
    //     setReservation((previousReservation) => ({
    //       ...previousReservation,
    //       [name]: Number(value),
    //     }));
    //   }
return (
    <form onSubmit={submitHandler} className="mb-4">
        {/* <ErrorAlert errors={errors} /> */}
        <div className="row mb-3">
            <div className="col-6 form-group">
                <label className="form-label" htmlFor="first_name">
                    First Name
                </label>
                <input
                    className="form-control"
                    id="first_name"
                    name="first_name"
                    type="text"
                    placeholder="First Name"
                    pattern="^[a-zA-Z'-. ]+$"
                    value={reservation.first_name}
                    onChange={changeHandler}
                    required={true}
                />
            </div>
            <div className="col-6">
                <label className="form-label" htmlFor="last_name">
                    Last Name
                </label>
                <input
                    className="form-control"
                    id="last_name"
                    name="last_name"
                    type="text"
                    placeholder="Last Name"
                    pattern="^[a-zA-Z'-. ]+$"
                    value={reservation.last_name}
                    onChange={changeHandler}
                    required={true}
                />
            </div>
        </div>
        <div className="mb-3">
            <label className="form-label" htmlFor="mobile_number">
                Mobile Number
            </label>
            <input
                className="form-control"
                id="mobile_number"
                name="mobile_number"
                type="text"
                placeholder="Mobile Number"
                pattern="\d{3}-\d{3}-\d{4}"
                value={reservation.mobile_number}
                onChange={changeHandler}
                required={true}
            />
        </div>
        <div className="row mb-3">
            <div className="col-6 form-group">
                <label className="form-label" htmlFor="reservation_date">
                    Reservation Date
                </label>
                <input
                    className="form-control"
                    id="reservation_date"
                    name="reservation_date"
                    type="date"
                    // placeholder="yyyy-mm-dd"
                    pattern="\d{4}-\d{2}-\d{2}"
                    value={reservation.reservation_date}
                    onChange={changeHandler}
                    required={true}          
                />
            </div>
            <div className="col-6">
               <label className="form-label" htmlFor="reservation_time">
                    Reservation Time
                </label>
                <input
                    className="form-control"
                    id="reservation_time"
                    name="reservation_time"
                    type="time"
                    // placeholder="HH:MM"
                    pattern="[0-9]{2}:[0-9]{2}"
                    value={reservation.reservation_time}
                    onChange={changeHandler}
                    required={true}               
                />
            </div>
        </div>
        <div className="mb-3">
            <label className="form-label" htmlFor="people">
                People
            </label>
            <input  
                className="form-control"
                id="people"
                name="people"
                type="number"
                // aria-label="Number of people"
                min= {1}
                value={reservation.people}
                // onChange={numberChangeHandler}
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

export default ReservationsForm;