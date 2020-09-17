import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles, Grid } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Header from '../../components/MainHeader';
import Buttons from '../../components/Buttons';
import Dialog from '../../components/Dialog';
import Formula from '../../components/Formula';
import Table from '../../components/Table';
import Comments from '../../components/MainFooter';

import { State } from './state';

const styles = (theme: Theme) => createStyles({});
interface Props extends State, WithStyles<typeof styles> { }

const Algorithm = (props: Props) => (
    <div style={{ margin: "auto", "textAlign": "center" }}>
        <Header {...props} />

        <div style={{ marginBottom: "10px" }} />

        <Grid container >
            <Grid item md={1} />
            <Grid item sm={12} md={5}>
                <div style={{ fontSize: "18px", fontWeight: "bold" }}>Palindrome Table</div>
                <Table table={props.palindromeTable} tableStyles={props.palindromeTableStyles} />
            </Grid>
            <Grid item sm={12} md={5}>
                <div style={{ fontSize: "18px", fontWeight: "bold" }}>DP Table</div>
                <Table {...props} />
            </Grid>
            <Grid item md={1} />
        </Grid>

        <CardContent>
            <Buttons {...props} />
        </CardContent>
        <Comments {...props} />
        <Dialog  {...props} />
        <Formula {...props} />
    </div>
);

export default withStyles(styles)(Algorithm);
