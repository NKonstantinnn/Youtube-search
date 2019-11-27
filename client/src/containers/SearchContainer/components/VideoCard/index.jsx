import React from 'react';
import {Col} from 'antd';
import PropTypes from 'prop-types';

import ViewCase from '../../../../assets/types/ViewCase';
import VideoPropTypes from '../../../../assets/types/Video';

import './style.scss';

const VideoCard = ({viewCase, video}) => {
    const isViewCaseList = viewCase === ViewCase.LIST;
    return (
        <Col span={isViewCaseList ? 24 : 6}>
            <div className={`video-card ${isViewCaseList ? "video-card_view-case-list" : ""}`} >
                <iframe 
                    className={`video-card__video ${isViewCaseList ? "video-card__video_view-case-list" : ""}`} 
                    src={`https://www.youtube.com/embed/${video.id}`} 
                    title={video.id}
                />
                <div className="video-card__info">
                    <div className="video-card__title">{video.title}</div>
                    <div className="video-card__description">
                        <span className="video-card__chanel-title">{video.channelTitle}</span>
                        <br />{video.viewCount} просмотров
                    </div>
                </div>
            </div>
        </Col>
    );
}

VideoCard.propTypes = {
    video: VideoPropTypes,
    viewCase: PropTypes.oneOf(Object.keys(ViewCase)).isRequired
};

export default VideoCard;