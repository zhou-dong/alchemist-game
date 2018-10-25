import *  as React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';

const styles = (theme: Theme) => createStyles({
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
});

interface Props extends WithStyles<typeof styles> {

}

const Section = (props: Props) => {
    const { classes } = props;
    return (
        <React.Fragment>
            <div className={classes.sectionDesktop}>
                {/* <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <IconButton color="inherit">
                    <Badge badgeContent={17} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton> */}
                <IconButton
                    // aria-owns={isMenuOpen ? 'material-appbar' : null}
                    aria-haspopup="true"
                    // onClick={this.handleProfileMenuOpen}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
            </div>
            <div className={classes.sectionMobile}>
                <IconButton aria-haspopup="true" color="inherit">
                    <MoreIcon />
                </IconButton>
            </div>
        </React.Fragment>
    );
};

export default withStyles(styles)(Section);