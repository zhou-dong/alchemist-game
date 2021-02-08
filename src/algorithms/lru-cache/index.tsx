import { Grid, InputLabel, Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { FormHelperText } from "@material-ui/core";
import { Avatar, Chip, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import React, { useEffect, useRef, useState } from "react";
import LRUCache from "../../components/lru-cache";
import nbaTeams from "./nba_teams.json" // fetch nba teams from: "https://www.balldontlie.io/api/v1/teams"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        titie: {
            position: "fixed",
            top: "80px",
            width: "100%",
        },
        team: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(0.2),
            },
            color: "grey"
        },
        teams: {
            position: "fixed",
            top: "100px",
            right: "30px"
        },
        teamIndex: {
            width: theme.spacing(6),
            height: theme.spacing(6),
        },
        operators: {
            position: "fixed",
            bottom: "70px",
            width: "100%"
        },
        capacity: {
            position: "fixed",
            top: "100px",
            left: "30px",
            color: "gray"
        },
        displayTeam: {
            position: "fixed",
            bottom: "160px",
            width: "100%",
            color: "gray"
        },
        displayTeamCell: {
            fontSize: "12px",
            height: "30px",
        }
    }),
);

interface Team {
    id: number;
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    name: string;
}

const teams: Team[] = nbaTeams["data"];
const capacity = 8;
const cache: LRUCache<Team> = new LRUCache(capacity);

interface SelectorParams {
    setButtionsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
    setResult: React.Dispatch<React.SetStateAction<Team | undefined>>;
}

const GetSelector = ({ setButtionsDisabled, setResult }: SelectorParams) => {
    const [id, setId] = useState(1);

    const handleChange = async (event: React.ChangeEvent<{ value: unknown }>) => {
        const selected = parseInt(event.target.value + "");
        setButtionsDisabled(true);
        const result = await cache.get(selected);
        setId(selected);
        if (result) {
            setResult(getTeam(selected));
        } else {
            setResult(undefined);
        }
        setButtionsDisabled(false);
    };

    return (
        <>
            <InputLabel htmlFor="get-by-id">GET: (KEY)</InputLabel>
            <Select
                native
                value={id}
                onChange={handleChange}
                inputProps={{ id: "get-by-id" }}
                color="primary"
            >
                {teams.map((team, i) => <option key={i} value={team["id"]}>{team["id"]}</option>)}
            </Select>
            <FormHelperText>Get item by key from cache.</FormHelperText>
        </>
    );
};

const getTeam = (id: number): Team => {
    return teams.filter(team => team.id === id)[0];
}

const PutSelector = ({ setButtionsDisabled, setResult }: SelectorParams) => {

    const handleChange = async (event: React.ChangeEvent<{ value: unknown }>) => {
        setButtionsDisabled(true);
        const selected = parseInt(event.target.value + "");
        const team = getTeam(selected);
        await cache.put(selected, team, team["abbreviation"]);
        setResult(getTeam(selected));
        setButtionsDisabled(false);
    };

    return (
        <>
            <InputLabel htmlFor="put-team">PUT: (KEY, VALUE)</InputLabel>
            <Select
                native
                onChange={handleChange}
                inputProps={{ id: 'put-team' }}
                color="primary"
            >
                {
                    teams.map((team, i) => <option key={i} value={team["id"]}>{team["id"]}, {team["full_name"]}</option>)
                }
            </Select>
            <FormHelperText>Save or Update item in cache.</FormHelperText>
        </>
    );
};

const Teams = () => {
    const classes = useStyles();
    const subs: Team[][] = [];
    for (let i = 0; i < teams.length; i++) {
        const team = teams[i];
        const level = Math.floor(i / 2);
        if (!subs[level]) {
            subs.push([]);
        }
        subs[level].push(team);
    }
    return (
        <div className={classes.teams}>
            <Typography align="center" variant="body2" style={{ color: "gray" }}>NBA TEAMS</Typography>
            {
                subs.map((sub, i) => <div key={i} className={classes.team}> {
                    sub.map((team, j) => <Chip
                        style={{ color: "gray" }}
                        key={j}
                        variant="outlined"
                        label={team["abbreviation"]}
                        avatar={<Avatar className={classes.teamIndex} style={{ color: "white" }}>{team["id"]}</Avatar>}
                    />)
                } </div>)
            }
        </div>
    );
};

