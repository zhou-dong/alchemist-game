import * as React from 'react';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Done from '@material-ui/icons/Done';
import Star from '@material-ui/icons/Star';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { drawerWidth } from '../withRoot';
import Names, { getId } from '../../algorithms/Names';
import { RecordsContext } from '../../records/recordsContext';
import { Records } from '../../records/records';
import { Record } from '../../records/record';
import { LikesContext } from '../../likes/likesContext';
import { Like } from '../../likes/like';
import { LikesState } from '../../likes/likesState';

const styles = (theme: Theme) => createStyles({
    drawerPaper: {
        position: 'absolute',
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
});

interface Props extends WithStyles<typeof styles> {
    open?: boolean;
    closeDrawer: () => void;
}

const linkStyle: React.CSSProperties = {
    textDecoration: 'none',
    color: 'inherit',
    width: '100%',
    textTransform: 'initial',
    textAlign: 'left',
};

const listStyle: React.CSSProperties = {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    width: '100%',
    textAlign: 'left',
};

const buttonStyle: React.CSSProperties = {
    borderRadius: 0,
    width: '100%',
    textAlign: 'left',
};

const doneStyle: React.CSSProperties = {
    color: 'green',
    paddingRight: 5,
};

const likeStyle: React.CSSProperties = {
    color: 'gold',
    paddingRight: 5,
};

const getName = (name: string) => name.split('').map(ch => (ch === '_') ? ' ' : ch).join('');

interface DoneProps {
    done: boolean;
}

const DoneComponent = ({ done }: DoneProps) => {
    return done ? <Done style={doneStyle} /> : <React.Fragment />;
};

interface LikeParams {
    enabled: boolean;
}

const LikeComponent = ({ enabled }: LikeParams) => {
    return enabled ? <Star style={likeStyle} /> : <React.Fragment />;
};

const Challenges = (records: Record[], likes: Like[]) => Object.keys(Names).map(key => {
    // const name = Names[key];
    const name = (Names as any)[key];
    const id = getId(name);
    const done = records.map(record => record.challengeId).includes(id);
    const doesLike = likes.filter(like => like.enabled).map(like => like.challengeId).includes(id);
    return (
        <ListItem key={key} style={listStyle}>
            <Button style={buttonStyle}>
                <DoneComponent done={done} />
                <Link to={`/algorithms/${name}`} style={linkStyle}>
                    {getName(key)}
                </Link>
                <LikeComponent enabled={doesLike} />
            </Button>
        </ListItem>
    );
});

const Sidebar = (props: Props) => {
    const { classes, open, closeDrawer } = props;
    const recordsState = React.useContext<Partial<Records>>(RecordsContext);
    const records = recordsState.records || [];
    const likesState = React.useContext<Partial<LikesState>>(LikesContext);
    const likes = likesState.likes || [];
    return (
        <Drawer
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div
                tabIndex={0}
                role="button"
                onClick={closeDrawer}
                onKeyDown={closeDrawer}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={closeDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>{Challenges(records, likes)}</List>

            </div>
        </Drawer>
    );
};

export default withStyles(styles)(Sidebar);
