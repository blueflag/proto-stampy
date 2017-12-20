import React from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';

import AppHandler from 'components/AppHandler';
import ErrorHandler from 'components/ErrorHandler';
import ContentsPage from 'components/ContentsPage';

//import ButtonExample from 'component/button/ButtonExample';

export const routesList = <Switch>
    <Route exact path="/" component={ContentsPage} />
    {/*<Route path="/component/Button" component={ButtonExample}/>*/}
    <Route component={ErrorHandler} />
</Switch>;

const Routes = <HashRouter>
    <AppHandler>
        {routesList}
    </AppHandler>
</HashRouter>;

export default Routes;
