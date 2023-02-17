import React, { useState } from "react";
import { createReservation } from "../utils/api";
import { useLocation, useHistory } from "react-router-dom";
import ReservationForm from "./ReservationForm";
import ValidateReservation from "./ValidateReservation";



//TODO take out extra code (reservationInfo ?) & unused imports (useEffect)
//TODO find better way for error validation
export default function NewReservation() {
    const history = useHistory();
    let location = useLocation();
    let query = new URLSearchParams(location.search);
    const [errorDiv, setErrorDiv] = useState();
   
    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: "",
    }
    


    const [formData, setFormData] = useState(initialFormState);
  

    const handleChange = ({ target }) => {
        setFormData({...formData, [target.name]:target.value});
    };


    const [error, setError] = useState(null);
    const [firstNameError, setFirstNameError] = useState();
    const [lastNameError, setLastNameError] = useState();
    const [mobileNumberError, setMobileNumberError] = useState();
    const [dateError, setDateError] = useState();
    const [dayError, setDayError]= useState();
    const [timeError, setTimeError] = useState();
    const [peopleError, setPeopleError] = useState();


    
    // const errorDiv = error
    // ?   <div className="error alert alert-danger" >
    //         <p>
    //             {firstNameError}
    //             <br></br>
    //             {lastNameError}
    //             <br></br>
    //             {mobileNumberError}
    //             <br></br>
    //             {peopleError}
    //             <br></br>
    //             {timeError}
    //             <br></br>
    //             {dateError}
    //             <br></br>
    //             {dayError}
    //         </p>
    //     </div>
    //     : '';
    
    
    // function checkData(reservation){
    //     setDateError("");
    //     setTimeError("");
    //     setDayError("");
    //     setFirstNameError("");
    //     setLastNameError("");
    //     setMobileNumberError("");
    //     setPeopleError("");
        
    //     const {first_name, last_name, mobile_number, reservation_date, reservation_time, people} = formData;
      
    //     const fullReservationDate = new Date(`${reservation_date}T${reservation_time}:00`)


    //     const fullTodayDate = new Date();


    //     const reservationTimeHours = Number(reservation_time.slice(0,2));
    //     const reservationTimeMinutes = Number(reservation_time.slice(3,5));

        
        
    //     if(first_name.length < 1){
    //         setFirstNameError("A first name is required.");
    //     }
    //     if(last_name.length < 1){
    //         setLastNameError("A last name is required.");
    //     }
    //     if(mobile_number.length < 10){
    //         setMobileNumberError("A valid mobile number is required.");
    //     }
    //     if(people < 1){
    //         setPeopleError(`People must be at least 1, you entered ${people}`);
    //     }
    //     if(fullTodayDate > fullReservationDate){
    //         setDateError("Reservations must be in the future.");
    //     }
    //     if(reservationTimeHours === 10 && reservationTimeMinutes <= 30){
    //         setTimeError("Reservations must be after 10:30")
    //     }
    //     if(reservationTimeHours < 10){
    //         setTimeError("Reservations must be after 10:30")
    //     }

    //     if(reservationTimeHours >= 21 && reservationTimeMinutes >= 30){
    //         if (reservationTimeHours <= 22 && reservationTimeMinutes <= 30){
    //             setTimeError("We are closing soon, no reservations for this time.")
    //         }
    //     }

    //     if(reservationTimeMinutes > 30){
    //         if(reservationTimeHours >= 22) {
    //             setTimeError("Too late.")
    //         }
    //     }

    //     if(typeof(fullReservationDate.getHours()) !== 'number' || typeof(fullReservationDate.getMinutes()) !== 'number'){
    //         setTimeError("Please enter a valid reservation time");
    //     }
    //     if(fullReservationDate.getDay() === 2){
    //         setDayError("Sorry, we are closed on Tuesdays.");
    //     }
    // }
// let errorDiv = ValidateReservation(formData)
// if(ValidateReservation(formData).props.className != "error alert alert-danger"){
//     errorDiv = ValidateReservation(formData)
// } else {
//     errorDiv = ""
// }
    // let errorDiv = ValidateReservation(formData)
    // let errorDiv;

    const handleSubmit = (event) => {
        event.preventDefault();
        formData.people = Number(formData.people);
        const reservation = formData;
 
        setError(null);
        // checkData(reservation);
        setErrorDiv(ValidateReservation(reservation))
        // ValidateReservation(reservation)\
     
        console.log(`########`, ValidateReservation(reservation).props.className)
        if(ValidateReservation(reservation).props.className != "error alert alert-danger"){
        async function callCreateReservation() {
            try{
                await createReservation(reservation);
                query.set('date', `${formData.reservation_date}`);
                history.push(`/dashboard?date=${formData.reservation_date}`);
            }
            catch (error) {
                console.log(error);
                setError(error.message);
                throw error;
            }
        }
        callCreateReservation();
    }
    };

    const goBack = (event) => {
        event.preventDefault();
        history.goBack();
    }


    return (
        <>
        <h3>Create a new Reservation</h3>
        <ReservationForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            formData={formData}
            goBack={goBack} />

        {/* <div>{errorDiv.props.className != "error alert alert-danger" ? '' : errorDiv}</div> */}
        <div>{!errorDiv ? '' : errorDiv}</div>

        </>
    )

}
