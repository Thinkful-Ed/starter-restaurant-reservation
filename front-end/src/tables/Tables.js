import { Route, Switch } from "react-router-dom";
import NewTable from "./NewTable";
import NotFound from "../layout/NotFound";

/*component routes requests made to /tables/new*/
function Tables() {
  //JSX
  return (
    <>
      <main>
        <Switch>
          <Route exact={true} path={"/tables/new"}>
            <NewTable />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </main>
    </>
  );
}
export default Tables;
