import React, { Component } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import ApiService from "../../ApiService";

export default class transactionList extends Component{
    constructor(props) {
        super(props);

        this.state = {
            fundTransaction :[]
        }
    }

    componentDidMount(){
        this.fundTransaction();
    }

    fundTransaction = () => {
        const faccount = window.localStorage.getItem('faccount')
        ApiService.transactionList(faccount)
            .then(res => {
                this.setState({
                    fundTransaction: res.data
                })
            })
            .catch(err => {
                console.log('fAccountList() Error!!', err);
            })
    }

    render(){

        return(
            <div align='center' >
                <TableContainer component={Paper} sx={{ minWidth: 700, maxWidth: 1200}}>
                <Typography variant="h4" style={typography}>
                    Fund Account
                </Typography>
                <Table >
                    <TableHead style={styledTableHead}>
                    <TableRow >
                        <TableCell style={styledTableCell}>펀드 거래번호</TableCell>
                        <TableCell style={styledTableCell}>거래 종목명</TableCell>
                        <TableCell style={styledTableCell}>거래날짜</TableCell>
                        <TableCell style={styledTableCell}>거래상태</TableCell>
                        <TableCell style={styledTableCell}>매수/매도가</TableCell>
                        <TableCell style={styledTableCell}>수량</TableCell>
                        <TableCell style={styledTableCell}>거래금액</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.fundTransaction.map(transaction =>(
                            <TableRow>
                                <TableCell style={styledTableCell}>{transaction.tnum}</TableCell>
                                <TableCell style={styledTableCell}>{transaction.fpName}</TableCell>
                                <TableCell style={styledTableCell}>{new Date(transaction.tdate).toLocaleDateString(
                                            'en-US', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit'
                                        })}</TableCell>
                                <TableCell style={styledTableCell}><span style={{color : transaction.tstatus === 'b' ? 'red' : 'blue'}}>{transaction.tstatus === 'b' ? '매수' : '매도'}</span></TableCell>
                                <TableCell style={styledTableCell}>{transaction.tmarketPrice}</TableCell>
                                <TableCell style={styledTableCell}>{transaction.tcnt}</TableCell>
                                <TableCell style={styledTableCell}>{transaction.tprice}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </div>
        )
    }
}
const typography = {
    textAlign : 'center',
    fontSize : '30px',
    margin : '20px',
    borderBottom: '2px solid',
    borderImage: 'linear-gradient(135deg, #0074D9, #00A8E8, #0074D9) 1'
}
const styledTableCell = {
    color: 'black',
    fontSize: '15px',
    textAlign :'center'
}

const styledTableHead = {
    backgroundColor: 'rgba(135, 206, 235, 0.2)'
}