import {
    SHOW_MODAL,
    HIDE_MODAL
} from '../actions/modalActions';

import _ from 'lodash';

const initialState = {};

export default function reducer( state = initialState, action ) {
    const name = _.get(action.params, 'name', null);
    const data = _.get(action.params, 'data', null);
    switch (action.type) {
        case HIDE_MODAL:
            return {...state, [name]: {show: false, data: data}};
            // return Object.assign({}, state, {[action.params.name]: {show: false}});
        case SHOW_MODAL:
            return {...state, [name]: {show: true, data: data}};
            // return Object.assign({}, state, {[name]: Object.assign({}, action.payload, {show: true})});
        default:
            return state
    }
}