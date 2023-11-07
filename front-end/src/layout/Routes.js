import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';
import { BookReservation } from '../components/BookReservation';
import { BookSeat } from '../components/BookSeat';
import { ReservationEdit } from '../components/ReservationEdit';
import { SearchReservation } from '../components/SearchReservation';
import { TableMaker } from '../components/tables/TableMaker';
import Dashboard from '../dashboard/Dashboard';
import { today } from '../utils/date-time';
import useQuery from '../utils/useQuery';
import NotFound from './NotFound';

function Routes() {
  const queries = useQuery();
  const date = queries.get('date');

  return (
    <Switch>
      <Route exact={true} path='/'>
        <Redirect to={'/dashboard'} />
      </Route>
      <Route exact={true} path='/reservations'>
        <Redirect to={'/dashboard'} />
      </Route>
      <Route path='/dashboard'>
        {/* Takes in todays date by default if no date query is present in URL */}
        <Dashboard date={date || today()} />
      </Route>
      <Route path='/reservations/new'>
        <BookReservation />
      </Route>
      <Route path='/reservations/:reservation_id/seat'>
        <BookSeat />
      </Route>
      <Route path='/reservations/:reservation_id/edit'>
        <ReservationEdit />
      </Route>
      <Route path='/tables/new'>
        <TableMaker />
      </Route>
      <Route path='/search'>
        <SearchReservation />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
