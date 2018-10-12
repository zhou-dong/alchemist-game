import * as React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { Link } from 'react-router-dom';

const styles = (theme: Theme) => createStyles({
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        textDecoration: 'none',
        color: 'inherit',
    },
});

interface Props extends WithStyles<typeof styles> {

}

const Title = (props: Props) => {
    const { classes } = props;
    return (
        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
            <Link to="/" className={classes.title}>
                Alchemist
            </Link>
        </Typography>
    );
};

export default withStyles(styles)(Title);