import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import Index from './pages';
import configureStore from './store/configureStore';
import * as serviceWorker from './serviceWorker';
import { UserContext } from './user/userContext';
import { getUser } from './user/userUtils';
import { User } from './user/user';
import { RecordsContext } from './records/recordsContext';
import { Record } from './records/record';
import { getRecords } from './records/recordsUtils';

declare global {
    interface Window { initialReduxState: any; }
}

window.initialReduxState = window.initialReduxState || {};

const initialState = window.initialReduxState;
const history = createBrowserHistory();

const store = configureStore(history, initialState);

const Root = () => {

    const [user, setUser] = React.useState<User | null>(null);
    React.useEffect(() => { getUser().then(obj => setUser(obj)); }, []);

    const [records, setRecords] = React.useState<Record[]>([]);
    React.useEffect(() => { getRecords().then(objs => setRecords(objs)); }, []);

    return (
        <Provider store={store}>
            <RecordsContext.Provider value={{ records, setRecords }}>
                <UserContext.Provider value={user}>
                    <ConnectedRouter history={history}>
                        <Index />
                    </ConnectedRouter>
                </UserContext.Provider>
            </RecordsContext.Provider>
        </Provider>
    );
};

ReactDOM.render(<Root />, document.querySelector('#root'));

serviceWorker.unregister();
