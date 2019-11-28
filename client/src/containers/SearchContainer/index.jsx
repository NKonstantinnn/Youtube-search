import React,{useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import {fetchVideos} from './redux/actions';

import SearchForm from './containers/SearchForm';
import FilterPanel from './components/FilterPanel';
import VideoCard from './components/VideoCard';
import ViewCase from '../.../../../assets/types/ViewCase';
import FavouriteQueryModal from '../../modals/FavoutiteQueryModal';

import './style.scss';

const SearchContainer = (props) => {
    const {isFirstSearch, query, videos, fetchVideos} = props;

    const [viewSCase, setViewCase] = useState(ViewCase.GRID);
    const [isShowFavouriteQueryModal, setIsShowFavouriteQueryModal] = useState(false);

    const handleSearch = ({query}) => {
        if(query) {
            fetchVideos(query);
        }
    }

    const toggleViewCase = (newViewCase) => {
        setViewCase(newViewCase);
    }

    const handleToggleFavouriteQueryModal = () => {
        setIsShowFavouriteQueryModal((prev) => !prev);
    }

    const saveQuery = () => {
        console.log('save query')
        handleToggleFavouriteQueryModal();
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
                    <button onClick={handleToggleFavouriteQueryModal}>Добавить в избранное</button>
                    { !isFirstSearch && (
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
                    onSubmit={saveQuery}
                    initialValues={{query, order: 'relevance', maxResults: 12 }} 
                />)
            }
        </div>
    );
}

SearchContainer.propTypes = {
    isFirstSearch: PropTypes.bool.isRequired,
    videos: PropTypes.array.isRequired,
    query: PropTypes.string
};

const mapStateToProps = ({search}) => {
    const { isFirstSearch, videos, query } = search;
    return {
        isFirstSearch,
        videos,
        query
    };
}

const mapDispatchToProps = {
    fetchVideos
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);