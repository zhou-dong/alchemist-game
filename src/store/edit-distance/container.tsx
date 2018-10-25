import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { ApplicationState } from '..';
import Card from '../../components/Card';
import { state } from './initialState';

const mapStateToProps = ({ editDistance }: ApplicationState) => ({
    ...editDistance,
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: any) => ({
    handleButtonClick: (data: number | string) => {
        dispatch(state.handleButtonClick(data));
    },

    handleRefreshClick: () => {
        dispatch(state.handleRefreshClick());
    },

    handleOpenDialogClick: () => {
        dispatch(state.handleOpenDialogClick());
    },

    handleCloseDialogClick: () => {
        dispatch(state.handleCloseDialogClick());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
