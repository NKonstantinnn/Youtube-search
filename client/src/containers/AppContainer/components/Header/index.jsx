import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import Tab from '../../../../assets/types/Tab';

import './style.scss';

const Header = ({activeTab, history, handleSignOut}) => {
    return (
        <div className="header">
            <div className="header__content">
                <div className="header__menu-block">
                    <div className="header__menu-item">
                        <Link to="/">
                            <img className="header__logo" src="/images/logo.png" alt="logo" />
                        </Link>
                    </div>
                    <div className={`header__menu-item ${activeTab === Tab.SEARCH ? "header__menu-item_active" : ""}`}>
                        <Link to="/">Поиск</Link>
                    </div>
                    <div className={`header__menu-item ${activeTab === Tab.FAVOURITE ? "header__menu-item_active" : ""}`}>
                        <Link to="/favourite">Избранное</Link>
                    </div>
                </div>
                <div className="header__menu-block">
                    <span 
                        className="header__menu-item header__signout"
                        onClick={() => handleSignOut(history)}
                    >
                        Выйти
                    </span>
                </div>
            </div>
        </div>
    );
}

Header.propTypes = {
    activeTab: PropTypes.oneOf(Object.keys(Tab)).isRequired,
    handleSignOut: PropTypes.func.isRequired
}

export default withRouter(Header)