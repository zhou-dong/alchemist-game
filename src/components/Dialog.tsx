import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles, Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReactMarkdown from "react-markdown";

import { Dialog as DialogProps } from '../store/BasicState';

const styles = (theme: Theme) => createStyles({
    description: {
        fontSize: "16px",
    }
});

interface Props extends DialogProps, WithStyles<typeof styles> { }

const description = (props: Props) => (
    <ReactMarkdown source={props.description} className={props.classes.description} />
);

const alUsecases = (props: Props) => (
    <React.Fragment>
        <Typography>Use Cases</Typography>
        <Divider />
        <ReactMarkdown source={props.alUsecases} className={props.classes.description} />
    </React.Fragment>
);

const example = (props: Props) => (
    <React.Fragment>
        <Typography>Example</Typography>
        <Divider />
        <ReactMarkdown source={props.example} className={props.classes.description} />
    </React.Fragment>
);

const InfoModal = (props: Props) => (
    <Dialog open={props.dialogOpen} onClose={props.handleDialogOnClose} scroll={props.dialogCroll} >
        <DialogTitle>
            <Typography>{props.title}</Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
            {props.description && description(props)}
            {props.alUsecases && alUsecases(props)}
            {props.example && example(props)}
        </DialogContent>
        <DialogActions>
            <Button onClick={props.handleCloseDialogClick}>CLOSE</Button>
        </DialogActions>
    </Dialog>
);

export default withStyles(styles)(InfoModal);
