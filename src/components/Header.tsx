
import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles, Button, ButtonGroup, Collapse } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/RefreshOutlined';
import AssignmentIcon from '@material-ui/icons/AssignmentOutlined';
import CheckIcon from '@material-ui/icons/CheckCircleOutlined';
import WrongIcon from '@material-ui/icons/ErrorOutline';
import StepsIcon from '@material-ui/icons/PollOutlined';
import CodeIcon from '@material-ui/icons/CodeRounded';
import LikeIcon from '@material-ui/icons/Favorite';
import DislikeIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { Header as HeaderProps } from '../store/BasicState';
import { Records } from '../records/records';
import { RecordsContext } from '../records/recordsContext';
import { save as saveRecord } from '../records/recordsUtils';
import { Alert } from '@material-ui/lab';
import { UserContext } from '../user/userContext';
import { UserState } from '../user/user';
import { LikesContext } from '../likes/likesContext';
import { LikesState } from '../likes/likesState';
import { getLikes, save as saveLike, update as updateLike } from '../likes/likesUtils';
import { Like } from '../likes/like';

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

interface AlertProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PleaseSignIn = ({ open, setOpen }: AlertProps) => (
    <Collapse in={open}>
        <Alert severity="success" onClose={() => setOpen(false)}>
            <strong>Congratulation ! </strong> Also you cloud sign in to save your records.
        </Alert>
    </Collapse>
);

interface DoesLikeParams {
    enabled: boolean;
    handleEnableLike: () => void;
    handleDisableLike: () => void;
}

const DoesLike = ({ enabled, handleEnableLike, handleDisableLike }: DoesLikeParams) => {
    if (enabled) {
        return (
            <IconButton onClick={handleDisableLike}>
                <LikeIcon style={{ color: 'rgb(255, 23, 68)' }} />
            </IconButton>
        );
    } else {
        return (
            <IconButton onClick={handleEnableLike}>
                <DislikeIcon />
            </IconButton>
        );
    }
};

const HeaderTitle = ({ id, title, success, handleOpenDialogClick }: Props) => {
    const { records, setRecords } = React.useContext<Partial<Records>>(RecordsContext);
    const { user } = React.useContext<Partial<UserState>>(UserContext);
    const { likes, setLikes } = React.useContext<Partial<LikesState>>(LikesContext);

    const inSucceedList = records ? records.map(record => record.challengeId).includes(id) : false;
    const like: Like | null = likes ? likes.filter(item => item.challengeId === id)[0] : null;
    const enabledLike: boolean = like ? like.enabled : false;
    const [alertOpen, setAlertOpen] = React.useState(false);

    // Uncaught Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.
    // if (success && !userState.user) {
    //     setTimeout(() => { setAlertOpen(true); }, 1000);
    // }
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

    if (success && user && setRecords && records && !inSucceedList) {
        saveRecord(id).then(record => {
            if (record && setRecords) {
                const cloneRecords = records ? [...records] : [];
                cloneRecords.push(record);
                setRecords(cloneRecords);
            }
        });
    }

    return (
        <div>
            <PleaseSignIn open={alertOpen} setOpen={setAlertOpen} />
            <IconButton onClick={handleOpenDialogClick}>
                {success ? <CheckIcon style={{ color: 'green' }} /> : <AssignmentIcon style={{ color: 'black' }} />}
            </IconButton>
            <strong>{title.toUpperCase()}</strong>
            <DoesLike enabled={enabledLike} handleEnableLike={handleEnableLike} handleDisableLike={handleDisableLike} />
        </div>
    );
};

const Header = (props: Props) => {
    const { steps, errors } = props;
    return (<div style={{ marginTop: '50px', marginBottom: '10px' }} >
        <HeaderTitle {...props} />

        <ButtonGroup variant="contained" size="small" style={{ marginTop: '25px' }}>
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
        <ButtonGroup variant="contained" size="small" style={{ marginTop: '10px', marginLeft: '10px' }}>
            <Button
                variant="outlined"
                startIcon={<StepsIcon />}
            >
                Steps: {steps}
            </Button>
            <Button
                variant="outlined"
                startIcon={<WrongIcon style={{ color: '#ff1744' }} />}
            >
                Errors: {errors}
            </Button>
        </ButtonGroup>
    </div >
    );
};

export default withStyles(styles)(Header);