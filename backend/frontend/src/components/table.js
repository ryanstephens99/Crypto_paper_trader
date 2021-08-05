import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {Line} from 'react-chartjs-2';
import {makeStyles} from '@material-ui/core/styles';
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

import CoinBaseProData from '../apis/coinbaseAPI';
import CoinbasePro from 'coinbase-pro';

const publicClient = new CoinbasePro.PublicClient();

function DynamicChart(props){
    const [chartData, setChartData] = useState({});
    const Chart = () => {
        let dates = [];
        let prices = [];
        // fetch("api/market")
        // .then(response => {
        //     return response.json();
        // })
        // .then(data =>{
        for(const obj of props.data){
            let price = obj.price
            // let price = parseFloat(obj.price)
            let date = obj.date;
            // let date = new Date(obj.timestamp);
            // date = date.toLocaleString()
            prices.unshift(price);
            dates.unshift(date);
        }
        setChartData({
            labels: dates,
            datasets: [{
                label: 'price',
                data: prices,
            }]
        });
        // })
        // .catch(err =>{
        //     console.log(err)
        // })
    }
    useEffect(() => {
        Chart();
    }, [props]);
    return (
        <div className="table">
            <h1>{props.name} Prices</h1>
            <Line
                data={chartData}
                options={{
                    responsive: true,
                    title: { text: "we hoping out here", display: true },
                    scales: {
                        yAxes: {
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    }
                }}
            />
        </div>
    )
}

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function ListingsTable(){
    const [listings, setListings] = useState([]);
    const getLists = () =>{
        publicClient.getProducts()
        .then(list =>{
            let pl = [];
            for(const index in list){
                if(list[index]['quote_currency'] == 'USD'){
                    // console.log(list[index])
                    pl.push(list[index]['base_currency']);
                }
            }
            pl.sort()
            setListings(pl)
        })

    }
    useEffect(() => {getLists()}, []);
    const classes = useStyles();
    var [coinbase, setCoinbase] = useState();

    const data = (name) => {
        CoinBaseProData(name)
        .then(dat =>{
            setCoinbase(dat)
        })
    }
    const [cryptoName, setCryptoName] = useState('BTC')
    useEffect(() => { data(cryptoName) }, [cryptoName]);


    const [open, setOpen] = React.useState(true);
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
                        <Collapse in={open} unmountOnExit>
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
                        <DynamicChart{...props} data={coinbase} name={item}/>
                    )}
                />
            ))}
        </Switch>

    return(
        <div>
            <TableList/>
            <ChartSwitch/>
        </div>
    );
}

export { DynamicChart, ListingsTable};