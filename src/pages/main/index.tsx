import * as React from 'react';
import classNames from 'classnames';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import { Route, RouteComponentProps } from 'react-router-dom';

import Welcome from './welcome';
import { containers } from '../../store';
import Names from '../../algorithms/Names';

import TwoThreeRBT from "../../algorithms/two-three-tree_vs-red-black-tree";
import LRU from "../../algorithms/lru-cache";

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
        padding: theme.spacing(1),
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

interface PathParamsType1 extends RouteComponentProps<PathParamsType> { }

const mock = (): number[] => {
    let result: number[] = []
    for (let i = 0; i < 15; i++) {
        result.push(i + 1);
    }
    return result;
}

const Algorithm = ({ match }: PathParamsType1) => {
    switch (match.params.name) {
        case Names.Edit_Distance: return <containers.EditDistance />;
        case Names.Knapsack_Problem: return <containers.KnapsackProblem />;
        case Names.RodCutting_Problem: return <containers.RodCuttingProblem />;
        case Names.Wildcard_Matching: return <containers.WildcardMatching />;
        case Names.Regular_Expression: return <containers.RegularExpression />;
        case Names.Coin_Change_Fewest_Number: return <containers.CoinChangeFewestNumber />;
        case Names.Coin_Change_How_Many_Ways: return <containers.CoinChangeHowManyWays />;
        case Names.Is_Subsequence: return <containers.IsSubsequence />;
        case Names.Is_Substring: return <containers.IsSubstring />;
        case Names.Longest_Common_Subsequence: return <containers.LongestCommonSubsequence />;
        case Names.Longest_Common_Substring: return <containers.LongestCommonSubstring />;
        case Names.Subset_Sum_Problem: return <containers.SubsetSumProblem />;
        case Names.Minimum_Jumps_To_End: return <containers.MinimumNumberOfJumpsToReachEnd />;
        case Names.Minimum_Jumps_To_End_II: return <containers.MinimumNumberOfJumpsToReachEndIi />;
        case Names.Longest_Increasing_Subsequence: return <containers.LongestIncreasingSubsequence />;
        case Names.Minimum_Path_Sum: return <containers.MinimumPathSum />;
        case Names.Word_Break: return <containers.WordBreak />;
        case Names.Maximum_Subarray_Problem: return <containers.MaximumSubarrayProblem />;
        case Names.EggDropping_Problem: return <containers.EggDroppingProblem />;
        case Names.Longest_Palindromic_Substring: return <containers.LongestPalindromicSubstring />;
        case Names.Longest_Palindromic_Subsequence: return <containers.LongestPalindromicSubsequence />;
        case Names.Palindrome_Partitioning: return <containers.PalindromePartitioning />;
        case Names.House_Robber: return <containers.HouseRobber />;
        case Names.Binary_Tree_Inorder_Traversal: return <containers.BinaryTreeInorderTraversal />;
        case Names.Binary_Tree_Preorder_Traversal: return <containers.BinaryTreePreorderTraversal />;
        case Names.Binary_Tree_Postorder_Traversal: return <containers.BinaryTreePostorderTraversal />;
        case Names.Two_Three_Tree_vs_Red_Black_tree: return <TwoThreeRBT input={mock()} />;
        case Names.LRU_Cache: return <LRU />;
        case Names.Two_Sum: return <containers.TwoSum />
        case Names.Trapping_Rain_Water: return <containers.TrappingRainWater />
        default: return (<div>{match.params.name}</div>);
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
