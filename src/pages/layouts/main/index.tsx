import * as React from 'react';
import classNames from 'classnames';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import { Route, RouteComponentProps } from 'react-router-dom';

import { drawerWidth } from '../../../withRoot';

import Welcome from './welcome';

const styles = (theme: Theme) => createStyles({
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    contentShiftLeft: {
        marginLeft: drawerWidth,
    },
});

interface Props extends WithStyles<typeof styles> {
    open: boolean;
}

interface PathParamsType {
    algorithmId: string;
}

interface PathParamsType1 extends RouteComponentProps<PathParamsType> {

}

const Algorithm = ({ match }: PathParamsType1) => (
    <div>
        <h3>{match.params.algorithmId}</h3>
    </div>
);

const Algorithms = ({ match }: PathParamsType1) => (
    <React.Fragment>
        <Route path={`${match.path}/:algorithmId`} component={Algorithm} />
        <Route exact path={match.path} render={() => (<div>Algorithms</div>)} />
    </React.Fragment>
);

const Content = (props: Props) => {
    const { classes, open } = props;
    return (
        <main
            className={classNames(classes.content, {
                [classes.contentShift]: open,
                [classes.contentShiftLeft]: open,
            })}
        >
            <div className={classes.drawerHeader} />
            <Route exact path="/" component={Welcome} />
            <Route path="/algorithms" component={Algorithms} />
        </main>
    );
};

export default withStyles(styles)(Content);