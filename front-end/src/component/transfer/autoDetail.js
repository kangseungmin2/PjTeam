import React, { Component } from 'react';
import { Button, Typography, Container, Grid, Paper, TableContainer, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import { Create, Delete } from '@mui/icons-material';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import API from '../../api/transferAuto';

class autoDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            autos: [],
            message: null
        }
    }

    componentDidMount() {
        this.loadautosList();
    }

    // list 정보
    loadautosList = () => {
        API.autoDetail(window.localStorage.getItem("AutoNum"))
            .then(res => {
                console.log('autoDetail() res!!', res);
                this.setState({
                    autos: res.data
                })
            })
            .catch(err => {
                console.log('autoDetail() Error!!', err);
            })
    }

    render() {

        return (
            <div>
            <Container component="main" maxWidth="md" style={containerStyle}>
                <CurrencyExchangeIcon fontSize='large' color='primary' />

                <Typography variant="h4" style={titleStyle}> 자동이체 상세 페이지 </Typography>
                <br/><br/>
                <Grid container spacing={2} style={item}>
                    <Grid item xs={4}>
                        <Paper elevation={3}>
                            <Typography variant="h5">{this.state.autos.autoTitle}</Typography>
                            <br/>
                            <Typography variant="">{new Date(this.state.autos.autoDate).toLocaleString('ko-KR', {
                                                    year: 'numeric',
                                                    month: '2-digit',
                                                    day: '2-digit',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    })}
                            </Typography>
                            <Typography variant="body1">{this.state.autos.autoCompany}</Typography>
                            <Typography variant="body1">출금금액: {this.state.autos.autoAmount}원</Typography>
                            <Typography variant="body1">출금계좌: {this.state.autos.accountNum}</Typography>
                            <Typography variant="body1">입금계좌: {this.state.autos.autoAccount}</Typography>
                            <Typography variant="body1">자동이체 시작일: {new Date(this.state.autos.autoStart).toLocaleString('ko-KR', {
                                                    year: 'numeric',
                                                    month: '2-digit',
                                                    day: '2-digit'
                                                    })}</Typography>
                            <br/>
                            <div style={btnStyle}>
                                <Button href="/autoList" variant="contained" color="primary">확인</Button>
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
export default autoDetail;
