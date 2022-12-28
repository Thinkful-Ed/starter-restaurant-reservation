import { useHistory } from "react-router-dom";

function NewReservation() {
  const history = useHistory();

  async function onSubmit(event) {
    event.preventDefault();
    console.log();
    console.log("last_name:", event.target.last_name.value);
    console.log("mobile_number:", event.target.mobile_number.value);
    console.log("reservation_date:", event.target.reservation_date.value);
    console.log("reservation_time:", event.target.reservation_time.value);
    console.log("people:", event.target.people.value);

    await fetch("http://localhost:5001/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          first_name: "first",
          last_name: "last",
          mobile_number: "800-555-1212",
          reservation_date: "2025-01-01",
          reservation_time: "17:30",
          people: 2,
        },
      }),

      // body: JSON.stringify({
      //   first_name: event.target.first_name.value,
      //   mobile_number: event.target.mobile_number.value,
      //   reservation_date: event.target.reservation_date.value,
      //   reservation_time: event.target.reservation_time.value,
      //   people: event.target.people.value,
      // }),
    });
  }

  return (
    <div>
      <h1>NEW RESERVATIONS</h1>
      <form onSubmit={onSubmit}>
        <input name="first_name"></input>

        <input name="last_name"></input>

        <input name="mobile_number"></input>

        <input name="reservation_date"></input>

        <input name="reservation_time"></input>

        <input name="people"></input>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewReservation;
