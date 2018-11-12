import * as React from 'react';
import classNames from 'classnames';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import { Route, RouteComponentProps } from 'react-router-dom';

import Welcome from './welcome';
import { containers } from '../../store';
import Names from '../../algorithms/Names';

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
});

interface Props extends WithStyles<typeof styles> {
    open: boolean;
}

interface PathParamsType {
    name: string;
}

interface PathParamsType1 extends RouteComponentProps<PathParamsType> {

}

const Algorithm = ({ match }: PathParamsType1) => {
    switch (match.params.name) {
        case Names.Edit_Distance:
            return (<containers.EditDistance />);
        case Names.Knapsack_Problem:
            return (<containers.KnapsackProblem />);
        case Names.RodCutting_Problem:
            return (<containers.RodCuttingProblem />);
        case Names.Wildcard_Matching:
            return (<containers.WildcardMatching />);
        case Names.Regular_Expression:
            return (<containers.RegularExpression />);
        case Names.Coin_Change_Fewest_Number:
            return (<containers.CoinChangeFewestNumber />);
        case Names.Coin_Change_How_Many_Ways:
            return (<containers.CoinChangeHowManyWays />);
        case Names.Is_Subsequence:
            return (<containers.IsSubsequence />);
        case Names.Longest_Common_Subsequence:
            return (<containers.LongestCommonSubsequence />);
        default:
            return (<div>{match.params.name}</div>);
    }
};

const Algorithms = ({ match }: PathParamsType1) => (
    <React.Fragment>
        <Route path={`${match.path}/:name`} component={Algorithm} />
        <Route exact path={match.path} render={() => (<div>Algorithms</div>)} />
    </React.Fragment>
);

const Content = (props: Props) => {
    const { classes } = props;
    return (
        <main className={classNames(classes.content)} >
            <div className={classes.drawerHeader} />
            <Route exact path="/" component={Welcome} />
            <Route path="/algorithms" component={Algorithms} />
        </main>
    );
};

export default withStyles(styles)(Content);