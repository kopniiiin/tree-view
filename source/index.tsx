import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './store/reducer';
import {AsyncActionCreator} from './store/actions';
import api from './api';
import App from './components/app';

const store = createStore(
    reducer,
    applyMiddleware(thunk.withExtraArgument(api)),
);

store.dispatch(AsyncActionCreator.loadBrands());

ReactDOM.render(
    <Provider store={store}><App/></Provider>,
    document.querySelector('#root'),
);
