import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';
import { containers } from '../../store';

const styles = (theme: Theme) => createStyles({
    startButton: {
        textDecoration: 'none',
    },
});

interface Props extends WithStyles<typeof styles> {

}

const getRandomAlgorithm = () => {
    const keys: string[] = Object.keys(containers);
    const index = Math.floor(Math.random() * keys.length);
    const key = keys[index];
    return containers[key];
};

const Welcome = (props: Props) => {
    const Algorithm = getRandomAlgorithm();
    return (
        <React.Fragment>
            <Algorithm />
        </React.Fragment>
    );
};

export default withStyles(styles)(Welcome);
