import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
 
import store from './redux/store';
import Main from './containers/Main';

import 'antd/dist/antd.css';
import './style.scss';

const AppContainer = () => {
    return (
        <div>
            <Provider store={store}>
                <BrowserRouter>
                   <Main />
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default AppContainer;