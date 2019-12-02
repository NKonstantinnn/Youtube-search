import {handleActions} from 'redux-actions';

import {changeActiveTab} from '../actions/appActions';
import Tab from '../../assets/types/Tab';

const defaultState = {
   activeTab: Tab.SEARCH
};

export default handleActions({
    [changeActiveTab]:(state, {payload}) => {
        return {
            ...state,
            activeTab: payload
        };
    }
}, defaultState);