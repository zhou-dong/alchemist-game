import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles, ButtonGroup, Button } from '@material-ui/core';

import { Buttons as ButtonsProps } from '../store/BasicState';

const buttonsStyle = (theme: Theme) => createStyles({
    cell: {
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: theme.palette.primary.light,
        },
        minWidth: 70,
        minHeight: 35,
        fontSize: 14,
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
        <Button size="large" key={key} style={style} onClick={() => handleButtonClick(data)} className={classes.cell}>
            {cellContent(data)}
        </Button>
    );

const Buttons = (props: Props) => {
    const { buttons, buttonsStyles } = props;
    if (buttons.length !== buttonsStyles.length) {
        throw new Error('Alchemy Buttons errors: array-styles size dont match');
    }
    return (
        <ButtonGroup size="large" key={0} style={{ marginTop: "20px" }}>
            {buttons.map((data, index) => cell(index, data, buttonsStyles[index], { ...props }))}
        </ButtonGroup>
    );
};

export default withStyles(buttonsStyle)(Buttons);
