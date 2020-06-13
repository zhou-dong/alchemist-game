
import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles, Chip } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/RefreshOutlined';
import AssignmentIcon from '@material-ui/icons/AssignmentOutlined';
import CheckIcon from '@material-ui/icons/CheckCircleOutlined';
import CodeIcon from '@material-ui/icons/CodeRounded';
import Tooltip from '@material-ui/core/Tooltip';
import WrongIcon from '@material-ui/icons/ErrorOutline';
import StepsIcon from '@material-ui/icons/PollOutlined';

import { Header as HeaderProps } from '../store/BasicState';
import { Records } from '../records/records';
import { RecordsContext } from '../records/recordsContext';
import { save as saveRecord, getRecords } from '../records/recordsUtils';
import { Record } from '../records/record';

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
    margin: {
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
});

interface Props extends HeaderProps, WithStyles<typeof styles> { }

// interface AlertProps {
//     open: boolean;
//     setOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }
// const PleaseSignIn = ({ open, setOpen }: AlertProps) => (
//     <Collapse in={open}>
//         <Alert severity="success" onClose={() => setOpen(false)}>
//             <strong>Congratulation ! </strong> Also you cloud sign in to save your records.
//         </Alert>
//     </Collapse>
// );

// const [alertOpen, setAlertOpen] = React.useState(false);
// Uncaught Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.
// if (success && !userState.user) {
//     setTimeout(() => { setAlertOpen(true); }, 1000);
// }

interface TitleParams {
    challengeId: number;
    success: boolean;
    title: string;
}

const Title = ({ success, challengeId, title }: TitleParams) => {

    const { records, setRecords } = React.useContext<Partial<Records>>(RecordsContext);

    const inSucceedList = records ? records.map(record => record.challengeId).includes(challengeId) : false;

    const updateLocalRecords = (currentRecords: Record[], newRecords: Record[]): void => {
        if (!setRecords) {
            return;
        }
        const currentIds = currentRecords.map(record => record.challengeId).sort();
        const newIds = newRecords.map(record => record.challengeId).sort();

        const str1 = JSON.stringify(currentIds);
        const str2 = JSON.stringify(newIds);

        if (str1 !== str2) {
            setRecords(newRecords);
        }
    };

    if (success && setRecords && records && !inSucceedList) {
        saveRecord(challengeId).then(saveResult => {
            if (!saveResult) {
                return;
            }
            getRecords().then(newRecords => {
                if (records && newRecords) {
                    updateLocalRecords(records, newRecords);
                }
            });
        });
    }

    return (
        <React.Fragment>
            {title.toUpperCase()}
        </React.Fragment>
    );
};

const Description = ({ title, success, id, handleOpenDialogClick, handleOpenFormulaClick, handleRefreshClick }: Props) => (
    <div style={{ marginTop: '30px', fontSize: '18px' }} >
        <Title challengeId={id} success={success} title={title} />
        <Tooltip title="DESCRIPTION" placement="top">
            <IconButton onClick={handleOpenDialogClick}>
                {success ? <CheckIcon style={{ color: 'green' }} /> : <AssignmentIcon style={{ color: '' }} />}
            </IconButton>
        </Tooltip>
        <Tooltip title="CODE" placement="top">
            <IconButton onClick={handleOpenFormulaClick}>
                <CodeIcon />
            </IconButton>
        </Tooltip>

        <Tooltip title="REFRESH" placement="top">
            <IconButton onClick={handleRefreshClick}>
                <RefreshIcon />
            </IconButton>
        </Tooltip>
    </div >
);

const RecordsSecion = ({ steps, errors, classes }: Props) => (
    <div>
        <Chip
            style={{ border: "none" }}
            variant="outlined"
            icon={<StepsIcon />}
            label={`STEPS: ${steps}`}
            className={classes.margin}
        />
        <Chip
            style={{ border: "none" }}
            variant="outlined"
            icon={<WrongIcon />}
            label={`ERRORS: ${errors}`}
            className={classes.margin}
        />
    </div>
);

const Header = (props: Props) => (
    <React.Fragment>
        <Description {...props} />
        <RecordsSecion {...props} />
    </React.Fragment>
);

export default withStyles(styles)(Header);