interface ResultParams {
    team?: Team;
}

const Result = ({ team }: ResultParams) => {
    const classes = useStyles();
    return (
        <Grid container justify="center" className={classes.displayTeam}>
            <Grid item>
                <Table >
                    <TableBody>
                        <TableRow>
                            <TableCell className={classes.displayTeamCell} padding="none">Id</TableCell>
                            <TableCell className={classes.displayTeamCell} padding="none">Abbr</TableCell>
                            <TableCell className={classes.displayTeamCell} padding="none">Name</TableCell>
                            <TableCell className={classes.displayTeamCell} padding="none">Full Name</TableCell>
                            <TableCell className={classes.displayTeamCell} padding="none">City</TableCell>
                            <TableCell className={classes.displayTeamCell} padding="none">Conference</TableCell>
                            <TableCell className={classes.displayTeamCell} padding="none">Division</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className={classes.displayTeamCell} padding="none" style={{ color: "gray" }}>{team && team.id}</TableCell>
                            <TableCell className={classes.displayTeamCell} padding="none" style={{ color: "gray" }}>{team && team.abbreviation}</TableCell>
                            <TableCell className={classes.displayTeamCell} padding="none" style={{ color: "gray" }}>{team && team.name}</TableCell>
                            <TableCell className={classes.displayTeamCell} padding="none" style={{ color: "gray" }}>{team && team.full_name}</TableCell>
                            <TableCell className={classes.displayTeamCell} padding="none" style={{ color: "gray" }}>{team && team.city}</TableCell>
                            <TableCell className={classes.displayTeamCell} padding="none" style={{ color: "gray" }}>{team && team.conference}</TableCell>
                            <TableCell className={classes.displayTeamCell} padding="none" style={{ color: "gray" }}>{team && team.division}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Grid>
        </Grid>
    );
}

export default () => {

    const classes = useStyles();
    const ref = useRef<HTMLDivElement>(null);

    window.addEventListener('resize', () => {
        if (ref.current) {
            cache.resize(ref.current);
        }
    });

    useEffect(() => {
        if (ref && ref.current && ref.current.children.length === 0) {
            cache.resize(ref.current);
            cache.render();
            ref.current.appendChild(cache.domElement);
        }
    });

    const [buttionsDisabled, setButtionsDisabled] = useState(false);
    const [result, setResult] = useState<Team | undefined>(undefined);
    return (
        <>
            <Typography className={classes.titie} align="center">Least Recently Used (LRU) cache</Typography>
            <Chip className={classes.capacity} avatar={<Avatar>{capacity}</Avatar>} label="Capacity" variant="outlined" />
            <Result team={result} />
            <Teams />
            <div ref={ref} style={{ overflow: "hidden" }} />
            <Grid className={classes.operators} container justify="center" spacing={5}>
                <Grid item>
                    {
                        buttionsDisabled ?
                            <FormControl disabled>
                                <GetSelector setButtionsDisabled={setButtionsDisabled} setResult={setResult} />
                            </FormControl> :
                            <FormControl>
                                <GetSelector setButtionsDisabled={setButtionsDisabled} setResult={setResult} />
                            </FormControl>
                    }
                </Grid>
                <Grid item>
                    {
                        buttionsDisabled ?
                            <FormControl disabled>
                                <PutSelector setButtionsDisabled={setButtionsDisabled} setResult={setResult} />
                            </FormControl> :
                            <FormControl>
                                <PutSelector setButtionsDisabled={setButtionsDisabled} setResult={setResult} />
                            </FormControl>
                    }
                </Grid>
            </Grid>
        </>
    );
};
