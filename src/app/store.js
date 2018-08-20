import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import {reducer as reduxFormReducer} from 'redux-form';
import {sidebarReducer, themeReducer, contentReducer, modalReducer, intlReducer} from '../redux/reducers/index';
// import logger from 'redux-logger'
import thunk from 'redux-thunk';
import {reducer as notificationsReducer} from 'reapop';

const reducer = combineReducers({
    form: reduxFormReducer, // mounted under "form",
    theme: themeReducer,
    sidebar: sidebarReducer,
    content: contentReducer,
    modal: modalReducer,
    intl: intlReducer,
    notifications: notificationsReducer()
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = function configureStore(initialState) {
    const store = createStore(
        reducer,
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        initialState,
        composeEnhancers(applyMiddleware(thunk))
        );
    return store
};

const store = configureStore();


// const store = (window.devToolsExtension
//   ? window.devToolsExtension()(createStore)
//   : createStore)(reducer);

export default store;
