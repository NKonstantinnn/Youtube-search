import PropTypes from 'prop-types';

const VideoPropTypes = PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    channelTitle: PropTypes.string.isRequired,
    viewCount: PropTypes.string.isRequired
});

export default VideoPropTypes;