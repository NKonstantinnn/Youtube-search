import React,{useState, useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Col as AntdCol } from 'antd';
import {Row as StrapRow} from 'reactstrap'
import {fetchVideos, setIsSearchDefaulted} from '../../redux/actions/searhActions';
import {addFavouriteQuery} from '../../redux/actions/currentUserActions';
import {changeActiveTab} from '../../redux/actions/appActions';

import SearchForm from './containers/SearchForm';
import FilterPanel from './components/FilterPanel';
import VideoCard from './components/VideoCard';
import ViewCase from '../.../../../assets/types/ViewCase';
import FavouriteQueryModal from '../../modals/FavoutiteQueryModal';
import Tab from '../../assets/types/Tab';

import './style.scss';

const SearchContainer = (props) => {
    const {isSearchDefaulted, query, videos, changeActiveTab} = props;

    useEffect(() => {
        changeActiveTab(Tab.SEARCH);
    }, [changeActiveTab])

    const [viewSCase, setViewCase] = useState(ViewCase.GRID);
    const [isShowFavouriteQueryModal, setIsShowFavouriteQueryModal] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

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
        setIsPopoverOpen(true);
    }

    const hidePopover = (e) => {
        e.stopPropagation();
        setIsPopoverOpen(false);
    }

    return (
        <div className="search-container" onClick={hidePopover}>
            <AntdCol 
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
                    <SearchForm 
                        onSubmit={handleSearch} 
                        isPopoverOpen={isPopoverOpen} 
                        isShowHeart={query !== ""}
                        handleToggleFavouriteQueryModal={handleToggleFavouriteQueryModal}
                    />
                    { !isSearchDefaulted && (
                        <>
                            <FilterPanel 
                                query={query} 
                                countVideos={videos.length}
                                viewCase={viewSCase} 
                                toggleViewCase={toggleViewCase}
                            />
                            <StrapRow xs="12" sm="6" md="4" lg="3">
                                {
                                    videos.map((video) => (
                                        <VideoCard key={video.id} video={video} viewCase={viewSCase} />
                                    ))
                                }
                            </StrapRow>
                        </>)
                    }
                </div>
            </AntdCol>

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
    query: PropTypes.string,
    fetchVideos: PropTypes.func.isRequired,
    addFavouriteQuery: PropTypes.func.isRequired,
    setIsSearchDefaulted: PropTypes.func.isRequired,
    changeActiveTab: PropTypes.func.isRequired
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
    setIsSearchDefaulted,
    changeActiveTab
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);