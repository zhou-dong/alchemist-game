import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Header from '../../components/Header';
import Buttons from '../../components/Buttons';
import Dialog from '../../components/Dialog';
import Formula from '../../components/Formula';
import Table from '../../components/Table';
import { helperStyle } from '../../pages/withRoot';

import { State } from './state';

const styles = (theme: Theme) => createStyles({});
interface Props extends State, WithStyles<typeof styles> { }

const helperTable = (props: Props) => {
    const { dictionary } = props;
    const row = ['DICT:'].concat(dictionary);

    const rowStyles = row.map(() => helperStyle);
    rowStyles[0] = {};

    const table = [];
    table.push(row);

    const tableStyles: React.CSSProperties[][] = [];
    tableStyles.push(rowStyles);
    return (<Table table={table} tableStyles={tableStyles} />);
};

const Algorithm = (props: Props) => (
    <div style={{ margin: "auto", "textAlign": "center" }}>
        <Header {...props} />
        {helperTable(props)}
        <div style={{ marginBottom: "10px" }} />
        <Table {...props} />
        <CardContent>
            <Buttons {...props} />
        </CardContent>
        <Dialog  {...props} />
        <Formula {...props} />
    </div>
);

export default withStyles(styles)(Algorithm);
