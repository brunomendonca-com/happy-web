import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import FosterHomesMap from './pages/FosterHomesMap';
import CreateFosterHome from './pages/CreateFosterHome';
import FosterHome from './pages/FosterHome';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={FosterHomesMap} />
        <Route path="/fosterhomes/create" component={CreateFosterHome} />
        <Route path="/fosterhomes/:id" component={FosterHome} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
