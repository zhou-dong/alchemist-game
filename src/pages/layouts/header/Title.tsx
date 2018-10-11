import * as React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const styles = (theme: Theme) => createStyles({
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
});

interface Props extends WithStyles<typeof styles> {

}

const Title = (props: Props) => {
    const { classes } = props;
    return (
        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
            Alchemist
        </Typography>
    );
};

export default withStyles(styles)(Title);