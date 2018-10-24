import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { ApplicationState } from '..';
import Card from '../../components/Card';
import initState from './initialState';

const mapStateToProps = ({ editDistance }: ApplicationState) => ({
    ...editDistance,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    handleButtonClick: (data: number | string) => {
        dispatch(initState.handleButtonClick(data));
    },

    handleRefreshClick: () => {
        dispatch(initState.handleRefreshClick());
    },

    'modal.handleClose': () => {
        dispatch(initState.modal.handleClose());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
