import { Route, Switch } from "react-router-dom";
import NewTable from "./NewTable";
import NotFound from "../layout/NotFound";

function Tables(inputData) {

  
  return (
  <>
    <main>
      <Switch>
        <Route path={"/tables/new"}>
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
