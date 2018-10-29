import * as React from 'react';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import { drawerWidth } from '../withRoot';
import Names from '../../algorithms/Names';

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

const linkStyle: React.CSSProperties = {
    textDecoration: 'none',
    color: 'inherit',
    width: '100%',
    textTransform: 'initial',
    textAlign: 'left',
};

const listStyle: React.CSSProperties = {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    width: '100%',
    textAlign: 'left',
};

const buttonStyle: React.CSSProperties = {
    borderRadius: 0,
    width: '100%',
    textAlign: 'left',
};

const getName = (name: string) => name.split('').map(ch => (ch === '_') ? ' ' : ch).join('');

const mailFolderListItems = Object.keys(Names).map(key => {
    const name = Names[key];
    return (
        <ListItem key={key} style={listStyle}>
            <Button style={buttonStyle}>
                <Link to={`/algorithms/${name}`} style={linkStyle}>
                    {getName(key)}
                </Link>
            </Button>
        </ListItem>
    );
});

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
            <div
                tabIndex={0}
                role="button"
                onClick={closeDrawer}
                onKeyDown={closeDrawer}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={closeDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>{mailFolderListItems}</List>

            </div>
        </Drawer>
    );
};

export default withStyles(styles)(Sidebar);
