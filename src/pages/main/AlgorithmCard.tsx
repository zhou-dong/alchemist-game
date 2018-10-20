import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import green from '@material-ui/core/colors/green';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/RefreshOutlined';
import HelpIcon from '@material-ui/icons/HelpOutline';
import PlayIcon from '@material-ui/icons/PlayCircleOutline';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CheckIcon from '@material-ui/icons/Check';
import WrongIcon from '@material-ui/icons/HighlightOff';
import StepsIcon from '@material-ui/icons/Poll';
import TimerIcon from '@material-ui/icons/Timer';
import PauseIcon from '@material-ui/icons/PauseCircleOutline';
import Divider from '@material-ui/core/Divider';

import Display from './Display';
import Buttons from './Buttons';

const styles = (theme: Theme) => createStyles({
    root: {
        boxShadow: 'none',
        flexGrow: 1,
        overflow: 'visible',
    },
    avatar: {
        overflow: 'visible',
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        zIndex: 1,
    },
    cardHeader: {
        color: theme.palette.secondary.light,
    },
    chip: {
        marginRight: theme.spacing.unit,
    },
});

const cardHeaderAvatar = (
    success: boolean,
    loading: boolean,
    title: string,
    props: Props) => {
    const { classes } = props;
    return (
        <Avatar aria-label={title} className={classes.avatar}>
            {success ? <CheckIcon fontSize="large" /> : <AssignmentIcon />}
            {loading && <CircularProgress size={48} className={classes.fabProgress} />}
        </Avatar>
    );
};

const cardHeaderActions = (props: Props) => {
    // const { classes } = props;
    return (
        <div>
            <div style={{ float: 'right' }}>
                <IconButton>
                    <PlayIcon />
                </IconButton>
                <IconButton>
                    <HelpIcon />
                </IconButton>
                <IconButton>
                    <RefreshIcon />
                </IconButton>
            </div>
        </div>
    );
};

const chips = (steps: number, errors: number, props: Props) => {
    const { classes } = props;
    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{ paddingTop: 5 }}
        >
            <Chip
                color="primary"
                variant="outlined"
                label="00: 14"
                icon={<TimerIcon />}
                deleteIcon={<PauseIcon />}
                className={classes.chip}
                onDelete={() => alert('play or pause game')}
            />
            <Chip
                color="primary"
                variant="outlined"
                label={`Steps: ${steps}`}
                icon={<StepsIcon />}
                className={classes.chip}
            />
            <Chip
                color="primary"
                variant="outlined"
                label={`Errors: ${errors}`}
                icon={<WrongIcon />}
                className={classes.chip}
            />
        </Grid>
    );
};

interface Props extends WithStyles<typeof styles> {
    id: number;
    success: boolean;
    loading: boolean;
    steps: number;
    errors: number;
    title: string;
    subHeader: string;
    tableMatrix: Array<Array<number | string>>;
    tableStyles: Array<Array<React.CSSProperties>>;
    buttonsArray: Array<number | string>;
    buttonsStyles: Array<React.CSSProperties>;
    buttonsHandleClick: (data: number | string) => any;
}

const A = (props: Props) => {
    const {
        success,
        loading,
        steps,
        errors,
        classes,
        title,
        subHeader,
        tableMatrix,
        tableStyles,
        buttonsArray,
        buttonsStyles,
        buttonsHandleClick,
    } = props;
    return (
        <Card className={classes.root}>
            {chips(steps, errors, props)}
            <Divider style={{ marginTop: 5 }} />
            <CardHeader
                className={classes.cardHeader}
                avatar={cardHeaderAvatar(success, loading, title, props)}
                action={cardHeaderActions(props)}
                title={title}
                subheader={subHeader}
            />
            <Display matrix={tableMatrix} styles={tableStyles} />
            <Divider style={{ marginTop: 10 }} />
            <CardContent>
                <Buttons array={buttonsArray} styles={buttonsStyles} handleClick={buttonsHandleClick} />
            </CardContent>
        </Card>
    );
};
export default withStyles(styles)(A);
