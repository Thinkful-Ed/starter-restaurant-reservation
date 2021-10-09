import React, {useState} from "react";
import { useHistory} 
    //useParams} 
    from "react-router-dom"
import {postReservation} from "../utils/api"
//import {formatAsTime, today} from "../utils/date-time"
import ErrorAlert from "../layout/ErrorAlert";

function ReservationForm(){
    //const {reservation_id} = useParams()
    const initialFormState= {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 1,
    }

    const [form, setForm] = useState({...initialFormState})
    const [reservationsError, setReservationsError] = useState([]);
    const history= useHistory();


    const handleChange = ({target}) => {
        let value = target.value;
        let name =target.name;

        if(name==="people" && typeof value === "string"){
            value = +value
        }
        setForm({
            ...form, 
            [name]: value,
        })
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        if(businessHours() !== false){
            try{
                postReservation(form)
                .then(()=> history.push(`/dashboard?date=${form.reservation_date}`))
            }
            catch(error){
                console.log(error)
            }
        } 
    }


    const businessHours = async()=> {
        const reservationDate = new Date(`${form.reservation_date}T${form.reservation_time}:00.000`);
        const today = new Date();
        const allErrors = [];

        if(reservationDate < today){
            allErrors.push({message: "Reservations must be made for a future date" })
        }

        if(reservationDate.getDay()===2){
            allErrors.push({message: "The restaurant is closed on Tuesdays"})
        }

        if(reservationDate.getHours() < 10 || 
        (reservationDate.getHours() === 10 && reservationDate.getMinutes()<30) ||
        reservationDate.getHours() >= 23 || 
        (reservationDate.getHours()===22 && reservationDate.getMinutes() >= 30))
            {allErrors.push({message: "The restaurant opens at 10:30am"})
        } 
        else if((reservationDate.getHours()===21 && reservationDate.getMinutes() >=30) ||
        (reservationDate.getHours()===22 && reservationDate.getMinutes() <30))
            {allErrors.push({message: "No reservations available after 9:30pm."})
        }

        setReservationsError(allErrors)
        return allErrors.length===0
    }


    const errorList = () => {
        return reservationsError.map((err, index) => <ErrorAlert key={index} error={err} />);
      };
       
      
    return (
        <>
        <h1>Make a Reservation</h1>
        <form onSubmit = {handleSubmit}>
            {errorList()}
            <div className="container">
            <div className="form-group">
                <label htmlFor="first_name">
                    First Name:
                    <input 
                        type="text" 
                        id="first_name" 
                        name="first_name"
                        placeholder="First Name"
                        onChange = {handleChange}
                        required = {true}
                        value = {form.first_name}
                    />
                </label>
            </div>
            
            <div className="form-group">
                <label htmlFor="last_name">
                    Last Name:
                    <input 
                        type="text" 
                        id="last_name" 
                        name="last_name"
                        placeholder= "Last Name"
                        onChange = {handleChange}
                        required = {true}
                        value = {form.last_name}
                    />
                </label>
            </div>

            <div className="form-group">
                <label htmlFor="mobile_number">
                    Phone number: 
                    <input 
                        type="tel" 
                        id="telNo" 
                        name="mobile_number" 
                        placeholder="1234567890"
                        onChange = {handleChange}
                        required = {true}
                        value = {form.mobile_number}
                    />
                </label>
            </div>

            <div className="form-group">
                <label htmlFor="reservation_date">
                    Reservation Date: 
                    <input 
                        type="date" 
                        id="reservation_date" 
                        name="reservation_date"
                        onChange= {handleChange}
                        required = {true}
                        value = {form.reservation_date}
                    />
                </label>
            </div>

            <div className="form-group">
                <label htmlFor="reservation_time">
                    Reservation Time: 
                    <input 
                        type="time" 
                        id="reservation_time" 
                        name="reservation_time"
                        onChange = {handleChange}
                        required = {true}
                        value = {form.reservation_time} 
                    />
                </label>
            </div>

            <div className="form-group">
                <label htmlFor="people">
                    Number of People in Party: 
                    <input 
                        type="number" 
                        id="people" 
                        name="people"
                        min="1" 
                        required = {true}
                        onChange= {handleChange}
                        value= {form.people}
                    />
                </label>
            </div>
            </div>
            <button type="submit" className="btn btn-primary" >Submit</button>
            <button type="button" className="btn btn-secondary" onClick={()=> history.goBack()}>Cancel</button>
            
 
        </form>
        </>
    )
 /*
 any error messages returned from API
*/
}


export default ReservationForm;