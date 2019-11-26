import React from 'react';
import PropTypes from 'prop-types';
import {Icon} from 'antd';

import ViewCase from '../../../../assets/types/ViewCase';

import './style.scss';

const FilterPanel = (props) => {

    const {query, countVideos, toggleViewCase, viewCase} = props;
    return (
        <div className="filter-panel">
            <div className="filter-panel__info">
                <span className="filter-panel__query">Видео по запросу "{query}"</span>
                <span className="filter-panel__count-videos">{countVideos}</span>
            </div>
            <div className="filter-panel__view-switcher">
                <span 
                    className={`filter-panel__view-case ${viewCase === ViewCase.LIST ? "filter-panel__view-case_active" : ""}`}
                    onClick={() => toggleViewCase(ViewCase.LIST)}
                >
                    <Icon type="bars" />
                </span>
                <span 
                    className={`filter-panel__view-case ${viewCase === ViewCase.GRID ? "filter-panel__view-case_active" : ""}`}
                    onClick={() => toggleViewCase(ViewCase.GRID)} 
                >
                    <Icon type="appstore" />
                </span>
            </div>
        </div>
    );
}

FilterPanel.propTypes = {
    query: PropTypes.string,
    countVideos: PropTypes.number.isRequired,
    toggleViewCase: PropTypes.func.isRequired,
    viewCase: PropTypes.oneOf(Object.keys(ViewCase)).isRequired
};

export default FilterPanel;