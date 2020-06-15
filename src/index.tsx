import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import Index from './pages';
import configureStore from './store/configureStore';
import * as serviceWorker from './serviceWorker';
import { UserContext } from './user/userContext';
import { getMe } from './user/userUtils';
import { User } from './user/user';
import { RecordsContext } from './records/recordsContext';
import { Record } from './records/record';
import { getRecords } from './records/recordsUtils';
import { Like } from './likes/like';
import { getLikes } from './likes/likesUtils';
import { LikesContext } from './likes/likesContext';

declare global {
    interface Window { initialReduxState: any; }
}

window.initialReduxState = window.initialReduxState || {};

const initialState = window.initialReduxState;
const history = createBrowserHistory();

const store = configureStore(history, initialState);

const Root = () => {

    const [user, setUser] = React.useState<User | null>(null);
    React.useEffect(() => { getMe().then(obj => setUser(obj)); }, []);

    const [records, setRecords] = React.useState<Record[]>([]);
    React.useEffect(() => { getRecords().then(objs => setRecords(objs)); }, []);

    const [likes, setLikes] = React.useState<Like[]>([]);
    React.useEffect(() => { getLikes().then(objs => setLikes(objs)); }, []);

    return (
        <Provider store={store}>
            <UserContext.Provider value={{ user, setUser }}>
                <RecordsContext.Provider value={{ records, setRecords }}>
                    <LikesContext.Provider value={{ likes, setLikes }}>
                        <ConnectedRouter history={history}>
                            <Index />
                        </ConnectedRouter>
                    </LikesContext.Provider>
                </RecordsContext.Provider>
            </UserContext.Provider>
        </Provider>
    );
};

ReactDOM.render(<Root />, document.querySelector('#root'));

serviceWorker.unregister();
