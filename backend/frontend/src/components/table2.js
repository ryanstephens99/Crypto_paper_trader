import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Link, Route, Switch } from "react-router-dom";

import { CRYPTO_COMPARE_API_KEY, CRYPTO_COMPARE_URI } from "./config";

import WSChart from './wsChart';




const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function ListingsTable() {
    const classes = useStyles();
    const [listings, setListings] = useState([]);

    var top100Assets = function () {
        axios.get(CRYPTO_COMPARE_URI + "top/mktcapfull",
            {params:
                {
                    limit: 100,
                    tsym: "USD",
                    api_key: CRYPTO_COMPARE_API_KEY
                }
            }
        ).then(data => {
            let list = data.data.Data;
            let cl = [];
            for (const index in data.data.Data) cl.push(list[index]["CoinInfo"]["Name"])
            cl.sort()
            setListings(cl)
        }).catch(
            function (err) { return console.error(err);
        });
    };

    useEffect(() => { top100Assets() }, []);

    const [open, setOpen] = useState(true);
    const onClick = (item) => {
        setOpen(false);
        setCryptoName(item)

    }
    const TableList = () =>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                        </TableCell>
                        <TableCell>Listing</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow><TableCell>
                        <Collapse in={open} >
                            <Table>
                                <TableBody>
                                    {listings.map((item) => (
                                        <TableRow key={item}>
                                            <TableCell component="th" scope="row">
                                                <Link
                                                    to={'/Coinbase/' + item}
                                                    onClick={() => (onClick(item))}
                                                >{item}</Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Collapse></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>

    const ChartSwitch = () =>
        <Switch>
            {listings.map((item) => (
                <Route
                    key={item + "route"}
                    path={"/Coinbase/" + item}
                    render={(props) => (
                        <WSChart{...props} name={item} />
                    )}
                />
            ))}
        </Switch>

    return (
        <div>
            <TableList />
            <ChartSwitch />
        </div>
    );
}

export default ListingsTable;