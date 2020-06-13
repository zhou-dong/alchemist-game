import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles, Chip } from '@material-ui/core';
import ThumbUp from '@material-ui/icons/ThumbUpOutlined';
import ThumbDown from '@material-ui/icons/ThumbDownOutlined';
import ThumbedUp from '@material-ui/icons/ThumbUp';
import ThumbedDown from '@material-ui/icons/ThumbDown';

import { getThumbs, getThumb, sendThumb } from '../thumbs/thumbsUtils';
import { Thumbs as ThumbsModel, Thumb, ThumbType } from '../thumbs/thumbs';

const styles = (theme: Theme) => createStyles({
    margin: {
        margin: theme.spacing(1),
    },
});

interface Props extends WithStyles<typeof styles> {
    challengeId: number;
}

interface ThumbProps extends WithStyles<typeof styles> {
    thumbs: ThumbsModel;
    thumb: ThumbType;
    handleThumbUp: () => void;
    handleThumbDown: () => void;
    handleRemoveThumb: () => void
}

const ThumbComponent = (props: ThumbProps) => {
    switch (props.thumb) {
        case ThumbType.NONE: return <ThumbNoneComponent  {...props} />
        case ThumbType.UP: return <ThumbUpComponent  {...props} />
        case ThumbType.DOWN: return <ThumbDownComponent  {...props} />
        default: return <ThumbNoneComponent  {...props} />
    }
};

const ThumbNoneComponent = ({ classes, thumbs, handleThumbUp, handleThumbDown }: ThumbProps) => (
    <React.Fragment>
        <Chip
            style={{ border: "none" }}
            variant="outlined"
            icon={<ThumbUp />}
            label={thumbs.ups}
            className={classes.margin}
            onClick={handleThumbUp}
        />
        <Chip
            style={{ border: "none" }}
            variant="outlined"
            icon={<ThumbDown />}
            label={thumbs.downs}
            className={classes.margin}
            onClick={handleThumbDown}
        />
    </React.Fragment>
);

const ThumbUpComponent = ({ classes, thumbs, handleRemoveThumb, handleThumbDown }: ThumbProps) => (
    <React.Fragment>
        <Chip
            style={{ border: "none" }}
            variant="outlined"
            icon={<ThumbedUp />}
            label={thumbs.ups}
            className={classes.margin}
            onClick={handleRemoveThumb}
        />
        <Chip
            style={{ border: "none" }}
            variant="outlined"
            icon={<ThumbDown />}
            label={thumbs.downs}
            className={classes.margin}
            onClick={handleThumbDown}
        />
    </React.Fragment>
);

const ThumbDownComponent = ({ classes, thumbs, handleRemoveThumb, handleThumbUp }: ThumbProps) => (
    <React.Fragment>
        <Chip
            style={{ border: "none" }}
            variant="outlined"
            icon={<ThumbUp />}
            label={thumbs.ups}
            className={classes.margin}
            onClick={handleThumbUp}
        />
        <Chip
            style={{ border: "none" }}
            variant="outlined"
            icon={<ThumbedDown />}
            label={thumbs.downs}
            className={classes.margin}
            onClick={handleRemoveThumb}
        />
    </React.Fragment>
);

const Thumbs = ({ challengeId, classes }: Props) => {

    const [thumbs, setThumbs] = React.useState<ThumbsModel>({ ups: 0, downs: 0 });
    const [thumb, setThumb] = React.useState<Thumb>({ challengeId, thumb: ThumbType.NONE });

    const updateLocalThumb = (result: Thumb | null): void => {
        if (result) {
            setThumb(result);
        }
    };

    const handleThumbDown = () => {
        sendThumb(challengeId, 0).then(result => updateLocalThumb(result));
    };

    const handleThumbUp = () => {
        sendThumb(challengeId, 1).then(result => updateLocalThumb(result));
    };

    const handleRemoveThumb = () => {
        sendThumb(challengeId, 2).then(result => updateLocalThumb(result));
    };

    const updateThumbs = (): void => {
        getThumbs(challengeId).then(results => {
            if (results) {
                setThumbs(results);
            }
        });
    };

    const updateThumb = (): void => {
        getThumb(challengeId).then(result => {
            if (result && (JSON.stringify(result) !== JSON.stringify(thumb))) {
                setThumb(result);
            }
        });
    };

    React.useEffect(updateThumbs, []);
    React.useEffect(updateThumb, []);
    React.useEffect(updateThumbs, [thumb]);

    return (
        <ThumbComponent
            thumbs={thumbs}
            thumb={thumb.thumb}
            classes={classes}
            handleThumbUp={handleThumbUp}
            handleThumbDown={handleThumbDown}
            handleRemoveThumb={handleRemoveThumb}
        />
    );
};

export default withStyles(styles)(Thumbs);
