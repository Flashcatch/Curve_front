import {
    CHANGE_LANGUAGE
} from '../actions/intlActions';
import message from '../../locale/locale.json';
import _ from 'lodash';

const initialState = {
    locale: 'en',
    messages: getLocaleMessages('en')
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      const {language} = action.params;
      return {...state, locale: language, messages: getLocaleMessages(language)};
    default:
      return state;
  }
}

function getLocaleMessages (language) {
  let ans = {};
    _.forEach(message, (keys, section) => {
        _.forEach(keys, (val, key) => {
            ans[`${section}.${key}`] = val[language]
        })
    });
  return ans;
}