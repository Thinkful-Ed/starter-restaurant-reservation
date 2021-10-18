//this is where the routinfg for reservations
import { Switch, Route } from "react-router";
import NotFound from "../layout/NotFound";
import NewReservation from "./NewReservation";
import SeatReservation from "./SeatReservation";
import EditReservation from "./EditReservation";

//{/*/}
/*component routes requests made to /reservations with other params*/
function Reservations() {
  return (
    <main>
      <Switch>
        <Route exact={true} path={"/reservations/new"}>
          <NewReservation />
        </Route>
        <Route exact={true} path={"/reservations/:reservation_id/edit"}>
          <EditReservation />
        </Route>
        <Route exact={true} path={"/reservations/:reservation_id/seat"}>
          <SeatReservation />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </main>
  );
}

export default Reservations;
