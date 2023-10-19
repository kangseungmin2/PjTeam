import React, { Component } from 'react';
import { Button, Typography, Container, Grid, Paper, TableContainer, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import { Create, Delete } from '@mui/icons-material';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import API from '../../api/transferAuto';

function Unix_timestamp(t) {
    const date = new Date(t);
    const year = date.getFullYear();
    const month = "0" + (date.getMonth()+1);
    const day = "0" + date.getDate();
    const hour = "0" + date.getHours();
    const minute = "0" + date.getMinutes();
    const second = "0" + date.getSeconds();
    return year + "-" + month.substr(-2) + "-" + day.substr(-2) + " " + hour.substr(-2) + ":" + minute.substr(-2) + ":" + second.substr(-2);
}

class TransDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            trans: [],
            message: null,
            page: 0,
            rPage: 5
        }
    }

    componentDidMount() {
        this.loadtransList();
    }

    // list 정보
    loadtransList = () => {
        API.transferDetail(window.localStorage.getItem("TranNum"))
            .then(res => {
                this.setState({
                    trans: res.data
                })
            })
            .catch(err => {
                console.log('loadtransList() Error!!', err);
            })
    }

    render() {
        const { page, rPage } = this.state;

        return (
            <div>
            <Container component="main" maxWidth="md" style={containerStyle}>
                <CurrencyExchangeIcon fontSize='large' color='primary' />

                <Typography variant="h4" style={titleStyle}> 이체상세 페이지 </Typography>
                <br/><br/>
                <Grid container spacing={2} style={item}>
                    {this.state.trans.slice(page * rPage, page * rPage + rPage).map((tran) => (
                        <Grid item xs={4} key={tran.transferNum}>
                            <Paper elevation={3}>
                                <Typography variant="h5">{tran.trName}</Typography>
                                <br/>
                                <Typography variant="">{Unix_timestamp(tran.trDate)}</Typography>
                                <Typography variant="body1">이체구분: {tran.transType}</Typography>
                                <Typography variant="body1">이체금액: {tran.trAmount}원</Typography>
                                <Typography variant="body1">잔액: {tran.balance}원</Typography>
                                <br/>
                                <div style={btnStyle}>
                                    <Button href="/transferList" variant="contained" color="primary">확인</Button>
                                </div>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
                <br/><br/>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={this.state.trans.length}
                    rowsPerPage={rPage}
                    page={page}
                    onPageChange={this.handleChangePage}
                    onRowsPerPageChange={this.handleChangeRowsPerPage}
                />
            </Container>
            </div>
        );
    }
}

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}

const titleStyle = {
    textAlign: 'center',
}

const btnStyle = {
    display: 'flex',
    justifyContent: 'center',
}

const item = {
    display : 'flex',
    alignItems : 'center',
    justifyContent : 'center'
}
export default TransDetail;
