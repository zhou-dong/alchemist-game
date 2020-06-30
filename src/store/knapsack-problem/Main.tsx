import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles, Grid, Divider } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';

import Header from '../../components/MainHeader';
import Table from '../../components/Table';
import Buttons from '../../components/Buttons';
import { State } from '../BasicState';
import Dialog from '../../components/Dialog';
import Formula from '../../components/Formula';
import Comments from '../../components/MainFooter';
import Backpack from './svgs/Backpack';
import Book from './svgs/Book';
const styles = (theme: Theme) => createStyles({});
interface Props extends State, WithStyles<typeof styles> { }

const Algorithm = (props: Props) => {

    const currentRow = props.currentPoint.row;
    const currentCol = props.currentPoint.col;

    const maxWeight = props.table[0][props.table[0].length - 1];
    const currentWeight = props.table[0][currentCol];
    const currentValue = props.table[currentRow - 1][currentCol];
    const potentialValue = props.table[currentRow][1] <= currentCol - 2 ? (
        props.table[currentRow][0] + props.table[currentRow - 1][currentCol - props.table[currentRow][1]]
    ) : -1

    return (
        <div style={{ margin: 'auto', textAlign: 'center' }}>
            <Grid container>
                <Grid item sm={12} md={6}>
                    <Header {...props} />
                    <Table {...props} />
                    <CardContent>
                        <Buttons {...props} />
                    </CardContent>
                    <Dialog  {...props} />
                    <Formula {...props} />
                </Grid>
                <Grid item sm={12} md={6}>
                    <Grid container style={{ paddingTop: 20 }}>
                        <Grid item xs={1}>
                            <Divider orientation="vertical" />
                        </Grid>
                        <Grid item xs={8} style={{ height: "424px" }}>
                            <Backpack
                                height={400}
                                maxWeight={maxWeight}
                                currentValue={currentValue}
                                currentWeight={currentWeight}
                                potentialValue={potentialValue}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            {
                                props.table.slice(2).map((row, index) => <Book
                                    key={index}
                                    id={index}
                                    weight={row[1]}
                                    height={100}
                                    fillColor={currentRow === index + 2 ? "lightgreen" : "lightgray"}
                                    weightColor={currentRow === index + 2 ? "black" : "lightgray"}
                                    valueColor={currentRow === index + 2 ? "black" : "lightgray"}
                                    value={row[0]}
                                    width={100}
                                />)
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Comments {...props} />
        </div>
    )
};

export default withStyles(styles)(Algorithm);
