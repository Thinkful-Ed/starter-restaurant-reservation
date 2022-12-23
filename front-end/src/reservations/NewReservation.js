function NewReservation() {
  return (
    <div>
      <h1>NEW RESERVATIONS</h1>
      <form>
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
