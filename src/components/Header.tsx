
import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { WithStyles, Button, ButtonGroup } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import green from '@material-ui/core/colors/green';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/RefreshOutlined';
import DescriptionIcon from '@material-ui/icons/DescriptionOutlined';
// import PlayIcon from '@material-ui/icons/PlayCircleOutline';
import AssignmentIcon from '@material-ui/icons/AssignmentOutlined';
import CheckIcon from '@material-ui/icons/CheckCircleOutlined';
import WrongIcon from '@material-ui/icons/ErrorOutline';
import StepsIcon from '@material-ui/icons/PollOutlined';
import CodeIcon from '@material-ui/icons/CodeRounded';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import { Header as HeaderProps } from '../store/BasicState';

const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        padding: 5,
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        zIndex: 1,
    },
});

interface Props extends HeaderProps, WithStyles<typeof styles> { }

const HeaderTitle = ({ title, success, loading, classes, handleOpenDialogClick }: Props) => {
    return (
        <div>
            <IconButton onClick={handleOpenDialogClick}>
                {success ? <CheckIcon style={{ color: "green" }} /> : <AssignmentIcon style={{ color: "black" }} />}
            </IconButton>
            <strong>{title.toUpperCase()}</strong>
            {/* {loading && <CircularProgress size={36} className={classes.fabProgress} />} */}
        </div>
    );
};

const Header = (props: Props) => {
    const { classes, steps, errors } = props;
    return (<div style={{ marginTop: "50px", marginBottom: "10px" }} >
        <HeaderTitle {...props} />

        <ButtonGroup variant="contained" size="small" style={{ marginTop: "25px" }}>

            <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={props.handleRefreshClick}
            >
                Refresh
            </Button>

            <Button
                variant="outlined"
                startIcon={<CodeIcon />}
                onClick={props.handleOpenFormulaClick}
            >
                Code
            </Button>
        </ButtonGroup>
        <ButtonGroup variant="contained" size="small" style={{ marginLeft: "10px" }}>
            <Button
                variant="outlined"
                startIcon={<StepsIcon />}
            >
                Steps: {steps}
            </Button>

            <Button
                variant="outlined"
                startIcon={<WrongIcon style={{ color: "#ff1744" }} />}
            >
                Errors: {errors}
            </Button>
        </ButtonGroup>
    </div >
    )
};

export default withStyles(styles)(Header);