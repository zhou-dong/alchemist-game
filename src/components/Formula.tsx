import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Formula } from '../store/BasicState';
import CodeBlock, { Languares } from './CodeBlock';

const styles = (theme: Theme) => createStyles({
    title: {
        padding: theme.spacing(1),
        paddingBottom: 0,
    },
    content: {
        paddingTop: 0,
    },
    actions: {
        paddingTop: 0,
    },
});

interface Props extends Formula, WithStyles<typeof styles> { }

const InfoModal = (props: Props) => (
    <Dialog open={props.formulaOpen} onClose={props.handleFormulaOnClose} scroll={props.formulaCroll} >
        <DialogTitle className={props.classes.title} >
            <Typography variant="body1">FORMULA</Typography>
        </DialogTitle>
        <DialogContent className={props.classes.content}>
            <CodeBlock code={props.formula} language={Languares.Javascript} />
        </DialogContent>
        <DialogActions className={props.classes.actions}>
            <Button autoFocus onClick={props.handleCloseFormulaClick}>CLOSE</Button>
        </DialogActions>
    </Dialog>
);

export default withStyles(styles)(InfoModal);
