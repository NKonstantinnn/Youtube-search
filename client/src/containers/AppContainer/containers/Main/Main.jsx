import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom'

import Header from '../../components/Header';
import Routes from '../../components/Routes';
import {fetchCurrentUser} from '../../../../redux/actions/currentUserActions';

import './style.scss';
import Tab from '../../../../assets/types/Tab';

function Main(props) {
    const {
        isFetching, isAuth, fetchCurrentUser, history, activeTab
    } = props;

    useEffect(() => {
        fetchCurrentUser(history);
    }, []);

    if(isFetching) return (<div>Loading...</div>);
    
    return (
        <div className="main">
            { isAuth && <Header activeTab={activeTab} /> }
            <Routes />
        </div>
    );
}

Main.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    isAuth: PropTypes.bool.isRequired,
    fetchCurrentUser: PropTypes.func.isRequired,
    activeTab: PropTypes.oneOf(Object.keys(Tab)).isRequired
}

const mapStateToProps = ({currentUser, app}) => {
    const {isFetching, isAuth} = currentUser;
    return {
        isFetching,
        isAuth,
        activeTab: app.activeTab
    };
};

const mapDispatchToProps = {
    fetchCurrentUser
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Main);