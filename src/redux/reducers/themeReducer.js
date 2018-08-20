import {
  CHANGE_THEME_TO_DARK,
  CHANGE_THEME_TO_LIGHT,
    CHANGE_THEME_TO_VOVAN
} from '../actions/themeActions';

const initialState = {
  className: 'theme-vovan'
};

export default function (state = initialState, action) {
  switch (action.type) {
      case CHANGE_THEME_TO_DARK:
          return {className: 'theme-dark'};
      case CHANGE_THEME_TO_LIGHT:
          return {className: 'theme-light'};
      case CHANGE_THEME_TO_VOVAN:
          return {className: 'theme-vovan'};
      default:
          return state;
  }
}