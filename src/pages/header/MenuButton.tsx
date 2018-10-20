import * as React from 'react';
import classNames from 'classnames';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = createStyles({
    hide: {
        display: 'none',
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
});

interface Props extends WithStyles<typeof styles> {
    open: boolean;
    openDrawer: () => void;
}

const MenuButton = (props: Props) => {
    const { classes, openDrawer, open } = props;
    return (
        <IconButton
            className={classNames(classes.menuButton, open && classes.hide)}
            color="inherit"
            aria-label="Open drawer"
            onClick={openDrawer}
        >
            <MenuIcon />
        </IconButton>
    );
};

export default withStyles(styles)(MenuButton);
