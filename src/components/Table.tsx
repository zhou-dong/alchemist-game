import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const tableStyles = (theme: Theme) => createStyles({});

interface Props extends WithStyles<typeof tableStyles> {
    matrix: Array<Array<number | string>>;
    styles: Array<Array<React.CSSProperties>>;
}

const createCell = (key: number, data: number | string, style: React.CSSProperties) => (
    <TableCell padding="none" key={key} style={style}>
        {data}
    </TableCell>
);

const createRow = (key: number, array: Array<string | number>, styles: Array<React.CSSProperties>) => {
    if (array.length !== styles.length) {
        throw new Error('Alchemy Display table errors: array-styles size dont match');
    }
    return (
        <TableRow key={key}>
            {array.map((data, index) => createCell(index, data, styles[index]))}
        </TableRow>
    );
};

const DisplayTable = (props: Props) => {
    const { matrix, styles } = props;
    if (matrix.length !== styles.length) {
        throw new Error('Alchemy Display table errors: matrix-styles size dont match');
    }
    return (
        <Table>
            <TableBody>
                {matrix.map((row, index) => createRow(index, row, styles[index]))}
            </TableBody>
        </Table>
    );
};

export default withStyles(tableStyles)(DisplayTable);
