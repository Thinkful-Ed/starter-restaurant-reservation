import React, { useState } from "react";
import { createReservation } from "../utils/api";
import { useLocation, useHistory } from "react-router-dom";


//TODO take out extra code (reservationInfo ?) & unused imports (useEffect)
//TODO find better way for error validation
export default function NewReservation() {
    const history = useHistory();
    let location = useLocation();
    let query = new URLSearchParams(location.search);

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


    
    const errorDiv = error
    ?   <div className="error alert alert-danger" >
            <p>
                {firstNameError}
                <br></br>
                {lastNameError}
                <br></br>
                {mobileNumberError}
                <br></br>
                {peopleError}
                <br></br>
                {timeError}
                <br></br>
                {dateError}
                <br></br>
                {dayError}
            </p>
        </div>
        : '';
    
    
    function checkData(reservation){
        setDateError("");
        setTimeError("");
        setDayError("");
        setFirstNameError("");
        setLastNameError("");
        setMobileNumberError("");
        setPeopleError("");
        
        const {first_name, last_name, mobile_number, reservation_date, reservation_time, people} = formData;
        
        const fullReservationDate = new Date(`${reservation_date}T${reservation_time}:00`)
        const fullTodayDate = new Date();


        const reservationTimeHours = reservation_time.slice(0,2);
        const reservationTimeMinutes = reservation_time.slice(3,5);

        console.log(reservationTimeHours, reservationTimeMinutes, fullReservationDate.getUTCDay())

        if(first_name.length < 1){
            setFirstNameError("A first name is required.");
        }
        if(last_name.length < 1){
            setLastNameError("A last name is required.");
        }
        if(mobile_number.length < 10){
            setMobileNumberError("A valid mobile number is required.");
        }
        if(people < 1){
            setPeopleError(`People must be at least 1, you entered ${people}`);
        }
        if(fullTodayDate > fullReservationDate){
            setDateError("Reservations must be in the future.");
        }
        if(!reservationTimeHours || !reservationTimeMinutes){
            setTimeError("Please enter a valid reservation time");
        }
        if(reservationTimeHours < 10){
            setTimeError("Reservations must be after 10:30")
        }
        if(reservationTimeHours == 10 && reservationTimeMinutes <= 30){
            setTimeError("Reservations must be after 10:30")
        }
        if(reservationTimeHours > 21){
            setTimeError("Reservations must be before 21:30")
        }
        if(reservationTimeHours == 21 && reservationTimeMinutes >= 30){
            setTimeError("Reservations must be before 21:30")
        }
        if(fullReservationDate.getUTCDay() === 3){
            setDayError("Sorry, we are closed on Tuesdays.");
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        formData.people = Number(formData.people);
        const reservation = formData;
        setError(null);
        checkData(reservation);
        async function callCreateReservation() {
            try{
                await createReservation(reservation);
                query.set('date', `${formData.reservation_date}`);
                history.push(`/dashboard?date=${formData.reservation_date}`);
            }
            catch (error ) {
                //TODO get rid of this console.log()
                console.log(error);
                setError(error.message);
                throw error;
            }
        }
        callCreateReservation();
    };

    const goBack = (event) => {
        event.preventDefault();
        history.goBack();
    }

    return (
        <form name="create" onSubmit={handleSubmit}>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <input
                                id="first_name"
                                name="first_name"
                                type="text"
                                onChange={handleChange}
                                value={formData.first_name}
                                placeholder="First Name"
                                />
                        </td>

                        <td>
                            <input
                                id="last_name"
                                name="last_name"
                                type="text"
                                onChange={handleChange}
                                value={formData.last_name}
                                placeholder="Last Name"
                                />
                        </td>

                        <td>
                            <input
                                id="mobile_number"
                                name="mobile_number"
                                type="text"
                                onChange={handleChange}
                                value={formData.mobile_number}
                                placeholder="Mobile Number"
                                />
                        </td>

                        <td>
                            <input
                                id="reservaion_date"
                                name="reservation_date"
                                type="date"
                                onChange={handleChange}
                                value={formData.reservation_date}
                                placeholder="YYYY-MM-DD"
                                pattern="\d{4}-\d{2}-\d{2}"
                                />
                        </td>

                        <td>
                            <input
                                id="reservation_time"
                                name="reservation_time"
                                type="time"
                                onChange={handleChange}
                                value={formData.reservation_time}
                                placeholder="HH:MM"
                                pattern="[0-9]{2}:[0-9]{2}"
                                />
                        </td>

                        <td>
                            <input
                                id="people"
                                name="people"
                                type="number"
                                min="1"
                                onChange={handleChange}
                                value={formData.people}
                                placeholder="Number of people"
                                />
                        </td>
                        <td>
                            <button type="submit" onClick={handleSubmit}>Submit</button>
                            <button type="cancel" onClick={goBack}>Cancel</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div>{errorDiv}</div>
        </form>
    )

}
