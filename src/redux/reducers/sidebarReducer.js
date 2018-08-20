import {
  CHANGE_SIDEBAR_VISIBILITY,
  CHANGE_MOBILE_SIDEBAR_VISIBILITY,
  CHANGE_SIDEBAR_LINK
} from '../actions/sidebarActions';

const initialState = {
    show: false,
    collapse: false,
    currentLink: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_SIDEBAR_VISIBILITY:
      return {...state, collapse: !state.collapse};
    case CHANGE_MOBILE_SIDEBAR_VISIBILITY:
      return {...state, show: !state.show};
    case CHANGE_SIDEBAR_LINK:
      return {...state, currentLink: action.params.key};
    default:
      return state;
  }
}