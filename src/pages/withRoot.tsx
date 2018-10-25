import * as React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import primary from '@material-ui/core/colors/green';
import secondary from '@material-ui/core/colors/red';
import CssBaseline from '@material-ui/core/CssBaseline';
import grey from '@material-ui/core/colors/grey';
import helperColor from '@material-ui/core/colors/orange';

export const drawerWidth: number = 240;
export const helperStyle: React.CSSProperties = { backgroundColor: helperColor[300] };

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: primary,
    secondary: secondary,
    background: {
      default: grey['200'],
    },
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        color: 'white',
      }
    },
    MuiTableCell: {
      root: {
        width: '1%',
        textAlign: 'center',
        borderBottom: 'none',
        '&:last-child': {
          paddingRight: 0,
        }
      },
      body: {
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'white',
        color: 'white',
        backgroundColor: primary.A700,
        borderRadius: 10,
        fontSize: 24,
        height: 40,
      },
    },
    MuiTableRow: {
      root: {
        height: 36,
      },
    },
    MuiDialog: {
      paper: {
        margin: 4,
      },
    },
    MuiDialogContent: {
      root: {
        paddingLeft: 4,
        paddingRight: 4,
      }
    }
  },
});

function withRoot<P>(Component: React.ComponentType<P>) {
  function WithRoot(props: P) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;
