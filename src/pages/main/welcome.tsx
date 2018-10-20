import * as React from 'react';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const styles = (theme: Theme) => createStyles({
    startButton: {
        textDecoration: 'none',
    },
});

interface Props extends WithStyles<typeof styles> {

}

const Welcome = (props: Props) => {
    const { classes } = props;
    return (
        <React.Fragment>
            <Typography align="center" color="primary" variant="h3" gutterBottom >
                ALCHEMIST
            </Typography>
            <Typography align="center" color="primary" variant="h6" gutterBottom >
                Learn, practise and play Dynamic Programming algorithms.
            </Typography>
            <Typography align="center" color="primary" gutterBottom variant="h4">
                <Link to="/algorithms" className={classNames(classes.startButton)}>
                    <Button color="primary" size="large" variant="contained">
                        GET STARTED
                    </Button>
                </Link>
            </Typography>
        </React.Fragment>
    );
};

export default withStyles(styles)(Welcome);
