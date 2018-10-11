import * as React from 'react';
import classNames from 'classnames';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import withRoot from '../withRoot';
import Header from './layouts/header';
import Sidebar from './layouts/sidebar';

const drawerWidth = 240;

const contentStyles = (theme: Theme) => createStyles({
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  contentShiftLeft: {
    marginLeft: drawerWidth,
  },
});

const styles = (theme: Theme) => createStyles({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
  ...contentStyles(theme),
});

type State = {
  open: boolean;
};

class Index extends React.Component<WithStyles<typeof styles>, State> {
  state = {
    open: false,
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleOpen = () => {
    this.setState({
      open: true,
    });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    return (
      <React.Fragment>
        <Header open={this.state.open} openDrawer={this.handleOpen} />
        <Sidebar open={this.state.open} closeDrawer={this.handleClose} />
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
            [classes.contentShiftLeft]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <Typography>{'You think water moves fast? You should see ice.'}</Typography>
        </main>
      </React.Fragment>
    );
  }
}

export default withRoot(withStyles(styles)(Index));
