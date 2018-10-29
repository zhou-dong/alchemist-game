import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { ApplicationState } from '..';
import Card from '../../components/Card';
import * as actions from './actions';

const mapStateToProps = ({ knapsackProblem }: ApplicationState) => ({
    ...knapsackProblem,
});

const mapDispatchToProps = (dispatch: Dispatch<actions.Action>) => ({
    handleButtonClick: (data: number | string) => {
        dispatch(actions.buttonClick(data));
    },

    handleRefreshClick: () => {
        dispatch(actions.refresh());
    },

    handleOpenDialogClick: () => {
        dispatch(actions.openDialog());
    },

    handleCloseDialogClick: () => {
        dispatch(actions.closeDialog());
    },

    handleOpenFormulaClick: () => {
        dispatch(actions.openFormula());
    },

    handleCloseFormulaClick: () => {
        dispatch(actions.closeFormula());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
