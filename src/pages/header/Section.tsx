import *  as React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import {
    WithStyles,
    Avatar,
    Dialog,
    DialogTitle,
    List,
    ListItem,
    ListItemAvatar,
    DialogActions,
    Divider,
    Popover,
    ListItemText,
    ListItemIcon
} from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ExitToApp from '@material-ui/icons/ExitToApp';

import { UserContext } from '../../user/userContext';
import GoogleLogo from './Google__G__Logo.svg';
import GithubLogo from './mark-github.svg';
import { User } from '../../user/user';
import { signOut } from '../../user/userUtils';

const apiHost = 'api.alchemist-ai.com';
const baseApiUrl = `https://${apiHost}`;
const googleLoginUrl = `${baseApiUrl}/oauth/google/login`;
const githubLoginUrl = `${baseApiUrl}/oauth/github/login`;

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
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    loginList: {
        minWidth: 360,
    }
});

interface Props extends WithStyles<typeof styles> { }

interface LoginProps extends WithStyles<typeof styles> {
    open: boolean;
    handleClose: () => void;
}

const LoginDialog = (props: LoginProps) => (
    <Dialog onClose={props.handleClose} open={props.open}>
        <DialogTitle>
            Signs
        </DialogTitle>
        <Divider />
        <List className={props.classes.loginList}>
            <ListItem button component="a" href={googleLoginUrl}>
                <ListItemAvatar>
                    <Avatar variant="square" src={GoogleLogo} className={props.classes.small} />
                </ListItemAvatar>
                Sign in with Google
            </ListItem>
            <ListItem button component="a" href={githubLoginUrl}>
                <ListItemAvatar>
                    <Avatar variant="square" src={GithubLogo} className={props.classes.small} />
                </ListItemAvatar>
                Sign in with Github
            </ListItem>
        </List>
        <DialogActions>
            <IconButton aria-label="close-login-dialog" onClick={props.handleClose}>
                <CloseIcon />
            </IconButton>
        </DialogActions>
    </Dialog>
);

interface LogoutProps extends WithStyles<typeof styles> {
    user: User | null;
    open: boolean;
    anchorEl: HTMLButtonElement | null;
    handleClose: () => void;
    handleSignOut: () => void;
}

const LogoutPopover = (props: LogoutProps) => (
    <Popover
        open={props.open}
        anchorEl={props.anchorEl}
        onClose={props.handleClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
    >
        <List>
            <ListItem>
                <ListItemText primary={props.user && ('Hi, ' + props.user.name)} />
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem button onClick={props.handleSignOut}>
                <ListItemIcon>
                    <ExitToApp />
                </ListItemIcon>
                <ListItemText primary="Sign out" />
            </ListItem>
        </List>
    </Popover>
);

const UserIcon = (props: Props) => {
    const { classes } = props;
    const userState = React.useContext(UserContext);

    const [loginOpen, setLoginOpen] = React.useState(false);

    const handleLoginOpen = () => {
        setLoginOpen(true);
    };

    const handleLoginClose = (): void => {
        setLoginOpen(false);
    };

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleLogoutOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLogoutClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = (): void => {
        if (userState.setUser) {
            userState.setUser(null);
        }
        signOut();
    };

    if (userState.user) {
        return (
            <React.Fragment>
                <IconButton aria-haspopup="true" onClick={handleLogoutOpen} >
                    <Avatar
                        className={classes.small}
                        alt={userState.user.name}
                        src={userState.user.avatar || undefined}
                    />
                </IconButton>
                <LogoutPopover
                    {...props}
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    handleClose={handleLogoutClose}
                    user={userState.user}
                    handleSignOut={handleSignOut}
                />
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <IconButton aria-haspopup="true" onClick={handleLoginOpen}>
                    <Avatar className={classes.small} />
                </IconButton>
                <LoginDialog {...props} open={loginOpen} handleClose={handleLoginClose} />
            </React.Fragment>
        );
    }
};

const Section = (props: Props) => {
    const { classes } = props;
    return (
        <React.Fragment>
            <div className={classes.sectionDesktop}>
                {/* 
                <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <IconButton color="inherit">
                    <Badge badgeContent={17} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton> 
                */}
                <UserIcon {...props} />
            </div>
            <div className={classes.sectionMobile}>
                {/* <IconButton aria-haspopup="true" color="inherit">
                    <MoreIcon />
                </IconButton> */}
                <UserIcon {...props} />
            </div>
        </React.Fragment>
    );
};

export default withStyles(styles)(Section);