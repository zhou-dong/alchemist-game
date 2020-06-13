import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles, IconButton } from '@material-ui/core';
import FavoriteTrue from '@material-ui/icons/Favorite';
import FavoriteFalse from '@material-ui/icons/FavoriteBorderOutlined';

import { LikesContext } from '../likes/likesContext';
import { LikesState } from '../likes/likesState';
import { getLikes, save as saveLike, update as updateLike } from '../likes/likesUtils';
import { Like } from '../likes/like';

const styles = (theme: Theme) => createStyles({});

interface Props extends WithStyles<typeof styles> {
    challengeId: number;
}

const Favorite = ({ challengeId }: Props) => {
    const { likes, setLikes } = React.useContext<Partial<LikesState>>(LikesContext);
    const like: Like | null = likes ? likes.filter(item => item.challengeId === challengeId)[0] : null;
    const enabled: boolean = like ? like.enabled : false;

    const updateLocalLikes = (toUpdate: Like): Like[] => {
        const clonedLikes: Like[] = likes ? likes.filter(item => item.id !== toUpdate.id) : [];
        clonedLikes.push(toUpdate);
        return clonedLikes;
    };

    const handleUpdate = (newLike: Like): void => {
        updateLike(newLike).then(result => {
            if (result && setLikes) {
                setLikes(updateLocalLikes(newLike));
            }
        });
    }

    const handleEnableLike = () => {
        if (like) {
            handleUpdate({ ...like, enabled: true });
        } else {
            saveLike(challengeId).then(saved => {
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
        if (like && enabled) {
            handleUpdate({ ...like, enabled: false });
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

export default withStyles(styles)(Favorite);
