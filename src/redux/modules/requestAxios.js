import {createAxiosInstance} from '../modules/core';
import {receiveContent, testDatabase} from "../actions/contentActions";
import _ from 'lodash';
import store from '../../app/store';
import {notify} from 'reapop';

// const TOTAL = 36;

// AXIOS
export function fetchOne( req ) {
    return dispatch => fetch(dispatch, req)
}

export function deleteOne (req) {
    return dispatch => del(dispatch, req)
}

export function patchOne (req) {
    return dispatch => patch(dispatch, req)
}

export function postOne (req) {
    return dispatch => post(dispatch, req)
}

export function fetch( dispatch, req ) {
    const axiosInstance = createAxiosInstance();
    axiosInstance.get(req.url, req.params).then(res => {
        dispatch(receiveContent({isCurrent: _.get(req.params, 'current', false), key: req.key, data: res.data}));
        if( req.callback ) req.callback(res);
        return res;
    }).catch(res => {
        dispatch(notify({
            title: 'An error occured while loading data',
            message: '',
            status: 'error',
            dismissible: true,
            dismissAfter: 3000
        }));
        if( req.errorCallback ) req.errorCallback(res);
        return res;
    })
}

export function del( dispatch, req ) {
    const axiosInstance = createAxiosInstance();
    // const params = {params: req.params} || {};
    axiosInstance.delete(req.url).then(res => {
        if( req.callback ) req.callback(res)
        dispatch(notify({
            title: 'Delete record',
            message: 'Recording deleted successfully',
            status: 'info',
            dismissible: true,
            dismissAfter: 3000
        }));
    }).catch(res => {
        dispatch(notify({
            title: 'An error occured while loading data',
            message: '',
            status: 'error',
            dismissible: true,
            dismissAfter: 3000
        }));
        dispatch(testDatabase({key: req.key, data: {}, id: req.params.id, operation: 'delete'}));
        if( req.errorCallback ) req.errorCallback(res);
    })
}


export function post( dispatch, req ) {
    const axiosInstance = createAxiosInstance();

    axiosInstance.post(req.url, req.params).then(res => {
        dispatch(notify({
            title: 'Creating a record',
            message: 'The entry was created successfully',
            status: 'info',
            dismissible: true,
            dismissAfter: 3000
        }));
        if( req.callback ) req.callback(res)
    }).catch(res => {
        // console.log('Res = ', error.response.data, error.response.data['error']);
        const errorBody = _.get(res.response, 'data', null);
        // console.log('Body = ', errorBody);
        dispatch(notify({
            title: (errorBody) ?  errorBody : 'An error occured while loading data',
            message: '',
            status: 'error',
            dismissible: true,
            dismissAfter: 3000
        }));
        if( req.errorCallback ) req.errorCallback(errorBody);
    });
}

export function patch( dispatch, req ) {
    const axiosInstance = createAxiosInstance();

    axiosInstance.put(req.url, req.params).then(res => {
        dispatch(receiveContent, {key: req.key, data: res.data});
        if( req.callback ) req.callback(res)
        dispatch(notify({
            title: 'Update record',
            message: 'Record successfully updated',
            status: 'info',
            dismissible: true,
            dismissAfter: 3000
        }));
    }).catch(res => {
        dispatch(notify({
            title: 'An error occured while loading data',
            message: '',
            status: 'error',
            dismissible: true,
            dismissAfter: 3000
        }));
        dispatch(testDatabase({key: req.key, data: req.params.data, id: req.params.id, operation: 'update'}));
        if( req.errorCallback ) req.errorCallback(res);
    })
}

export function searchSelect( req, query, callback) {

    if( query.length < 2 ) return Promise.resolve();

    const axiosInstance = createAxiosInstance();

    return axiosInstance.get(req.url, {params: {query}}).then(( res ) => {
        let data = [];
        if (callback) callback(data);
        return data;
    }).catch(( res ) => {
        let data = [];
        const base = _.get(store.getState(),`content.database.${req.url}`, null);
        _.forEach(base.entities, (val, key) => {
            if (val[req.fieldLabel].toLowerCase().search(query.toLowerCase())>-1) data.push(val);
        });
        if (callback) callback(data);
        return data;
    })
}