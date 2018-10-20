import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { ApplicationState } from '../index';
import Card from '../../components/Card';

const mapStateToProps = ({ editDistance }: ApplicationState) => ({
    ...editDistance
});
const mapDispatchToProps = (dispatch: Dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
