import React, { Component } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, TableFooter, Button } from "@mui/material";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import API from '../../api/transferAuto';

// 자동이체 변경 요소 선택 화면
export default class changeAutoButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            autos: [],
            passwords : {}
        }
    }

    // alterAutoAccount
     alterAutoAccount = (autoNum) => {
        window.localStorage.setItem("AutoNum", autoNum);
        this.props.history.push("/alterAutoAccount")
    }

    // alterAutoDate
    alterAutoDate = (autoNum) => {
        window.localStorage.setItem("AutoNum", autoNum);
        this.props.history.push("/alterAutoDate")
    }

    componentDidMount() {
        this.alterAutoAccount();
        this.alterAutoDate();
    }

    // alterAutoAccount list 정보
    alterAutoAccount = () => {
        API.autoDetail(window.localStorage.getItem("AutoNum"))
            .then(res => {
                console.log('alterAutoAccount() res!!', res);
                this.setState({
                    autos: res.data
                })
            })
            .catch(err => {
                console.log('alterAutoAccount() Error!!', err);
            })
    }

    // alterAutoDate list 정보
    alterAutoDate = () => {
        API.autoDetail(window.localStorage.getItem("AutoNum"))
            .then(res => {
                console.log('alterAutoDate() res!!', res);
                this.setState({
                    autos: res.data
                })
            })
            .catch(err => {
                console.log('alterAutoDate() Error!!', err);
            })
    }


    render() {

        return (

            <div align='center'>
                <CurrencyExchangeIcon fontSize='large' color='primary' />
                <Typography variant="h4">
                    자동이체 변경 선택
                </Typography>
                    <Table>
                        <TableRow style={style}>
                            <TableCell>
                            <div style={btnStyle}>
                                <Button href="/alterAutoAccount" variant="contained" color="primary">출금계좌 변경</Button>
                            </div>
                            </TableCell>

                            <TableCell>
                            <div style={btnStyle}>
                                <Button href="/alterAutoDate" variant="contained" color="primary">출금일 변경</Button>
                            </div>
                            </TableCell>
                        </TableRow>
                    </Table>
            </div>
        );
    }
}

const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',














    
    fontSize: '3rem',
    padding: '1rem 2rem', 
}

const btnStyle = {
    display: 'flex',
    justifyContent: 'center',
}
