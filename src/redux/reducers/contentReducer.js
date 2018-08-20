// import _ from 'lodash';

import {
    REQUEST_CONTENT,
    RECEIVE_CONTENT,
} from '../actions/contentActions';

const initialState = {
    "patients": {
        data: [],
        current: {}
    },
    "blockbookings": {
        data: [],
        current: {}
    },
    "appointments": {
        data: [],
        current: {}
    },
    isLoading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case REQUEST_CONTENT:
            return {...state, isLoading: true};
        case RECEIVE_CONTENT:
            const {key, data, isCurrent} = action.params;
            let newData =  state[key];
            if (isCurrent) newData.current = data; else newData.data = data;
            return {...state, [key]: newData};
        default:
            return state;
    }
}