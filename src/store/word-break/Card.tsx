import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
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
    <Card>
        <Header {...props} />
        <Divider style={{ marginBottom: 5 }} />
        {helperTable(props)}
        <Divider style={{ marginTop: 5 }} />
        <Table {...props} />
        <Divider style={{ marginTop: 5 }} />
        <CardContent>
            <Buttons {...props} />
        </CardContent>
        <Dialog  {...props} />
        <Formula {...props} />
    </Card>
);

export default withStyles(styles)(Algorithm);
