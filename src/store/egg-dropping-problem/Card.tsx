import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import Header from '../../components/MainHeader';
import Buttons from '../../components/Buttons';
import Dialog from '../../components/Dialog';
import Formula from '../../components/Formula';
import AlchemistTable from '../../components/Table';
import Comments from '../../components/MainFooter';

import { State } from './state';

const styles = (theme: Theme) => createStyles({});
interface Props extends State, WithStyles<typeof styles> { }


const createResultEquation = (table: number[]): string => {
    const explain: string[] = table.map((_, i) => "floor_" + (i + 1));
    return `Math.min(${explain.join(", ")}) = Math.min(${table.join(", ")})`;
};

const HelperTable = (props: Props) => (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell padding="none" rowSpan={2}>FLOOR</TableCell>
                <TableCell padding="none" colSpan={3}>BREAKS</TableCell>
                <TableCell padding="none" colSpan={3}>NON BREAKS</TableCell>
                <TableCell padding="none">RESULT</TableCell>
            </TableRow>

            <TableRow>

                <TableCell padding="none">LEFT EGGS</TableCell>
                <TableCell padding="none">LEFT FLOORS</TableCell>
                <TableCell padding="none">RESULT</TableCell>

                <TableCell padding="none">LEFT EGGS</TableCell>
                <TableCell padding="none">LEFT FLOORS</TableCell>
                <TableCell padding="none">RESULT</TableCell>

                <TableCell padding="none">1+ Max(Breaks, NonBreaks)</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {
                props.helperTable.map((row, rowIndex) => {
                    return <TableRow key={rowIndex}>
                        {
                            row.map((cell, colIndex) => {
                                return <TableCell key={colIndex} padding="none"> {cell} </TableCell>
                            })
                        }
                    </TableRow>
                })
            }
            <TableRow>
                <TableCell padding="none" style={{ fontWeight: "bold" }}>RESULT</TableCell>
                <TableCell padding="none" colSpan={6} style={{ fontWeight: "bold" }}>
                    {createResultEquation(props.resultsInDifferentFloors)}
                </TableCell>
                <TableCell padding="none" colSpan={2} style={{ fontWeight: "bold" }}>
                    {props.comparedTable[props.currentPoint.row][props.currentPoint.col]}
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
);

const Helper = (props: Props) => (
    <React.Fragment>
        <div style={{ marginTop: "20px", marginBottom: "5px", fontSize: "16px" }} >
            <span style={{ fontWeight: "bolder" }}>Helpers: </span>{`{ eggs: ${props.currentPoint.row}, floors: ${props.currentPoint.col - 1} }`}
        </div>
        <HelperTable {...props} />
    </React.Fragment>
);

const Algorithm = (props: Props) => (
    <div style={{ margin: "auto", "textAlign": "center" }}>
        <Header {...props} />

        <div style={{ fontSize: "18px", fontWeight: "bold" }}></div>
        <AlchemistTable {...props} />

        {props.helperTable.length > 0 && <Helper {...props} />}

        <CardContent>
            <Buttons {...props} />
        </CardContent>
        <Comments {...props} />
        <Dialog  {...props} />
        <Formula {...props} />
    </div>
);

export default withStyles(styles)(Algorithm);
