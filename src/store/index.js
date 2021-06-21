import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from 'redux-saga';
import _ from 'lodash';
import reducers from "./reducers";
import sagas from './sagas';

const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
        : compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

_.map(sagas, (saga) => {
    sagaMiddleware.run(saga)
});

export default store;
