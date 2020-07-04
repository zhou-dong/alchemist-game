import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles, Grid } from '@material-ui/core';

import Backpack from './svgs/Backpack';
import Book from './svgs/Book';

const styles = (theme: Theme) => createStyles({
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('lg')]: {
            display: 'block',
        },
        borderLeft: "1px solid lightgray",
    },
    sectionMobile: {
        display: 'block',
        [theme.breakpoints.up('lg')]: {
            display: 'none',
        },
        margin: 'auto', textAlign: 'center',
    },
});

interface Props extends WithStyles<typeof styles> {
    table: Array<Array<any>>;
    maxWeight: number;
    currentWeight: number;
    currentValue: number;
    potentialValue: number;
    currentRow: number;
}

const DesktopAnimator = (
    { table, maxWeight, currentWeight, currentValue, potentialValue, currentRow, classes }: Props) => (
        <Grid item md={6} className={classes.sectionDesktop}>
            <div style={{ float: "left", marginLeft: "70px", marginRight: "80px" }}>
                <Backpack
                    height={400}
                    maxWeight={maxWeight}
                    currentValue={currentValue}
                    currentWeight={currentWeight}
                    potentialValue={potentialValue}
                />
            </div>
            {
                table.slice(2).map((row, index) =>
                    <div key={index}>
                        <Book
                            id={index}
                            weight={row[1]}
                            height={100}
                            fillColor={currentRow === index + 2 ? "lightgreen" : "lightgray"}
                            weightColor={currentRow === index + 2 ? "black" : "lightgray"}
                            valueColor={currentRow === index + 2 ? "black" : "lightgray"}
                            value={row[0]}
                            width={100}
                        />
                    </div>
                )
            }
        </Grid>
    );

const MobileAnimator = (
    { table, maxWeight, currentWeight, currentValue, potentialValue, currentRow, classes }: Props) => (
        <Grid item md={12} className={classes.sectionMobile}>
            <div>
                <Backpack
                    height={400}
                    maxWeight={maxWeight}
                    currentValue={currentValue}
                    currentWeight={currentWeight}
                    potentialValue={potentialValue}
                />
            </div>
            {
                table.slice(2).map((row, index) =>
                    <Book
                        key={index}
                        id={index}
                        weight={row[1]}
                        height={100}
                        fillColor={currentRow === index + 2 ? "lightgreen" : "lightgray"}
                        weightColor={currentRow === index + 2 ? "black" : "lightgray"}
                        valueColor={currentRow === index + 2 ? "black" : "lightgray"}
                        value={row[0]}
                        width={100}
                    />
                )
            }
        </Grid >
    );

const Animator = (props: Props) => (
    <React.Fragment>
        <DesktopAnimator {...props} />
        <MobileAnimator {...props} />
    </React.Fragment>
);

export default withStyles(styles)(Animator);
