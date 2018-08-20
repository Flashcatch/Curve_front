export const REQUEST_CONTENT = 'REQUEST_CONTENT';
export const RECEIVE_CONTENT = 'RECEIVE_CONTENT';
export const TEST_DATABASE = 'TEST_DATABASE';

export const requestContent = ( params ) => ({type: REQUEST_CONTENT, params});
export const receiveContent = ( params ) => ({type: RECEIVE_CONTENT, params});
export const testDatabase = ( params ) => ({type: TEST_DATABASE, params});