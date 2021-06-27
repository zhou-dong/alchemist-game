import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { TableCell, TableRow, WithStyles } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Highlight from "react-highlight";

import Header from '../../components/MainHeader';
import DisplayTable from '../../components/Table';
import Buttons from '../../components/Buttons';
import { State } from './state';
import Dialog from '../../components/Dialog';
import Formula from '../../components/Formula';
import Comments from '../../components/MainFooter';
import { Table, TableBody } from '@material-ui/core';
import { Point } from '../BasicState';

const styles = (_: Theme) => createStyles({});
interface Props extends State, WithStyles<typeof styles> { }

interface NumsTableParams {
    current: Point;
    data: number[];
    success?: boolean;
}

interface CodeBlockParams {
    content: string;
}

const CodeBlock = ({ content }: CodeBlockParams) => (
    <div style={{ textAlign: "center", display: "inline-block" }}>
        <Highlight className='javascript'>
            {content}
        </Highlight>
    </div>
);

const Heights = ({ data }: NumsTableParams) => (
    <div>
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell padding="none" style={{ backgroundColor: "darkgray", color: "white" }}>Height </TableCell>
                    {data.map((item, i) => <TableCell key={i} padding="none">{item}</TableCell>)}
                </TableRow>
            </TableBody>
        </Table>
    </div>
);

const LeftMax = ({ data, current }: NumsTableParams) => {
    if (current.row === 0) {
        return (
            <>
                {
                    data.map((item, i) => {
                        if (current.col === i) {
                            return <TableCell key={i} padding="none">?</TableCell>
                        }
                        if (current.col > i) {
                            return <TableCell key={i} padding="none">{item}</TableCell>
                        } else {
                            return <TableCell key={i} padding="none"></TableCell>
                        }
                    })
                }
            </>
        );
    } else {
        return (
            <>
                {data.map((item, i) => <TableCell key={i} padding="none">{item}</TableCell>)}
            </>
        );
    }
};

const RightMax = ({ data, current }: NumsTableParams) => {
    if (current.row === 0) {
        return (
            <>
                {data.map((item, i) => <TableCell key={i} padding="none"></TableCell>)}
            </>
        );
    } else if (current.row === 1) {
        return (
            <>
                {
                    data.map((item, i) => {
                        if (current.col === i) {
                            return <TableCell key={i} padding="none">?</TableCell>
                        } else if (i < current.col) {
                            return <TableCell key={i} padding="none"></TableCell>
                        } else {
                            return <TableCell key={i} padding="none">{item}</TableCell>
                        }
                    })
                }
            </>
        );
    } else {
        return (
            <>
                {data.map((item, i) => <TableCell key={i} padding="none">{item}</TableCell>)}
            </>
        );
    }
};

const Water = ({ data, current }: NumsTableParams) => {
    if (current.row === 2) {
        return (
            <>
                {
                    data.map((item, i) => {
                        if (current.col === i) {
                            return <TableCell key={i} padding="none">?</TableCell>
                        }
                        if (current.col > i) {
                            return <TableCell key={i} padding="none">{item}</TableCell>
                        } else {
                            return <TableCell key={i} padding="none"></TableCell>
                        }
                    })
                }
            </>
        );
    } else {
        return (
            <>
                {data.map((item, i) => <TableCell key={i} padding="none"></TableCell>)}
            </>
        );
    }
};

const al = `waterHeight = Math.Min(LeftMax, RightMax);              
water = waterHeight > Height ? waterHeight - Height : 0;`

const Total = ({ data, current, success }: NumsTableParams) => {
    if (current.row < 2) {
        return (<TableCell padding="none">0</TableCell>);
    } else {
        if (success) {
            return (
                <TableCell padding="none" style={{ backgroundColor: "green" }}>
                    {
                        data.reduce((one, two) => one + two)
                    }
                </TableCell>
            );
        } else {
            return (
                <TableCell padding="none">
                    {
                        data
                            .map((item, i) => {
                                if (i >= current.col) {
                                    return 0;
                                } else {
                                    return item;
                                }
                            })
                            .reduce((one, two) => one + two)
                    }
                </TableCell>
            );
        }
    }
};

const Algorithm = (props: Props) => (
    <div style={{ margin: 'auto', textAlign: 'center' }}>
        <Header {...props} />

        <DisplayTable {...props} />

        <div style={{ marginTop: 10 }}>  </div>
        <Heights data={props.heights} current={props.currentPoint} />

        <CodeBlock content="max = Math.Max(max, Height[i-1]); i++;" />
        <div>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell padding="none" style={{ backgroundColor: "darkgray", color: "white" }}>Left Max</TableCell>
                        <LeftMax data={props.leftMax} current={props.currentPoint} />
                    </TableRow>
                </TableBody>
            </Table>
        </div>

        <CodeBlock content="max = Math.Max(max, Height[i+1]); i--;" />
        <div>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell padding="none" style={{ backgroundColor: "darkgray", color: "white" }}>Right Max</TableCell>
                        <RightMax data={props.rightMax} current={props.currentPoint} />
                    </TableRow>
                </TableBody>
            </Table>
        </div>

        <CodeBlock content={al} />
        <div>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell padding="none" style={{ backgroundColor: "darkgray", color: "white" }}>Water</TableCell>
                        <Water data={props.water} current={props.currentPoint} />
                    </TableRow>
                </TableBody>
            </Table>
        </div>

        <CodeBlock content="total += water;" />
        <div>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell padding="none" style={{ backgroundColor: "darkgray", color: "white" }}>Total</TableCell>
                        <Total data={props.water} current={props.currentPoint} success={props.success} />
                    </TableRow>
                </TableBody>
            </Table>
        </div>

        <CardContent>
            <Buttons {...props} />
        </CardContent>
        <Comments {...props} />
        <Dialog  {...props} />
        <Formula {...props} />
    </div>
);

export default withStyles(styles)(Algorithm);
