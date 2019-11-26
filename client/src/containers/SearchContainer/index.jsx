import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Col } from 'antd';
import {fetchVideos} from './redux/actions';

import SearchForm from './containers/SearchForm';

import './style.scss';

const SearchContainer = ({isFirstSearch, fetchVideos}) => {

    const handleSearch = ({query}) => {
        if(query) {
            fetchVideos(query);
        }
    }

    return (
        <div className="search-container">
            <Col 
                span={isFirstSearch ? 18 : 24}
                offset={isFirstSearch ? 3 : 0}
            >
                <div className={`search-container__content 
                    ${isFirstSearch ? "search-container__content_defaulted" : ""}`}
                >
                    <h1 className={`search-container__title 
                        ${isFirstSearch ? "search-container__title_big" : "search-container__title_small"}`}
                    >
                        Поиск видео
                    </h1>
                    <SearchForm onSubmit={handleSearch} />
                </div>
            </Col>
        </div>
    );
}

SearchContainer.propTypes = {
    isFirstSearch: PropTypes.bool.isRequired
};

const mapStateToProps = ({search}) => {
    const {isFirstSearch} = search;
    return {
        isFirstSearch
    };
}

const mapDispatchToProps = {
    fetchVideos
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);