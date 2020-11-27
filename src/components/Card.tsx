import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';

import Header from './MainHeader';
import Table from './Table';
import Buttons from './Buttons';
import { State } from '../store/BasicState';
import Dialog from './Dialog';
import Formula from './Formula';
import Comments from './MainFooter';

import TwoThreeTree from "./trees/two-three-tree"

const styles = (theme: Theme) => createStyles({});
interface Props extends State, WithStyles<typeof styles> { }

const Algorithm = (props: Props) => (
    <div style={{ margin: 'auto', textAlign: 'center' }}>
        <TwoThreeTree />
        <Header {...props} />
        <Table {...props} />
        <CardContent>
            <Buttons {...props} />
        </CardContent>
        <Comments {...props} />
        <Dialog  {...props} />
        <Formula {...props} />
    </div>
);

export default withStyles(styles)(Algorithm);
