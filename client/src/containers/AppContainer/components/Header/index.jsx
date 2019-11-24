import React from 'react';
import {Link} from 'react-router-dom';

import './style.scss';

const Header = () => {
    return (
        <div className="header">
            <div className="header__content">
                <div className="header__menu-block">
                    <div className="header__menu-item">
                        <Link to="/search">
                            <img className="header__logo" src="/images/logo.png" alt="logo" />
                        </Link>
                    </div>
                    <div className="header__menu-item">
                        <Link to="/search">Поиск</Link>
                    </div>
                    <div className="header__menu-item">
                        <Link to="/favourite">Избранное</Link>
                    </div>
                </div>
                <div className="header__menu-block">
                    <span className="header__menu-item">Выйти</span>
                </div>
            </div>
        </div>
    );
}

export default Header