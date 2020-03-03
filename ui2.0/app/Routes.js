import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes.json';
import App from './containers/App';
import Home from './containers/Home';
import RegistrationInstruction from './containers/RegistrationInstruction';
import Preparation from './containers/Preparation';

export default () => (
  <App>
    <Switch>
      <Route exact path={routes.HOME} component={Home} />
      <Route
        path={routes.REGISTER_INSTRUCTION}
        component={RegistrationInstruction}
      />
      <Route path={routes.PREPARATION} component={Preparation} />
    </Switch>
  </App>
);
