import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { Buttons as ButtonsProps } from '../store/BasicState';

const buttonsStyle = (theme: Theme) => createStyles({
    cell: {
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: theme.palette.primary.dark,
        },
        padding: 0,
    },
});

interface Props extends ButtonsProps, WithStyles<typeof buttonsStyle> { }

const booleanToString = (data: boolean): string => data ? 'TRUE' : 'FALSE';

const cellContent = (data: number | string | boolean) => {
    return (typeof data === 'boolean') ? booleanToString(data) : data;
};

const cell = (
    key: number,
    data: number | string | boolean,
    style: React.CSSProperties,
    { handleButtonClick, classes }: Props) => (
        <TableCell key={key} style={style} onClick={() => handleButtonClick(data)} className={classes.cell}>
            {cellContent(data)}
        </TableCell>
    );

const Buttons = (props: Props) => {
    const { buttons, buttonsStyles } = props;
    if (buttons.length !== buttonsStyles.length) {
        throw new Error('Alchemy Buttons errors: array-styles size dont match');
    }
    return (
        <Table>
            <TableBody>
                <TableRow key={0}>
                    {buttons.map((data, index) => cell(index, data, buttonsStyles[index], { ...props }))}
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default withStyles(buttonsStyle)(Buttons);
