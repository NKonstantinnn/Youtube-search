import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom'

import Header from '../../components/Header';
import Routes from '../../components/Routes';
import {fetchCurrentUser} from '../../redux/actions';

import './style.scss';

function Main(props) {
    const {
        isFetching, isAuth, fetchCurrentUser, history
    } = props;

    useEffect(() => {
        fetchCurrentUser(history);
    }, []);

    if(isFetching) return (<div>Loading...</div>);
    
    return (
        <div className="main">
            { isAuth && <Header /> }
            <Routes />
        </div>
    );
}

Main.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    isAuth: PropTypes.bool.isRequired,
    fetchCurrentUser: PropTypes.func.isRequired
}

const mapStateToProps = ({currentUser}) => {
    const {isFetching, isAuth} = currentUser;
    return {
        isFetching,
        isAuth
    };
};

const mapDispatchToProps = {
    fetchCurrentUser
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Main);