import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Dialog as DialogProps } from '../store/BasicState';
import CodeBlock, { Languares } from './CodeBlock';

const styles = (theme: Theme) => createStyles({});

interface Props extends DialogProps, WithStyles<typeof styles> { }

const description = (props: Props) => (
    <React.Fragment>
        <Typography>Description</Typography>
        <CodeBlock code={props.description} language={Languares.Markdown} />
    </React.Fragment>
);

const useCases = (props: Props) => (
    <React.Fragment>
        <Typography>Use Cases</Typography>
        <CodeBlock code={props.useCases} language={Languares.Markdown} />
    </React.Fragment>
);

const example = (props: Props) => (
    <React.Fragment>
        <Typography>Example</Typography>
        <CodeBlock code={props.example} language={Languares.Markdown} />
    </React.Fragment>
);

const InfoModal = (props: Props) => (
    <Dialog open={props.dialogOpen} onClose={props.handleDialogOnClose} scroll={props.dialogCroll} >
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
            {props.description && description(props)}
            {props.useCases && useCases(props)}
            {props.example && example(props)}
        </DialogContent>
        <DialogActions>
            <Button onClick={props.handleCloseDialogClick} color="primary">CLOSE</Button>
        </DialogActions>
    </Dialog>
);

export default withStyles(styles)(InfoModal);
