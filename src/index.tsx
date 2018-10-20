import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, Store, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import Index from './pages';
import reducers from './reducers';
import sagas from './sagas';

const composeEnhancers = composeWithDevTools({});

const sagaMiddleware = createSagaMiddleware();
const store: Store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(sagas);

const Root = () => (
    <Provider store={store}>
        <Router>
            <Index />
        </Router>
    </Provider>
);

ReactDOM.render(<Root />, document.querySelector('#root'));
