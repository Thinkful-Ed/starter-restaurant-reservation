import { createReservation, updateReservation } from "../../utils/api";
import { useState } from "react";
import ErrorAlert from "../ErrorAlert";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";

const Form = ({reservation}) => {


    const [formData, setFormData] = useState({...reservation})

    const history = useHistory();

    const { reservation_id } = useParams();

    const [reservationsError, setReservationsError] = useState(null);

//establishes reservation object that will change as form inputs are filled out 

  //   const [reservation, setreservation] = useState({first_name: reservation.first_name,
  //   last_name: reservation.last_name,
  //   mobile_number: reservation.mobile_number,
  //   reservation_date: reservation.reservation_date,
  //   reservation_time: reservation.reservation_time,
  //   people: reservation.people,
  // })

//destructures reservation object by its keys for later reference 



  
  function handleCancel() {
    history.goBack();
  }

    function handleUpdateSubmit(e) {
      e.preventDefault();
      const abortController = new AbortController();
      setReservationsError(null)
      updateReservation({...formData, people: parseInt(formData.people)}, reservation_id, abortController.signal)
      .then(() => {
        history.goBack();
      })
      .catch(setReservationsError);
    }
     
    function handleCreateSubmit(e) {
        e.preventDefault();
        const abortController = new AbortController();
        setReservationsError(null);
        createReservation({...formData, people: parseInt(formData.people)}, abortController.signal)
          .then((createdReservation) => {
            setNewRes(createdReservation)
            history.push(`/dashboard?date=${reservation.reservation_date}`);
          })
          .catch(setReservationsError);
        return () => abortController.abort();
    }

    function handleChange(event) {
        setFormData({...formData, [event.target.name]: event.target.value})
      }
console.log(formData.reservation_date)
    return (
        <div>
        <ErrorAlert error={reservationsError} />
        <form onSubmit={reservation_id ? handleUpdateSubmit : handleCreateSubmit}>
      <label htmlFor="first_name">First Name</label>
      <input
        type="text"
        className="form-control"
        id="first_name"
        name="first_name"
        value={formData.first_name}
        placeholder={formData.first_name ? formData.first_name : "First Name"}
        onChange={handleChange}
      ></input>
      <label htmlFor="last_name">Last Name</label>
      <input
        type="text"
        className="form-control"
        id="last_name"
        name="last_name"
        value={formData.last_name}
        placeholder={formData.last_name ? formData.last_name : "Last Name"}
        onChange={handleChange}
      ></input>
      <label htmlFor="mobile_number">Mobile Number</label>
      <input
        type="tel"
        className="form-control"
        id="mobile_number"
        name="mobile_number"
        value={formData.mobile_number}
        placeholder={formData.mobile_number ? formData.mobile_number : "Mobile Number"}
        onChange={handleChange}
      ></input>
      <label htmlFor="reservation_date">Reservation Date</label>
      <input
        type="date"
        className="form-control"
        id="reservation_date"
        name="reservation_date"
        value={formData.reservation_date.slice(0, 10)}
        placeholder={formData.reservation_date ? formData.reservation_date : "YYYY-MM-DD"}
        pattern="\d{4}-\d{2}-\d{2}"
        onChange={handleChange}
      ></input>
      <label htmlFor="reservation_time">Reservation Time</label>
      <input
        type="time"
        className="form-control"
        id="reservation_time"
        name="reservation_time"
        value={formData.reservation_time}
        placeholder={formData.reservation_time ? formData.reservation_time : "HH:MM"}
        pattern="[0-9]{2}:[0-9]{2}"
        onChange={handleChange}
      ></input>
      <label htmlFor="people">Number of People</label>
      <input
        type="number"
        className="form-control"
        id="people"
        name="people"
        value={formData.people}
        placeholder={formData.people ? formData.people : "Number of People"} 
        onChange={handleChange}
      ></input>
      <button className="btn btn-secondary" onClick={handleCancel}>
        Cancel
      </button>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
    </div>
      ); 
}
 
export default Form;