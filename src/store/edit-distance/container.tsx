import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { ApplicationState } from '..';
import Card from '../../components/Card';

import {
    buttonClick,
    refresh,
} from './actions';

const mapStateToProps = ({ editDistance }: ApplicationState) => ({
    ...editDistance,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    handleButtonClick: (data: number | string) => {
        dispatch(buttonClick(data));
    },

    handleRefreshClick: () => {
        dispatch(refresh());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
