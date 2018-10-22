import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const buttonsStyle = (theme: Theme) => createStyles({
    cell: {
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: theme.palette.primary.dark,
        },
        padding: 0,
    },
});

interface Props extends WithStyles<typeof buttonsStyle> {
    array: Array<number | string>;
    styles: Array<React.CSSProperties>;
    handleClick: (data: number | string) => any;
}

const cell = (key: number, data: number | string, style: React.CSSProperties, { handleClick, classes }: Props) => (
    <TableCell key={key} style={style} onClick={() => handleClick(data)} className={classes.cell}>
        {data}
    </TableCell>
);

const Buttons = (props: Props) => {
    const { array, styles } = props;
    if (array.length !== styles.length) {
        throw new Error('Alchemy Buttons errors: array-styles size dont match');
    }
    return (
        <Table>
            <TableBody>
                <TableRow key={0}>
                    {array.map((data, index) => cell(index, data, styles[index], { ...props }))}
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default withStyles(buttonsStyle)(Buttons);
