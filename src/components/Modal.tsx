import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Modal as ModalProps } from '../store/State';

const styles = (theme: Theme) => createStyles({});

interface Props extends ModalProps, WithStyles<typeof styles> { }

const InfoModal = (props: Props) => {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            scroll={props.scroll}
        >
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    CLOSE
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default withStyles(styles)(InfoModal);