import { TextField, Typography, Button } from "@mui/material";
import React, { Component } from "react";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import API from '../../api/transferAuto';

class AlterAuto extends Component {
    constructor(props) {
        super(props);

        this.state = {
            autoNum: '',
            autoTitle: '',
            autoAmount: '',
            autoDate: '',
            password: '', // 비밀번호 추가
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    saveSample = (e) => {
        e.preventDefault();

        // 여기서 비밀번호를 검증하고 맞지 않으면 변경을 진행하지 않음
        if (this.state.password !== '비밀번호') {
            alert('비밀번호가 올바르지 않습니다.');
            return;
        }

        let inputData = {
            autoNum: this.state.autoNum,
            autoTitle: this.state.autoTitle,
            autoAmount: this.state.autoAmount,
            autoDate: this.state.autoDate
        }

        API.alterAuto(inputData)
            .then(res => {
                console.log('alterAuto() 성공 : ', res.data);
                this.props.history.push('/samples'); // RouterComponent.js - ListSampleComponent 호출
            })
            .catch(err => {
                console.log('alterAuto() 에러 : ', err);
            })
    }

    render() {
        return (
            <div align="center"><br /><br />
                <CurrencyExchangeIcon fontSize='large' color='primary' />
                <Typography variant="h4"> 자동이체 변경 </Typography>
                <TextField
                    required
                    id="standard-required"
                    variant="standard"
                    label="번호"
                    type="text"
                    name="autoNum"
                    value={this.state.autoNum}
                    placeholder="input sample autoNum"
                    onChange={this.onChange} /><br />
                <TextField
                    required
                    id="standard-required"
                    variant="standard"
                    label="자동이체명"
                    type="text"
                    name="autoTitle"
                    value={this.state.autoTitle}
                    placeholder="input sample autoTitle"
                    onChange={this.onChange} /><br />
                <TextField
                    required
                    id="standard-required"
                    variant="standard"
                    label="자동이체금액"
                    type="text"
                    name="autoAmount"
                    value={this.state.autoAmount}
                    placeholder="input sample autoAmount"
                    onChange={this.onChange} /><br />
                <TextField
                    required
                    id="standard-required"
                    variant="standard"
                    label="자동이체출금일"
                    type="text"
                    name="autoDate"
                    value={this.state.autoDate}
                    placeholder="input sample autoDate"
                    onChange={this.onChange} /><br />
                <TextField
                    required
                    id="standard-required"
                    variant="standard"
                    label="비밀번호"
                    type="password"
                    name="password"
                    value={this.state.password}
                    placeholder="비밀번호를 입력하세요"
                    onChange={this.onChange} /><br />
                <Button variant="contained" color="primary" onClick={this.saveSample}>변경</Button>
                <br />
            </div>
        );
    }
}

export default AlterAuto;
