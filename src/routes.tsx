import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Landing from './pages/Landing';
import FosterHomesMap from './pages/FosterHomesMap';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Landing} />
        <Route path='/app' component={FosterHomesMap} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;