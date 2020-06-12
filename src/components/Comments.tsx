import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles, Divider, IconButton, Avatar, Grid, TextField, InputAdornment, FormControl, InputLabel, Input, Button, Tooltip, Chip } from '@material-ui/core';
import ThumbUp from '@material-ui/icons/ThumbUpOutlined';
import ThumbDown from '@material-ui/icons/ThumbDownOutlined';
import FavoriteTrue from '@material-ui/icons/Favorite';
import FavoriteFalse from '@material-ui/icons/FavoriteBorderOutlined';
import Send from '@material-ui/icons/Send';


import RefreshIcon from '@material-ui/icons/RefreshOutlined';
import AssignmentIcon from '@material-ui/icons/AssignmentOutlined';
import CheckIcon from '@material-ui/icons/CheckCircleOutlined';
import CodeIcon from '@material-ui/icons/CodeRounded';
import WrongIcon from '@material-ui/icons/ErrorOutline';
import StepsIcon from '@material-ui/icons/PollOutlined';

import { State as BasicState } from '../store/BasicState';
import { LikesContext } from '../likes/likesContext';
import { LikesState } from '../likes/likesState';
import { getLikes, save as saveLike, update as updateLike } from '../likes/likesUtils';
import { Like } from '../likes/like';
import { UserContext } from '../user/userContext';
import { User } from '../user/user';
import { signOut } from '../user/userUtils';
import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = (theme: Theme) => createStyles({
    root: {
        width: "50%",
        textAlign: 'center',
        margin: "auto",
        marginTop: "30px"
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

interface FavoriteParams {
    id: number;
}

const Favorite = ({ id }: FavoriteParams) => {
    const { likes, setLikes } = React.useContext<Partial<LikesState>>(LikesContext);
    const like: Like | null = likes ? likes.filter(item => item.challengeId === id)[0] : null;
    const enabled: boolean = like ? like.enabled : false;

    const updateLocalLikes = (toUpdate: Like): Like[] => {
        const clonedLikes: Like[] = likes ? likes.filter(item => item.id !== toUpdate.id) : [];
        clonedLikes.push(toUpdate);
        return clonedLikes;
    };

    const handleEnableLike = () => {
        if (like) {
            const clonedLike: Like = { ...like, enabled: true };
            updateLike(clonedLike).then(enabled => {
                if (enabled && setLikes) {
                    setLikes(updateLocalLikes(clonedLike));
                }
            });
        } else {
            saveLike(id).then(saved => {
                if (saved && setLikes) {
                    getLikes().then(responseLikes => {
                        if (setLikes) {
                            setLikes(responseLikes);
                        }
                    });
                }
            });
        }

    };

    const handleDisableLike = () => {
        if (like) {
            const clonedLike: Like = { ...like, enabled: false };
            updateLike(clonedLike).then(disabled => {
                if (disabled && setLikes) {
                    setLikes(updateLocalLikes(clonedLike));
                }
            });
        }
    };

    if (enabled) {
        return (
            <IconButton onClick={handleDisableLike}>
                <FavoriteTrue style={{ color: 'rgb(255, 23, 68)' }} />
            </IconButton>
        );
    } else {
        return (
            <IconButton onClick={handleEnableLike}>
                <FavoriteFalse />
            </IconButton>
        );
    }
};

const Comments = (props: Props) => {
    const { user } = React.useContext(UserContext);
    return (
        <div className={props.classes.root}>

            <Grid container>

                <Grid item xs={6}>
                    <Grid container alignItems="flex-start" justify="flex-start">
                        <Favorite {...props} />
                        <Chip
                            variant="outlined"
                            icon={<ThumbUp />}
                            label={100}
                            className={props.classes.margin}
                        />
                        <Chip
                            variant="outlined"
                            icon={<ThumbDown />}
                            label={100}
                            className={props.classes.margin}
                        />
                    </Grid>
                </Grid>

                <Grid item xs={6}>
                    <Grid container alignItems="flex-start" justify="flex-end">
                        <Chip
                            variant="outlined"
                            icon={<StepsIcon />}
                            label={`Total Steps: ${props.steps}`}
                            className={props.classes.margin}
                        />


                        <Chip
                            variant="outlined"
                            icon={<WrongIcon />}
                            label={`Errors: ${props.errors}`}
                            className={props.classes.margin}
                        />
                    </Grid>
                </Grid>

            </Grid>

            <Divider style={{ marginBottom: "20px" }} />


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


        </div>
    );
};

export default withStyles(styles)(Comments);