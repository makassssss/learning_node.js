import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension'; //eslint-disable-line import/no-extraneous-dependencies
import rootReducer from './reducers';
import rooSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancer = composeWithDevTools(applyMiddleware(sagaMiddleware));

export const store = createStore(rootReducer, composeEnhancer); //eslint-disable-line import/prefer-default-export

sagaMiddleware.run(rooSaga);
