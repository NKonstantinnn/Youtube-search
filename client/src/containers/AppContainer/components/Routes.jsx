import React from 'react';
import {Route, Switch} from 'react-router-dom';

// import pages
import AuthContainer from '../../AuthContainer';
import SearchContainer from '../../SearchContainer';
import FavouriteContainer from '../../FavouriteContainer';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={SearchContainer} />
            <Route path="/signup" render={props => <AuthContainer {...props} isSignUp />} />
            <Route path="/signin" render={props => <AuthContainer {...props} isSignUp={false} />} />
            <Route path='/favourite' component={FavouriteContainer} />
            <Route render={() => (<h2>Page not found</h2>)} />
        </Switch>
    );
}

export default Routes;