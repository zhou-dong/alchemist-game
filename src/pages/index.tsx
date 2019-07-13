import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import withRoot from './withRoot';
import Header from './header';
import Sidebar from './sidebar';
import Main from './main';
import Footer from './footer';

const styles = (theme: Theme) => createStyles({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing(20),
  },
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
    const { open } = this.state;
    return (
      <React.Fragment>
        <Header open={open} openDrawer={this.handleOpen} />
        <Sidebar open={open} closeDrawer={this.handleClose} />
        <Main open={open} />
        <Footer />
      </React.Fragment>
    );
  }
}

export default withRoot(withStyles(styles)(Index));
