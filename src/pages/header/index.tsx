import * as React from 'react';
import classNames from 'classnames';
import { withStyles, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { WithStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import MenuButton from './MenuButton';
import Title from './Title';
import Search from './Search';
import Section from './Section';

import { drawerWidth } from '../withRoot';

const basicStyles = createStyles({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
});

const appBarStyles = (theme: Theme) => createStyles({
    appBar: {
        position: 'absolute',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        boxShadow: 'none',
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    appBarShiftLeft: {
        marginLeft: drawerWidth,
    },
});

const styles = (theme: Theme) => createStyles({
    ...basicStyles,
    ...appBarStyles(theme),
});

interface Props extends WithStyles<typeof styles> {
    open: boolean;
    openDrawer: () => void;
}

const Header = (props: Props) => {
    const { classes, open, openDrawer } = props;
    return (
        <div className={classes.root}>
            <AppBar
                className={classNames(classes.appBar, {
                    [classes.appBarShift]: open,
                    [classes.appBarShiftLeft]: open,
                })}
            >
                <Toolbar>
                    <MenuButton open={open} openDrawer={openDrawer} />
                    <Title />
                    <Search />
                    <div className={classes.grow} />
                    <Section />
                </Toolbar>
            </AppBar>
        </div>
    );
};
export default withStyles(styles)(Header);