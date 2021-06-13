import * as React from "react";

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Avatar, Chip, Table, TableBody, TableCell, TableRow, Typography, WithStyles } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Header from '../../components/MainHeader';
import Buttons from '../../components/Buttons';
import Dialog from '../../components/Dialog';
import Formula from '../../components/Formula';
import DisplayTable from '../../components/Table';
import Comments from '../../components/MainFooter';
import { helperStyle } from '../../pages/withRoot';

import { State } from './state';

const styles = (theme: Theme) => createStyles({});
interface Props extends State, WithStyles<typeof styles> { }

const HashTable = (props: Props) => {
    const comparedTable = props.comparedTable;

    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell padding="none" style={{ backgroundColor: "lightgray" }}>
                        key
                    </TableCell>
                    {
                        comparedTable[0].map((col, i) => <TableCell padding="none" key={i}>{col}</TableCell>)
                    }
                </TableRow>
                <TableRow>
                    <TableCell padding="none" style={{ backgroundColor: "lightgray" }}>
                        value
                    </TableCell>
                    {
                        comparedTable[1].map((col, i) => <TableCell padding="none" key={i}>{col}</TableCell>)
                    }
                </TableRow>
            </TableBody>
        </Table>
    )
};

const Algorithm = (props: Props) => (
    <div style={{ margin: "auto", "textAlign": "center" }}>
        <Header {...props} />
        <div style={{ minHeight: 20 }} />

        <Typography>
            <Chip label={"nums = [" + props.nums.join(", ") + "]"} variant="outlined" />
            &nbsp;&nbsp;&nbsp;
            <Chip label={"target = " + props.target} variant="outlined" />
        </Typography>

        <div style={{ minHeight: 20 }} />

        <Typography variant="subtitle1">Array</Typography>

        <DisplayTable {...props} />

        <div style={{ minHeight: 20 }} />

        <CardContent>
            <Typography variant="subtitle1">
                HashTable
            </Typography>
            <HashTable {...props} />
        </CardContent>
        <CardContent>
            <Buttons {...props} />
        </CardContent>
        <Comments {...props} />
        <Dialog  {...props} />
        <Formula {...props} />
    </div>
);

export default withStyles(styles)(Algorithm);
