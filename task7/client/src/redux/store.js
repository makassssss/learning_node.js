import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import rooSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancer = composeWithDevTools(applyMiddleware(sagaMiddleware));

export const store = createStore(rootReducer, composeEnhancer);

sagaMiddleware.run(rooSaga);
