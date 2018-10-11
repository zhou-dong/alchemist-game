import * as React from 'react';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { drawerWidth } from '../../../withRoot';

const styles = (theme: Theme) => createStyles({
    drawerPaper: {
        position: 'absolute',
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
});

interface Props extends WithStyles<typeof styles> {
    open?: boolean;
    closeDrawer: () => void;
}

const mailFolderListItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e']
    .map(num => <ListItem key={num}>{num}</ListItem>);

const Sidebar = (props: Props) => {
    const { classes, open, closeDrawer } = props;
    return (
        <Drawer
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={closeDrawer}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List>{mailFolderListItems}</List>
        </Drawer>
    );
};

export default withStyles(styles)(Sidebar);
