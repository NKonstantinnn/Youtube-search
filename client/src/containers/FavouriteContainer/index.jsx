import React from 'react';
import {List} from 'antd';
import {connect} from 'react-redux';
import {compose} from 'redux'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';

import {fetchVideos, setIsSearchDefaulted} from '../../redux/actions/searhActions';
import ListItem from './components/ListItem';

import './style.scss';

const renderItem = (handleClick, handleChange, handleRemove) => (item) => {
    return (
        <ListItem 
            name={item.name}
            onClick={() => handleClick(item)}
            onChange={handleChange}
            onRemove={handleRemove}
        />
    );
}

const FavouriteContainer = (props) => {

    const {user, history, fetchVideos, isSearchDefaulted, setIsSearchDefaulted} = props;

    const handleClickQuery = (data) => {
        const {query, maxResults, order} = data;
        fetchVideos(query, maxResults, order);

        if(isSearchDefaulted) {
            setIsSearchDefaulted(false);
        }
        history.push('/search');
    }

    return (
        <div className="favourite-container">
            <h1 className="favourite-container__title">Избранное</h1>
            {
                !(user && user.favouriteQueries && user.favouriteQueries.length) &&
                <div className="favourite-container__message">
                    У вас нет избранных запросов
                </div>
            }
            {
                (user && user.favouriteQueries && user.favouriteQueries.length) &&
                <div className="favourite-container__list">
                    <List 
                        bordered
                        dataSource={user.favouriteQueries}
                        renderItem={renderItem(
                            handleClickQuery, 
                            () => { console.log('change') },
                            () => { console.log('remove') }
                        )}
                    />
                </div>
            }     

        </div>
    );
}

FavouriteContainer.propTypes = {
    user: PropTypes.object.isRequired,
    isSearchDefaulted: PropTypes.bool.isRequired
};

const mapStateToProps = ({currentUser, search}) => {
    return {
        user: currentUser.user,
        isSearchDefaulted: search.isSearchDefaulted
    }
}

const mapDispatchToProps = {
    fetchVideos,
    setIsSearchDefaulted
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(FavouriteContainer);