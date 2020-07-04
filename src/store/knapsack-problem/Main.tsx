import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles, Grid } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';

import Header from '../../components/MainHeader';
import Table from '../../components/Table';
import Buttons from '../../components/Buttons';
import { State } from '../BasicState';
import Dialog from '../../components/Dialog';
import Formula from '../../components/Formula';
import Comments from '../../components/MainFooter';
import Animator from './Animator';

const styles = (theme: Theme) => createStyles({});

interface Props extends State, WithStyles<typeof styles> { }

const Algorithm = (props: Props) => {

    const currentRow = props.currentPoint.row;
    const currentCol = props.currentPoint.col;

    const maxWeight = props.table[0][props.table[0].length - 1];
    const currentWeight = props.table[0][currentCol];
    const currentValue = props.table[currentRow - 1][currentCol];
    const potentialValue = props.table[currentRow][1] <= currentCol - 2 ? Math.max(
        props.table[currentRow][0] + props.table[currentRow - 1][currentCol - props.table[currentRow][1]],
        props.table[currentRow - 1][currentCol]
    ) : -1

    return (
        <div>
            <Grid container>
                <Grid item md={12} lg={6} style={{ margin: 'auto', textAlign: 'center' }}>
                    <Header {...props} />
                    <Table {...props} />
                    <CardContent>
                        <Buttons {...props} />
                    </CardContent>
                    <Dialog  {...props} />
                    <Formula {...props} />
                </Grid>
                <Animator
                    table={props.table}
                    maxWeight={maxWeight}
                    currentWeight={currentWeight}
                    currentValue={currentValue}
                    potentialValue={potentialValue}
                    currentRow={currentRow}
                />
            </Grid>

            <Comments {...props} />
        </div>
    )
};

export default withStyles(styles)(Algorithm);
