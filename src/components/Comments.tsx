import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles, Divider, IconButton, Avatar, Grid, TextField, FormControl, Tooltip } from '@material-ui/core';
import Send from '@material-ui/icons/Send';

import { State as BasicState } from '../store/BasicState';
import { UserContext } from '../user/userContext';

import Favorite from './Favorite';
import Thumbs from './Thumbs';

const styles = (theme: Theme) => createStyles({
    root: {
        width: "70%",
        textAlign: 'center',
        margin: "auto",
        marginTop: "60px"
    },
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        width: '100%',
    },
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
});

interface Props extends BasicState, WithStyles<typeof styles> { }

const Comments = (props: Props) => {
    const { user } = React.useContext(UserContext);
    return (
        <Grid
            container
            justify="center"
            spacing={0}
        >
            <Grid item xs={1}>
                <Avatar
                    style={{ marginTop: "5px", marginLeft: "10px" }}
                    alt={(user && user.name) || undefined}
                    src={(user && user.avatar) || undefined}
                />
            </Grid>

            <Grid item xs={10}>
                <FormControl className={props.classes.textField}>
                    <TextField id="input-with-icon-grid" label="Commenting publicly as DONG ZHOU" />
                </FormControl>
            </Grid>

            <Grid item xs={1}>
                <Grid container alignItems="flex-start" justify="flex-end">
                    <Tooltip title="SEND COMMENT" placement="right">
                        <IconButton>
                            <Send />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default withStyles(styles)(Comments);
