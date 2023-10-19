import { Typography, Container, Table, TableContainer, TableHead, TableRow, TableCell, Button } from '@mui/material';
import React, { Component } from "react";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import API from '../../api/transferAuto';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

function Unix_timestamp(t) {
    const date = new Date(t); 
    const year = date.getFullYear(); 
    const month = "0" + (date.getMonth() + 1);
    const day = "0" + date.getDate();
    const hour = "0" + date.getHours();
    const minute = "0" + date.getMinutes();
    const second = "0" + date.getSeconds();
    return year + "-" + month.substr(-2) + "-" + day.substr(-2);
}

class cancleAuto extends Component {

    constructor(props) {
        super(props);

        this.state = {
            autoNum: '',
            autoTitle: '',
            autoCompany: '',
            autoAmount: '',
            autoStart: '',
            autoEnd: ''
        }
    }

    componentDidMount() {
        this.loadautosList();
    }

    loadautosList = () => {
        const autoNum = window.localStorage.getItem("AutoNum");
        API.autoList(autoNum)
            .then(res => {
                let auto = res.data;
                this.setState({
                    autoNum: auto.autoNum,
                    autoTitle: auto.autoTitle,
                    autoCompany: auto.autoCompany,
                    autoAmount: auto.autoAmount,
                    autoStart: auto.autoStart,
                    autoEnd: auto.autoEnd
                });
            })
            .catch(err => {
                console.log('loadautoList() Error!!', err);
            });
    }

    selectAutosfer = (autoNum) => {
        window.localStorage.setItem("AutoNum", autoNum);
        this.props.history.push("/autoDetail");
    }

    changeAuto = (autoNum) => {
        window.localStorage.setItem("AutoNum", autoNum);
        this.props.history.push("/changeAuto");
    }

    cancleAuto = (autoNum) => {
        window.localStorage.setItem("AutoNum", autoNum);
        this.props.history.push("/cancleAuto");
    }

    render() {
        return (
            <Container component="main" maxWidth="md">
                <CurrencyExchangeIcon fontSize='large' color='primary' />
                <Typography variant="h4" style={style}> 자동이체 변경/해지 </Typography>
                <TableContainer>
                    <Table md={{ minWidth: 900 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" width="50">No.</TableCell>
                                <TableCell align="center" width="50">{this.state.autoNum}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center" width="50">자동이체명</TableCell>
                                <TableCell align="center" width="50">{this.state.autoTitle}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center" width="50">자동이체기업</TableCell>
                                <TableCell align="center" width="50">{this.state.autoCompany}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center" width="50">자동금액</TableCell>
                                <TableCell align="center" width="50">{this.state.autoAmount}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center" width="50">이체시작일자</TableCell>
                                <TableCell align="center" width="50">{Unix_timestamp(this.state.autoStart)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center" width="50">해지일</TableCell>
                                <TableCell align="center" width="50">{Unix_timestamp(this.state.autoEnd)}</TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
                
                <br/>
                <Button variant="contained" color="primary" onClick={this.changeAuto} align="center">해지요청</Button>
            </Container>
        );
    }
}

const style = {
    display: 'flex',
    justifyContent: 'center',
};

export default cancleAuto;
