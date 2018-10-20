import * as React from 'react';
import classNames from 'classnames';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import { Route, RouteComponentProps } from 'react-router-dom';

import { drawerWidth } from '../withRoot';

import Welcome from './welcome';
import AlgorithmCard from './AlgorithmCard';

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
        padding: theme.spacing.unit * 1,
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

const Algorithm = ({ match }: PathParamsType1) => {

    const id: number = 1;
    const success: boolean = true;
    const loading: boolean = true;
    const steps: number = 20;
    const errors: number = 10;
    const title: string = 'Edit Distance';
    const subHeader: string = 'Hard';
    const tableMatrix: Array<Array<number | string>> = [
        ['a', 'b', 'c', 'd', 'e'],
        [1, 2, 3, 4, 5],
        [2, 3, 4, 5, 6],
        [3, 4, 5, 6, 7],
    ];
    const tableStyles: Array<Array<React.CSSProperties>> = [
        [{ color: 'red' }, { color: 'red' }, { color: 'red' }, { color: 'red' }, { color: 'red' }],
        [{ color: 'red' }, { color: 'yellow' }, { color: 'red' }, { color: 'red' }, { color: 'red' }],
        [{ color: 'red' }, { color: 'red' }, { color: 'yellow' }, { color: 'red' }, { color: 'red' }],
        [{ color: 'red' }, { color: 'yellow' }, { color: 'red' }, { color: 'red' }, { color: 'red' }],
    ];
    const buttonsArray: Array<number | string> = ['a', 1, 2, 3, 4];
    const buttonsStyles: Array<React.CSSProperties> =
        [{ color: 'red' }, { color: 'red' }, { color: 'red' }, { color: 'red' }, { color: 'red' }];
    const buttonsHandleClick = (data: number | string) => alert(data);
    return (
        <AlgorithmCard
            id={id}
            success={success}
            loading={loading}
            steps={steps}
            errors={errors}
            title={title}
            subHeader={subHeader}
            tableMatrix={tableMatrix}
            tableStyles={tableStyles}
            buttonsArray={buttonsArray}
            buttonsStyles={buttonsStyles}
            buttonsHandleClick={buttonsHandleClick}
        />
    );
};

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