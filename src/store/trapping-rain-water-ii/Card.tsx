import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { TableCell, TableRow, WithStyles } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';

import Header from '../../components/MainHeader';
import DisplayTable from '../../components/Table';
import Buttons from '../../components/Buttons';
import { State } from './state';
import Dialog from '../../components/Dialog';
import Formula from '../../components/Formula';
import Comments from '../../components/MainFooter';
import { Table, TableBody } from '@material-ui/core';
import { Point } from '../BasicState';
import { Guiders } from '../../algorithms/trapping-rain-water-ii/algorithm';

const styles = (_: Theme) => createStyles({});
interface Props extends State, WithStyles<typeof styles> { }

const backgroundColor = "rgb(69,69,69)";

interface NumsTableParams {
    current: Point;
    data: number[];
    success: boolean;
    guiders: Guiders;
}

const Heights = ({ data, current, guiders }: NumsTableParams) => (
    <div>
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell padding="none" style={{ border: 0, borderWidth: 0 }}>Height </TableCell>
                    {
                        data.map((item, i) => {
                            const { coordinates } = guiders;
                            const { left, right } = coordinates[current.col];
                            if (left > right) {
                                return (<TableCell key={i} padding="none">{item}</TableCell>)
                            } else {
                                const { left, right } = guiders.coordinates[current.col];
                                if (i === left || i === right) {
                                    return (<TableCell key={i} padding="none" style={{ backgroundColor: "green" }}>{item}</TableCell>)
                                } else {
                                    return (<TableCell key={i} padding="none">{item}</TableCell>)
                                }
                            }
                        })
                    }
                </TableRow>
                <TableRow>
                    <TableCell padding="none" style={{ border: 0, borderWidth: 0 }}>Max</TableCell>
                    {
                        data.map((_, i) => {
                            const { coordinates } = guiders;
                            const { left, right } = coordinates[current.col];
                            if (left > right) {
                                return <TableCell key={i} padding="none" style={{ border: 0, borderWidth: 0 }}></TableCell>
                            } else {
                                const { left, right, maxLeft, maxRight } = guiders.coordinates[current.col];
                                if (i === left - 1) {
                                    return <TableCell key={i} padding="none" style={{ border: 0, borderWidth: 0 }}>{maxLeft}</TableCell>
                                } else if (i === right + 1) {
                                    return <TableCell key={i} padding="none" style={{ border: 0, borderWidth: 0 }}>{maxRight}</TableCell>
                                } else {
                                    return <TableCell key={i} padding="none" style={{ border: 0, borderWidth: 0 }}></TableCell>
                                }
                            }
                        })
                    }
                </TableRow>
            </TableBody>
        </Table>
    </div>
);

const Total = ({ current, guiders }: NumsTableParams) => {
    const { coordinates, waters } = guiders;
    const { left, right } = coordinates[current.col];
    if (left > right) {
        return (
            <TableCell padding="none" style={{ backgroundColor: "green" }}>
                {
                    waters[current.col]
                }
            </TableCell>
        );
    } else {
        return (
            <TableCell padding="none">
                {
                    waters[current.col]
                }
            </TableCell>
        );
    }
};

const Algorithm = (props: Props) => (
    <div style={{ margin: 'auto', textAlign: 'center' }}>
        <Header {...props} />

        <DisplayTable {...props} />

        <div style={{ marginTop: 30 }}>  </div>
        <Heights data={props.heights} current={props.currentPoint} guiders={props.guiders} success={props.success} />

        <div>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell padding="none" style={{ backgroundColor, color: "white" }}>Total</TableCell>
                        <Total data={props.waters} current={props.currentPoint} success={props.success} guiders={props.guiders} />
                    </TableRow>
                </TableBody>
            </Table>
        </div>

        <CardContent>
            <Buttons {...props} />
        </CardContent>
        <Comments {...props} />
        <Dialog  {...props} />
        <Formula {...props} />
    </div>
);

export default withStyles(styles)(Algorithm);
