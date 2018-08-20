export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

export const showModal = ( params ) => ({type: SHOW_MODAL, params});
export const hideModal = ( params ) => ({type: HIDE_MODAL, params});