import { Store, createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import { History } from 'history';
import { ApplicationState, rootReducer } from '.';

export default function configureStore(
    history: History,
    initialState: ApplicationState): Store<ApplicationState> {

    const composeEnhancers = composeWithDevTools({});

    const store = createStore(
        rootReducer(history),
        initialState,
        composeEnhancers(applyMiddleware(routerMiddleware(history)))
    );

    // Hot reloading
    // if (module.hot) {
    //     // Enable Webpack hot module replacement for reducers
    //     module.hot.accept('./reducers', () => {
    //         store.replaceReducer(rootReducer(history));
    //     });
    // }

    return store;
}
