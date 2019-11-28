import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
 
import store from '../../redux/store';
import Main from './containers/Main/Main';

import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';

const AppContainer = () => {
    return (
        <>
            <Provider store={store}>
                <BrowserRouter>
                   <Main />
                </BrowserRouter>
            </Provider>
        </>
    );
}

export default AppContainer;