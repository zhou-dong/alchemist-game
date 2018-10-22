import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import Index from './pages';
import configureStore from './store/configureStore';
import * as serviceWorker from './serviceWorker';

declare global {
    interface Window { initialReduxState: any; }
}

window.initialReduxState = window.initialReduxState || {};

const initialState = window.initialReduxState;
const history = createBrowserHistory();

const store = configureStore(history, initialState);

const Root = () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Index />
        </ConnectedRouter>
    </Provider>
);

ReactDOM.render(<Root />, document.querySelector('#root'));

serviceWorker.unregister();
