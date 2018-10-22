import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';

import Header from './Header';
import Table from './Table';
import Buttons from './Buttons';

const styles = (theme: Theme) => createStyles({});

interface Props extends WithStyles<typeof styles> {
    id: number;
    success: boolean;
    loading: boolean;
    steps: number;
    errors: number;
    title: string;
    difficulty: string;
    tableMatrix: Array<Array<number | string>>;
    tableStyles: Array<Array<React.CSSProperties>>;
    buttons: Array<number | string>;
    buttonsStyles: Array<React.CSSProperties>;
    handleButtonClick: (data: number | string) => any;
    handleRefreshClick: () => any;
}

const A = (props: Props) => (
    <Card>
        <Header {...props} />
        <Divider style={{ marginBottom: 5 }} />
        <Table matrix={props.tableMatrix} styles={props.tableStyles} />
        <Divider style={{ marginTop: 5 }} />
        <CardContent>
            <Buttons array={props.buttons} styles={props.buttonsStyles} handleClick={props.handleButtonClick} />
        </CardContent>
    </Card>
);

export default withStyles(styles)(A);
