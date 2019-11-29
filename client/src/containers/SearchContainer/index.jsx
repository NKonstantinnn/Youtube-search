import React,{useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import {fetchVideos, setIsSearchDefaulted} from '../../redux/actions/searhActions';
import {addFavouriteQuery} from '../../redux/actions/currentUserActions';

import SearchForm from './containers/SearchForm';
import FilterPanel from './components/FilterPanel';
import VideoCard from './components/VideoCard';
import ViewCase from '../.../../../assets/types/ViewCase';
import FavouriteQueryModal from '../../modals/FavoutiteQueryModal';

import './style.scss';

const SearchContainer = (props) => {
    const {isSearchDefaulted, query, videos} = props;

    const [viewSCase, setViewCase] = useState(ViewCase.GRID);
    const [isShowFavouriteQueryModal, setIsShowFavouriteQueryModal] = useState(false);

    const handleSearch = ({query}) => {
        if(query) {
            props.fetchVideos(query);

            if(isSearchDefaulted) {
                props.setIsSearchDefaulted(false);
            }
        }
    }

    const toggleViewCase = (newViewCase) => {
        setViewCase(newViewCase);
    }

    const handleToggleFavouriteQueryModal = () => {
        setIsShowFavouriteQueryModal((prev) => !prev);
    }

    const saveFavouriteQuery = async (favouriteQuery) => {
        await props.addFavouriteQuery(favouriteQuery);
        handleToggleFavouriteQueryModal();
    }

    return (
        <div className="search-container">
            <Col 
                span={isSearchDefaulted ? 18 : 24}
                offset={isSearchDefaulted ? 3 : 0}
            >
                <div className={`search-container__content 
                    ${isSearchDefaulted ? "search-container__content_defaulted" : ""}`}
                >
                    <h1 className={`search-container__title 
                        ${isSearchDefaulted ? "search-container__title_big" : "search-container__title_small"}`}
                    >
                        Поиск видео
                    </h1>
                    <SearchForm onSubmit={handleSearch} />
                    <button onClick={handleToggleFavouriteQueryModal}>Добавить в избранное</button>
                    { !isSearchDefaulted && (
                        <>
                            <FilterPanel 
                                query={query} 
                                countVideos={videos.length}
                                viewCase={viewSCase} 
                                toggleViewCase={toggleViewCase}
                            />
                            <Row className="search-container__video-list" gutter={[16, 20]}>
                                {
                                    videos.map((video) => (
                                        <VideoCard key={video.id} video={video} viewCase={viewSCase} />
                                    ))
                                }
                            </Row>
                        </>)
                    }
                </div>
            </Col>

            {
               isShowFavouriteQueryModal && (<FavouriteQueryModal  
                    isSave={true}
                    isOpen={isShowFavouriteQueryModal}
                    onToggle={handleToggleFavouriteQueryModal}
                    onSubmit={saveFavouriteQuery}
                    initialValues={{query, order: 'relevance', maxResults: 12 }} 
                />)
            }
        </div>
    );
}

SearchContainer.propTypes = {
    isSearchDefaulted: PropTypes.bool.isRequired,
    videos: PropTypes.array.isRequired,
    query: PropTypes.string
};

const mapStateToProps = ({search}) => {
    const { isSearchDefaulted, videos, query } = search;
    return {
        isSearchDefaulted,
        videos,
        query
    };
}

const mapDispatchToProps = {
    fetchVideos,
    addFavouriteQuery,
    setIsSearchDefaulted
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);