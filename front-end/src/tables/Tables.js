import { Route, Switch } from "react-router-dom";
import NewTable from "./NewTable";
import NotFound from "../layout/NotFound";

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
