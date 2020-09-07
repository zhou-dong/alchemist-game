import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles, Tooltip, IconButton } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/RefreshOutlined';
import AssignmentIcon from '@material-ui/icons/AssignmentOutlined';
import CheckIcon from '@material-ui/icons/CheckCircleOutlined';
import CodeIcon from '@material-ui/icons/CodeRounded';

import Dialog from '../../components/Dialog';
import Formula from '../../components/Formula';
import Comments from '../../components/MainFooter';

import { State } from '../BasicState';

import Tree, { Node } from "../../components/trees/binary_tree";
import { PreOrderActions } from "../../components/trees/binary_tree/actions"

const styles = (theme: Theme) => createStyles({});
interface Props extends State, WithStyles<typeof styles> { }

const Description = ({ title, success, handleOpenDialogClick, handleOpenFormulaClick, handleRefreshClick }: Props) => (
    <div style={{ marginTop: '30px', fontSize: '18px' }} >
        {title.toUpperCase()}
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

const useWindowResize = (max: number) => {
    const [width, setWidth] = React.useState<number>(window.innerWidth);

    React.useEffect(() => {
        const updateWidth = () => setWidth(window.innerWidth);
        window.addEventListener('resize', updateWidth);
        updateWidth();
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    return Math.min(width, max);
};

const Algorithm = (props: Props) => {

    const root = props.other ? props.other as Node : new Node("root", true);

    const maxWidth = 1000;
    const heightUnit = 100;
    const width = useWindowResize(maxWidth);
    const height = root.depth * heightUnit;

    return (
        <div style={{ margin: "auto", "textAlign": "center" }}>
            <Description {...props} />
            <div style={{ marginBottom: "10px" }} />
            <Tree
                root={root}
                svgHeight={height}
                svgWidth={width}
                heightUnit={heightUnit}
                nodeRadius={20}
                y={40}
                challengeId={props.id}
                actions={new PreOrderActions(root)}
                leftTextContent="②LEFT"
                middleTextContent="①PRINT"
                rightTextContent="③RIGHT"
                goLeftIndex={1}
                printIndex={0}
                goRightIndex={2}
            />
            <Comments {...props} />
            <Dialog  {...props} />
            <Formula {...props} />
        </div>
    )
};

export default withStyles(styles)(Algorithm);
