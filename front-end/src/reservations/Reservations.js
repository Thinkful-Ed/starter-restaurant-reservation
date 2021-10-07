//this is where the routinfg for reservations 
import { Switch, Route } from "react-router";
import NotFound from "../layout/NotFound";
import NewReservation from "./NewReservation";
import SeatReservation from "../tables/SeatReservation";

//{/*<Edit />*/}

function Reservations() {
    return (
      <main>
        <Switch>
          <Route path={"/reservations/new"}>
            <NewReservation />
          </Route>
          <Route path={"/reservations/:reservation_id/edit"}>
            {/*<Edit />*/}
          </Route>
          <Route path={"/reservations/:reservation_id/seat"}>
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