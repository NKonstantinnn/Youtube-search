import React from 'react';
import {Route, Switch} from 'react-router-dom';

// import pages
import SignInContainer from '../../SignInContainer';

const Routes = () => {
    return (
        <Switch>
            <Route path="/signin" component={SignInContainer} />
            <Route render={() => (<h2>Page not found</h2>)} />
        </Switch>
    );
}

export default Routes;