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
import { State } from '../store/BasicState';
import Dialog from './Dialog';
import Formula from './Formula';

const styles = (theme: Theme) => createStyles({});
interface Props extends State, WithStyles<typeof styles> { }

const Algorithm = (props: Props) => (
    <div style={{ margin: "auto", "textAlign": "center" }}>
        <Header {...props} />
        <Table {...props} />
        <CardContent>
            <Buttons {...props} />
        </CardContent>
        <Dialog  {...props} />
        <Formula {...props} />
    </div>
);

export default withStyles(styles)(Algorithm);
