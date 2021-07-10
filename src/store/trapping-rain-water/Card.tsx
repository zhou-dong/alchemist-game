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

const backgroundColor = "rgb(69,69,69)";

const helperColorOne = "#faca48";
const helperColorTwo = "#fced88";
const helperColorThree = "green";

interface NumsTableParams {
    current: Point;
    data: number[];
    success: boolean;
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

const Heights = ({ data, current, success }: NumsTableParams) => {
    const { row, col } = current;
    if (row === 0) {
        return (
            <>
                {
                    data.map((item, i) => {
                        if (i + 1 === col) {
                            return <TableCell key={i} padding="none" style={{ backgroundColor: helperColorTwo }}>{item}</TableCell>
                        } else {
                            return <TableCell key={i} padding="none">{item}</TableCell>
                        }
                    })
                }
            </>
        );
    } else if (row === 1) {
        return (
            <>
                {
                    data.map((item, i) => {
                        if (i - 1 === col) {
                            return <TableCell key={i} padding="none" style={{ backgroundColor: helperColorTwo }}>{item}</TableCell>
                        } else {
                            return <TableCell key={i} padding="none">{item}</TableCell>
                        }
                    })
                }
            </>
        );
    } else {
        if (success) {
            return (
                <>
                    {data.map((item, i) => <TableCell key={i} padding="none">{item}</TableCell>)}
                </>
            );
        } else {
            return (
                <>
                    {
                        data.map((item, i) => {
                            if (i === col) {
                                return <TableCell key={i} padding="none" style={{ backgroundColor: helperColorTwo }}>{item}</TableCell>
                            } else {
                                return <TableCell key={i} padding="none">{item}</TableCell>
                            }
                        })
                    }
                </>
            );
        }
    }
};

const LeftMax = ({ data, current, success }: NumsTableParams) => {
    const { row, col } = current;
    if (row === 0) {
        return (
            <>
                {
                    data.map((item, i) => {
                        if (col === i) {
                            return <TableCell key={i} padding="none" style={{ color: helperColorThree, fontSize: 20 }}>?</TableCell>
                        }
                        if (col > i) {
                            if (i + 1 === col) {
                                return <TableCell key={i} padding="none" style={{ backgroundColor: helperColorOne }}>{item}</TableCell>
                            } else {
                                return <TableCell key={i} padding="none">{item}</TableCell>
                            }
                        } else {
                            return <TableCell key={i} padding="none"></TableCell>
                        }
                    })
                }
            </>
        );
    } else if (row === 1) {
        return (
            <>
                {data.map((item, i) => <TableCell key={i} padding="none">{item}</TableCell>)}
            </>
        );
    } else {
        if (success) {
            return (
                <>
                    {data.map((item, i) => <TableCell key={i} padding="none">{item}</TableCell>)}
                </>
            );
        } else {
            return (
                <>
                    {
                        data.map((item, i) => {
                            if (col === i) {
                                return <TableCell key={i} padding="none" style={{ backgroundColor: helperColorOne }}>{item}</TableCell>
                            } else {
                                return <TableCell key={i} padding="none">{item}</TableCell>
                            }
                        })
                    }
                </>
            );
        }
    }
};

const RightMax = ({ data, current, success }: NumsTableParams) => {
    const { row, col } = current;
    if (row === 0) {
        return (
            <>
                {data.map((_, i) => <TableCell key={i} padding="none"></TableCell>)}
            </>
        );
    } else if (row === 1) {
        return (
            <>
                {
                    data.map((item, i) => {
                        if (col === i) {
                            return <TableCell key={i} padding="none" style={{ color: helperColorThree, fontSize: 20 }}>?</TableCell>
                        } else if (i < col) {
                            return <TableCell key={i} padding="none"></TableCell>
                        } else {
                            if (i - 1 === col) {
                                return <TableCell key={i} padding="none" style={{ backgroundColor: helperColorOne }}>{item}</TableCell>
                            } else {
                                return <TableCell key={i} padding="none">{item}</TableCell>
                            }

                        }
                    })
                }
            </>
        );
    } else {
        if (success) {
            return (
                <>
                    {data.map((item, i) => <TableCell key={i} padding="none">{item}</TableCell>)}
                </>
            );
        } else {
            return (
                <>
                    {
                        data.map((item, i) => {
                            if (col === i) {
                                return <TableCell key={i} padding="none" style={{ backgroundColor: helperColorOne }}>{item}</TableCell>
                            } else {
                                return <TableCell key={i} padding="none">{item}</TableCell>
                            }
                        })
                    }
                </>
            );
        }
    }
};

const Water = ({ data, current, success }: NumsTableParams) => {
    if (current.row === 2) {
        if (success) {
            return (
                <>
                    {
                        data.map((item, i) => {
                            return <TableCell key={i} padding="none">{item}</TableCell>
                        })
                    }
                </>
            );
        } else {
            return (
                <>
                    {
                        data.map((item, i) => {
                            if (current.col === i) {
                                return <TableCell key={i} padding="none" style={{ color: helperColorThree, fontSize: 20 }}>?</TableCell>
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
        }
    } else {
        return (
            <>
                {data.map((_, i) => <TableCell key={i} padding="none"></TableCell>)}
            </>
        );
    }
};

const al = `waterHeight = Math.Min(MaxLeft, MaxRight);              
water = waterHeight > Height ? waterHeight - Height : 0;`

const Total = ({ data, current, success }: NumsTableParams) => {
    if (current.row < 2) {
        return (<TableCell padding="none">0</TableCell>);
    } else {
        if (success) {
            return (
                <TableCell padding="none" style={{ backgroundColor: "green", color: "white", fontSize: 20 }}>
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
        <div>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell padding="none" style={{ backgroundColor, color: "white" }}>Height </TableCell>
                        <Heights data={props.heights} current={props.currentPoint} success={props.success} />
                    </TableRow>
                </TableBody>
            </Table>
        </div>

        <CodeBlock content="max = Math.Max(max, Height[i-1]); i++;" />
        <div>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell padding="none" style={{ backgroundColor, color: "white" }}>Max Left</TableCell>
                        <LeftMax data={props.leftMax} current={props.currentPoint} success={props.success} />
                    </TableRow>
                </TableBody>
            </Table>
        </div>

        <CodeBlock content="max = Math.Max(max, Height[i+1]); i--;" />
        <div>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell padding="none" style={{ backgroundColor, color: "white" }}>Max Right</TableCell>
                        <RightMax data={props.rightMax} current={props.currentPoint} success={props.success} />
                    </TableRow>
                </TableBody>
            </Table>
        </div>

        <CodeBlock content={al} />
        <div>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell padding="none" style={{ backgroundColor, color: "white" }}>Water</TableCell>
                        <Water data={props.water} current={props.currentPoint} success={props.success} />
                    </TableRow>
                </TableBody>
            </Table>
        </div>

        <CodeBlock content="total += water;" />
        <div>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell padding="none" style={{ backgroundColor, color: "white" }}>Total</TableCell>
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
