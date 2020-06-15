import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles, IconButton, Avatar, Grid, TextField, Tooltip, Popover, Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreIcon from '@material-ui/icons/MoreVert';
import MoreCommentsIcon from '@material-ui/icons/MoreHoriz';
import { UserContext } from '../user/userContext';
import { Comment as CommentModel } from '../comments/comment';
import { getComments, saveOrUpdateComment, deleteComment } from '../comments/commentsUtils';
import { User } from '../user/user';
import { getUser } from '../user/userUtils';
import { isLastPage } from '../comments/pagination';

const styles = (theme: Theme) => createStyles({
    commentRoot: {
        marginTop: '30px',
        flexGrow: 1,
    },
    inputNoneBorder: {
        '& .MuiInput-underline:before': {
            border: 'none'
        },
        '& .MuiInputBase-input': {
            color: 'black'
        }
    },
    textField: {
        width: '100%',
    },
    margin: {
        margin: theme.spacing(1),
    }
});

interface Props extends WithStyles<typeof styles> {
    challengeId: number;
}

interface CommentProps extends CommentModel, WithStyles<typeof styles> {
    meId: number | null;
    comments: CommentModel[];
    setComments: React.Dispatch<React.SetStateAction<CommentModel[]>>;
}

const EmptyUser: User = { name: "", avatar: undefined, id: -1 };

const Comment = ({ content, classes, userId, meId, id, comments, setComments, createdTime }: CommentProps) => {
    const [user, setUser] = React.useState<User>({ ...EmptyUser });
    const ownedComment: boolean = meId ? (meId === userId) : false;

    if (user.id === EmptyUser.id) {
        setUser({ ...user, id: -2 }); // to prevent loop forever
        getUser(userId).then(result => {
            if (result) setUser(result);
        });
    }

    const handleDelete = (): void => {
        if (ownedComment) {
            deleteComment(id).then(result => {
                if (result) {
                    setComments(comments.filter(comment => comment.id !== id));
                }
            })
        }
    };

    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const openEdit = Boolean(anchorEl);
    return (
        <React.Fragment>
            <Grid container spacing={0} className={classes.commentRoot}>
                <Grid item xs={1}>
                    <Avatar
                        style={{ marginTop: "5px" }}
                        alt={user.name}
                        src={user.avatar || undefined}
                    />
                </Grid>
                <Grid item xs={10} style={{ paddingLeft: "15px" }}>
                    <TextField
                        label={`${user.name} ${createdTime}`}
                        multiline
                        rowsMax={4}
                        value={content}
                        className={`${classes.textField} ${classes.inputNoneBorder}`}
                        disabled
                    />
                </Grid>
                <Grid item xs={1}>
                    {ownedComment &&
                        <React.Fragment>
                            <IconButton
                                onClick={handlePopoverOpen}
                            >
                                <MoreIcon />
                            </IconButton>
                        </React.Fragment>
                    }
                    <Popover
                        open={openEdit}
                        anchorEl={anchorEl}
                        onClose={handlePopoverClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <Button
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </Popover>
                </Grid>
            </Grid>

        </React.Fragment>
    );
};

interface CreateNewCommentProps extends WithStyles<typeof styles> {
    challengeId: number;
    userId: number | undefined;
    userName: string | undefined;
    userAvatar: string | undefined;
    comments: CommentModel[];
    setComments: React.Dispatch<React.SetStateAction<CommentModel[]>>;
}

const CreateNewComment = ({ challengeId, userId, userName, userAvatar, classes, comments, setComments }: CreateNewCommentProps) => {
    const [content, setContent] = React.useState<string>("")

    const handleSend = () => {
        if (!userId || content.length === 0) {
            return;
        } else {
            const comment: CommentModel = { id: 0, userId, challengeId, content, parentId: undefined, createdTime: null };
            saveOrUpdateComment(comment).then(result => {
                if (result) {
                    setContent(""); // reset input placeholder.
                    setComments([result, ...comments]);
                }
            });
        }
    };

    return (
        <Grid container spacing={0} className={classes.commentRoot}>
            <Grid item xs={1}>
                <Avatar
                    style={{ marginTop: "5px" }}
                    alt={userName}
                    src={userAvatar}
                />
            </Grid>
            <Grid item xs={10} style={{ paddingLeft: "15px" }}>
                {
                    (userName && userId) ?
                        <TextField
                            className={classes.textField}
                            multiline
                            label={`Commenting as ${userName}`}
                            value={content}
                            onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>): void => setContent(ev.target.value)}
                        /> :
                        <TextField
                            className={classes.textField}
                            label="Sign in to comment."
                            disabled
                        />
                }

            </Grid>
            <Grid item xs={1}>
                {
                    (userName && userId) ?
                        <Tooltip title="SEND COMMENT" placement="right">
                            <IconButton onClick={handleSend}>
                                <SendIcon />
                            </IconButton>
                        </Tooltip> :
                        <IconButton disabled>
                            <SendIcon />
                        </IconButton>
                }
            </Grid>
        </Grid>
    )
};

const Comments = (props: Props) => {
    const { challengeId } = props;
    const { user } = React.useContext(UserContext);

    const [comments, setComments] = React.useState<CommentModel[]>([]);
    const [moreComments, setMoreComments] = React.useState<boolean>(false);
    const [page, setPage] = React.useState<number>(1);

    const getMoreComments = (): void => {
        getComments(challengeId, page).then(pagination => {
            setPage(p => p + 1);

            if (isLastPage(pagination)) {
                setMoreComments(false);
            } else {
                setMoreComments(true);
            }

            if (pagination.content.length > 0) {
                setComments(current => [...current, ...pagination.content]);
            }
        });
    };

    React.useEffect(getMoreComments, [])

    return (
        <React.Fragment>
            <CreateNewComment
                {...props}
                userId={user ? user.id : undefined}
                userName={user ? user.name : undefined}
                userAvatar={user ? (user.avatar || undefined) : undefined}
                comments={comments}
                setComments={setComments}
            />
            {
                comments.map((comment, index) => <Comment
                    key={index}
                    {...props}
                    {...comment}
                    meId={(user && user.id) || null}
                    comments={comments}
                    setComments={setComments}
                />)
            }
            <Grid justify="space-between" container className={props.classes.commentRoot}>
                {
                    moreComments && <Tooltip title="MORE COMMENTS" placement="right">
                        <Avatar onClick={getMoreComments}>
                            <MoreCommentsIcon />
                        </Avatar>
                    </Tooltip>
                }
            </Grid>

        </React.Fragment>
    );
};

export default withStyles(styles)(Comments);
