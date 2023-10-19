import { TextField, Typography, Button } from "@mui/material";
import ApiService from '../../ApiService';
import React, { Component } from "react";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

class oneTransfer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            accountNum: '',
            autoTitle: '',
            autoCompany: '', 
            autoAmount: '',
            autoDate: '',
            accountPW: ''
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.accountNum] : e.target.value
        });
    }

    saveSample = (e) =>{
        e.preventDefault();

        let inputData = {
          accountNum: this.state.accountNum,
          autoTitle: this.state.autoTitle,
          autoCompany: this.state.autoCompany,
          autoAmount: this.state.autoAmount,
          autoDate: this.state.autoDate,
          accountPW: this.state.accountPW
        }
        ApiService.autowithdrawal(inputData)
            .then(res => {
                console.log('autowithdrawal() 성공 : ', res.data);
                this.props.history.push('/samples');       
            })
            .catch(err =>{
                console.log('autowithdrawal() 에러 : ', err);
            })
    }

    render(){
        return(
            <div align="center"><br/><br/>
             <CurrencyExchangeIcon fontSize='large' color='primary' />
                <Typography variant="h4"> 자동이체 </Typography>
                  <TextField
                        required
                        id="sandard-required"
                        variant="standard"
                        label="입금명"
                        type="text"
                        name="autoTitle"
                        value={this.state.autoTitle}
                        placeholder="input sample autoTitle"
                        onChange={this.onChange} /><br/>

                    <TextField
                        required
                        id="sandard-required"
                        variant="standard"
                        label="입금처"
                        type="text"
                        name="autoCompany"
                        value={this.state.autoCompany}
                        placeholder="input sample autoCompany"
                        onChange={this.onChange} /><br/>

                    <TextField
                        required
                        id="sandard-required"
                        variant="standard"
                        label="출금계좌번호"
                        type="text"
                        name="accountNum"
                        value={this.state.accountNum}
                        placeholder="input sample accountNum"
                        onChange={this.onChange} /><br/>

                      <TextField
                        required
                        id="sandard-required"
                        variant="standard"
                        label="출금금액"
                        type="text"
                        name="autoAmount"
                        value={this.state.autoAmount}
                        placeholder="input sample autoAmount"
                        onChange={this.onChange} /><br/>

                    <TextField
                        required
                        id="sandard-required"
                        variant="standard"
                        label="결제일"
                        type="text"
                        name="autoDate"
                        value={this.state.autoDate}
                        placeholder="input sample autoDate"
                        onChange={this.onChange} /><br/>

                      <TextField
                        required
                        id="sandard-required"
                        variant="standard"
                        label="비밀번호를 입력하세요"
                        type="text"
                        name="accountPW"
                        value={this.state.accountPW}
                        placeholder="input sample accountPW"
                        onChange={this.onChange} /><br/><br/>

                    <Button variant="contained" color="primary" onClick={this.saveSample}>이체신청</Button>
                    <br/>
            </div>
        );
    }
}
export default oneTransfer;