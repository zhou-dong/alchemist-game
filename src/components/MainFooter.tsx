import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles, Divider, Grid } from '@material-ui/core';


import { State as BasicState } from '../store/BasicState';
import Favorite from './Favorite';
import Thumbs from './Thumbs';
import Comments from './Comments';

const styles = (theme: Theme) => createStyles({
    sectionDesktop: {
        display: 'none',
        width: "55%",
        [theme.breakpoints.up('md')]: {
            display: 'block',
        },
    },
    sectionMobile: {
        display: 'block',
        width: "96%",
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    root: {
        textAlign: 'center',
        margin: "auto",
        marginTop: "60px"
    },
});

interface Props extends BasicState, WithStyles<typeof styles> { }

const Content = (props: Props) => (
    <React.Fragment>
        <Grid container>
            <Grid item xs={12} sm={6}>
                <Grid container alignItems="flex-start" justify="flex-start">
                    <Favorite challengeId={props.id} />
                    <Thumbs challengeId={props.id} />
                </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Grid container alignItems="flex-start" justify="flex-end">
                </Grid>
            </Grid>
        </Grid>
        <Divider />
        <Comments challengeId={props.id} />
    </React.Fragment>
);

const Footer = (props: Props) => (
    <React.Fragment>
        <div className={`${props.classes.root} ${props.classes.sectionDesktop}`}>
            <Content {...props} />
        </div>
        <div className={`${props.classes.root} ${props.classes.sectionMobile}`}>
            <Content {...props} />
        </div>
    </React.Fragment>
);

export default withStyles(styles)(Footer);
