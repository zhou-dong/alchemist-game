import { Store, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import { History } from 'history';
import { ApplicationState, rootReducer, rootSaga } from '.';

export default function configureStore(
    history: History,
    initialState: ApplicationState): Store<ApplicationState> {

    const composeEnhancers = composeWithDevTools({});
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        connectRouter(history)(rootReducer),
        initialState,
        composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
    );

    sagaMiddleware.run(rootSaga);
    return store;
}
