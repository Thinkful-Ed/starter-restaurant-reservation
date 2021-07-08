import { useState } from "react";
import Form from "./Form";


const NewReservation = () => {

  
  const [newRes, setNewRes] = useState({first_name: "",
  last_name: "",
  mobile_number: "",
  reservation_date: "",
  reservation_time: "",
  people: "",
})

 
//   async function submitHandler(e) {
//     e.preventDefault();
//   try {
//     const response = await fetch(`${API_BASE_URL}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({data: newRes})
//     })
//   }
//   catch(error) {
//     setReservationsError(error)
//   }
//   await response.json();
//   history.push(`/dashboard?date=${newRes.reservation_date}`)
// }

  // const submitHandler = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const body = {
  //       data: {
  //         first_name,
  //         last_name,
  //         mobile_number,
  //         reservation_date,
  //         reservation_time,
  //         people,
  //       },
  //     };
  //     await fetch(`${API_BASE_URL}/reservations`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(body),
  //     });
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  return (
    <div> 
      <h1>Reservation Form</h1>
            <hr></hr>
    <Form reservation={newRes} setNewRes={setNewRes}/>
    </div>
  );
}

export default NewReservation;
