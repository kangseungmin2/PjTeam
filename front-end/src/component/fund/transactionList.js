import React, { Component } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography,TablePagination, TableFooter, TableContainer, Paper } from "@mui/material";
import ApiService from "../../ApiService";

export default class transactionList extends Component{
    constructor(props) {
        super(props);

        this.state = {
            fundTransaction :[],
            page: 0,
            rPage: 10
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

    // page
    handleChangePage = (event,newpage) => { 
    this.setState({ page: newpage });
    } 
   
    // rowPage
    handleChangeRowsPerPage = (event) => { 
        this.setState({ rPage: parseInt(event.target.value, 10) });
        this.setState({ page: 0 }); // 페이지를 첫 페이지로 리셋
    } 

    render(){
        const { page } = this.state;
        const { rPage } = this.state;
        return(
            <div align='center' >
                <TableContainer component={Paper} sx={{ minWidth: 700, maxWidth: 1200}}>
                <Typography variant="h4" style={typography}>
                    펀드 거래내역
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
                    {this.state.fundTransaction.slice(page * rPage, page * 
                            rPage + rPage).map((transaction) => (
                            <TableRow>
                                <TableCell style={styledTableCell}>{transaction.trNum}</TableCell>
                                <TableCell style={styledTableCell}>{transaction.fpName}</TableCell>
                                <TableCell style={styledTableCell}>{new Date(transaction.trDate).toLocaleDateString(
                                            'en-US', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit'
                                        })}</TableCell>
                                <TableCell style={styledTableCell}><span style={{color : transaction.trStatus === 'b' ? 'red' : 'blue'}}>{transaction.trStatus === 'b' ? '매수' : '매도'}</span></TableCell>
                                <TableCell style={styledTableCell}>{transaction.trMarketPrice}</TableCell>
                                <TableCell style={styledTableCell}>{transaction.trCnt}</TableCell>
                                <TableCell style={styledTableCell}>{transaction.trPrice}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableCell colSpan={7}>
                            <TablePagination
                                rowsPerPageOptions={[10, 20, 30]}
                                component="div"
                                count={this.state.fundTransaction.length}
                                rowsPerPage={rPage}
                                page={page}
                                onPageChange={this.handleChangePage}
                                onRowsPerPageChange={this.handleChangeRowsPerPage}
                            /> 
                        </TableCell>
                    </TableFooter>
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