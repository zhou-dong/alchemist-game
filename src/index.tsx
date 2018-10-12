import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Index from './pages/index';

import { BrowserRouter as Router } from 'react-router-dom';

const R = () => {
    return (
        <Router>
            <Index />
        </Router>
    );
};

ReactDOM.render(<R />, document.querySelector('#root'));
