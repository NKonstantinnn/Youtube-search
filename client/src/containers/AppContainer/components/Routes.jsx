import React from 'react';
import {Route, Switch} from 'react-router-dom';

// import pages
import SignInContainer from '../../SignInContainer';
import SearchContainer from '../../SearchContainer';
import FavouriteContainer from '../../FavouriteContainer';

const Routes = () => {
    return (
        <Switch>
            <Route path="/signin" component={SignInContainer} />
            <Route exact path="/" component={SearchContainer} />
            <Route path='/favourite' component={FavouriteContainer} />
            <Route render={() => (<h2>Page not found</h2>)} />
        </Switch>
    );
}

export default Routes;