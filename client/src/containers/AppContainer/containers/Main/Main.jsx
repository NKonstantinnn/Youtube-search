import React from 'react';

import Header from '../../components/Header';
import Routes from '../../components/Routes';

import './style.scss';

const Main = () => {
    return (
        <div className="main">
            <Header />
            <Routes />
        </div>
    );
}

export default Main;