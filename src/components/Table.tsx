import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Table as TableProps } from '../store/BasicState';

const styles = (theme: Theme) => createStyles({});

interface Props extends TableProps, WithStyles<typeof styles> { }

const createCell = (key: number, data: number | string, style: React.CSSProperties) => (
    <TableCell padding="none" key={key} style={style}>
        {data}
    </TableCell>
);

const createRow = (key: number, array: Array<string | number>, rowStyles: Array<React.CSSProperties>) => {
    if (array.length !== rowStyles.length) {
        throw new Error('Alchemy Display table errors: array-styles size dont match');
    }
    return (
        <TableRow key={key}>
            {array.map((data, index) => createCell(index, data, rowStyles[index]))}
        </TableRow>
    );
};

const DisplayTable = (props: Props) => {
    const { table, tableStyles } = props;
    if (table.length !== tableStyles.length) {
        throw new Error('Alchemy Display table errors: matrix-styles size dont match');
    }
    return (
        <Table>
            <TableBody>
                {table.map((row, index) => createRow(index, row, tableStyles[index]))}
            </TableBody>
        </Table>
    );
};

export default withStyles(styles)(DisplayTable);
