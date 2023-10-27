import React, { Component } from 'react';
import { Button, Typography, Container, Grid, Paper, TableContainer, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import { Create, Delete } from '@mui/icons-material';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import API from '../../api/transferAuto';

class transDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            trans: [],
            message: null
        }
    }

    componentDidMount() {
        this.loadtransList();
    }

    // list 정보
    loadtransList = () => {
        API.transferDetail(window.localStorage.getItem("TranNum"))
            .then(res => {
                console.log('transferDetail() res!!', res);
                this.setState({
                    trans: res.data
                })
            })
            .catch(err => {
                console.log('loadtransList() Error!!', err);
            })
    }

    render() {

        return (
            <div>
            <Container component="main" maxWidth="md" style={containerStyle}>
                <CurrencyExchangeIcon fontSize='large' color='primary' />

                <Typography variant="h4" style={titleStyle}> 이체상세 페이지 </Typography>
                <br/><br/>
                <Grid container spacing={2} style={item}>
                    <Grid item xs={4}>
                        <Paper elevation={3}>
                            <Typography variant="h5">{this.state.trans.trName}</Typography>
                            <br/>
                            <Typography variant="">{new Date(this.state.trans.trDate).toLocaleString('ko-KR', {
                                                    year: 'numeric',
                                                    month: '2-digit',
                                                    day: '2-digit',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    })}
                            </Typography>
                            <Typography variant="body1">입금은행: {this.state.trans.trbank}</Typography>
                            <Typography variant="body1">이체금액: {this.state.trans.trAmount}원</Typography>
                            <Typography variant="body1">출금계좌: {this.state.trans.accountNum}</Typography>
                            <Typography variant="body1">입금계좌: {this.state.trans.trAccountNum}</Typography>
                            <br/>
                            <div style={btnStyle}>
                                <Button href="/transferList" variant="contained" color="primary">확인</Button>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
                <br/><br/>
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
export default transDetail;
