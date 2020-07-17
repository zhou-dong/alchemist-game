import * as React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import primary from '@material-ui/core/colors/green';
import secondary from '@material-ui/core/colors/red';
import CssBaseline from '@material-ui/core/CssBaseline';
import helperColor from '@material-ui/core/colors/green';
import helperColorSecondary from '@material-ui/core/colors/blue';
import helperColorThird from '@material-ui/core/colors/yellow';

export const drawerWidth: number = 270;
export const helperStyle: React.CSSProperties = { backgroundColor: helperColor[100] };
export const helperStyleSecondary: React.CSSProperties = { backgroundColor: helperColorSecondary[100] };
export const helperStyleThird: React.CSSProperties = { backgroundColor: helperColorThird[200] };
export const warn = "#FF385C"

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Circular",
      "-apple-system",
      "BlinkMacSystemFont",
      "Roboto",
      "Helvetica Neue",
      "sans-serif",
      "monospace"
    ].join(",")
    // useNextVariants: true,
  },
  palette: {
    primary: primary,
    secondary: secondary,
    background: {
      // default: grey['200'],
      // default: "#9be5f3!important"
      default: "white"
    },
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        color: primary["600"],
        backgroundColor: "white"
      }
    },
    MuiTable: {
      root: {
        width: '0',
        borderRadius: 12,
        display: "inline-table"
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
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: "gray",
        color: "black",
        borderRadius: 0,
        fontSize: 14,
        fontWeight: 400,
        height: 35,
        width: 70,
      },
    },
    MuiTableRow: {
      root: {
        // height: 60,
      },
    },
    MuiDialog: {
      paper: {
        margin: 4,
      },
      paperWidthSm: {
        maxWidth: 1200,
      }
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
