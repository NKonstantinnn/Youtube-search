import React, {useState} from 'react';
import {List} from 'antd';
import {connect} from 'react-redux';
import {compose} from 'redux'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';
import {initialize} from 'redux-form';

import {fetchVideos, setIsSearchDefaulted} from '../../redux/actions/searhActions';
import {editFavouriteQuery, removeFavouriteQuery} from '../../redux/actions/currentUserActions';
import ListItem from './components/ListItem';
import FavouriteQueryModal from '../../modals/FavoutiteQueryModal';

import './style.scss';

const renderItem = (handleClick, handleEdit, handleRemove) => (item) => {
    return (
        <ListItem 
            name={item.name}
            onClick={() => handleClick(item)}
            onEdit={() => handleEdit(item)}
            onRemove={() => handleRemove(item)}
        />
    );
}

const FavouriteContainer = (props) => {

    const {user, history, isSearchDefaulted} = props;

    const [isShowFavouriteQueryModal, setIsShowFavouriteQueryModal] = useState(false);

    const handleToggleFavouriteQueryModal = () => {
        setIsShowFavouriteQueryModal((prev) => !prev);
    }

    const handleClickQuery = (data) => {
        const {query, maxResults, order} = data;
        props.fetchVideos(query, maxResults, order);

        if(isSearchDefaulted) {
            props.setIsSearchDefaulted(false);
        }
        history.push('/search');
    }

    const handleEditQuery = (data) => {
        props.reduxFormInitialize('FavouriteForm', data);
        handleToggleFavouriteQueryModal()
    }

    const handleRemoveQuery = (data) => {
        props.removeFavouriteQuery(data._id);
    }

    const editFavouriteQuery = async (favouriteQuery) => {
        await props.editFavouriteQuery(favouriteQuery);
        handleToggleFavouriteQueryModal();
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
                            handleEditQuery,
                            handleRemoveQuery
                        )}
                    />
                </div>
            }     

            <FavouriteQueryModal  
                isSave={false}
                isOpen={isShowFavouriteQueryModal}
                onToggle={handleToggleFavouriteQueryModal}
                onSubmit={editFavouriteQuery}
            />

        </div>
    );
}

FavouriteContainer.propTypes = {
    user: PropTypes.object,
    isSearchDefaulted: PropTypes.bool.isRequired,
    fetchVideos: PropTypes.func.isRequired,
    setIsSearchDefaulted: PropTypes.func.isRequired,
    editFavouriteQuery: PropTypes.func.isRequired,
    reduxFormInitialize:PropTypes.func.isRequired
};

const mapStateToProps = ({currentUser, search}) => {
    return {
        user: currentUser.user,
        isSearchDefaulted: search.isSearchDefaulted
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchVideos: (query, maxResults, order) => dispatch(fetchVideos(query, maxResults, order)),
        setIsSearchDefaulted: (value) => dispatch(setIsSearchDefaulted(value)),
        editFavouriteQuery: (query) => dispatch(editFavouriteQuery(query)),
        removeFavouriteQuery: (query) => dispatch(removeFavouriteQuery(query)),
        reduxFormInitialize: (form, data) => dispatch(initialize(form, data))
    };
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(FavouriteContainer);