import * as React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const styles = (theme: Theme) => createStyles({
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 6,
    },
});

interface Props extends WithStyles<typeof styles> { }

const Footer = (props: Props) => {
    const { classes } = props;
    return (
        <footer className={classes.footer}>
            <Typography variant="h6" align="center" gutterBottom>
                Alchemist
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                Dynamic programming is cool!
            </Typography>
        </footer>
    );
};

export default withStyles(styles)(Footer);
