import { TextField, Typography, Button } from "@mui/material";
import React, { Component } from "react";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import API from '../../api/transferAuto';

class autoWithdrawal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: '',
            accountNum: 0,
            balance: 0,
            accountLimit: 0,
            autoTitle: '',
            autoCompany: '', 
            autoAccount: 0,
            autoAmount: '',
            autoDate: '',
            accountPW: 0
        }
    }

    componentDidMount() {
        this.autoWithdrawalData();
    }

    autoWithdrawalData = () => {
        this.setState ({
            id: window.localStorage.getItem('id'),
            accountNum: window.localStorage.getItem('accountNum'),
            balance: window.localStorage.getItem('balance'),
            accountLimit: window.localStorage.getItem('accountLimit'),
            accountPW: window.localStorage.getItem('accountPW')
        })
    }


    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    autoList = (e) =>{
        e.preventDefault();

        let inputData = {
            accountNum: parseInt(this.state.accountNum),
            accountLimit: parseInt(this.state.accountLimit),
            id: this.state.id,
            accountPW: parseInt(this.state.accountPW),
            autoTitle : this.state.autoTitle,
            autoCompany : this.state.autoCompany,
            autoAccount: parseInt(this.state.autoAccount),
            autoAmount : parseInt(this.state.autoAmount),
            autoDate : this.state.autoDate,
            balance: parseInt(this.state.balance)
        }

        console.log(inputData)
        API.autoWithdrawal(inputData)
        .then(response => {
            console.log(response);
            if (response.data.success) {
                // 성공적인 응답 처리
                console.log(response);
                alert(response.data.message);
                this.props.history.push("/main");
              } else {
                // 오류 메시지 처리
                alert(response.data.message);
                window.location.reload();
              }
        });
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
                        label="아이디"
                        type="text"
                        name="id"
                        value={this.state.id}
                        placeholder="input sample id" /><br/>

                    <TextField
                        required
                        id="sandard-required"
                        variant="standard"
                        label="출금 계좌번호"
                        type="number"
                        name="accountNum"
                        value={this.state.accountNum}
                        placeholder="input sample accountNum"/><br/>

                    <TextField
                        required
                        id="sandard-required"
                        variant="standard"
                        label="출금한도"
                        type="number"
                        name="accountLimit"
                        value={this.state.accountLimit}
                        placeholder="input sample accountLimit"/><br/>

                    <TextField
                        required
                        id="sandard-required"
                        variant="standard"
                        label="계좌 잔액"
                        type="number"
                        name="balance"
                        value={this.state.balance}
                        placeholder="input sample balance"/><br/>

                    <TextField
                        required
                        id="sandard-required"
                        variant="standard"
                        label="자동이체명"
                        type="text"
                        name="autoTitle" // 컬럼명
                        value={this.state.autoTitle}
                        placeholder="input sample autoTitle"
                        onChange={this.onChange} /><br/>

                    <TextField
                        required
                        id="sandard-required"
                        variant="standard"
                        label="기업명"
                        type="text"
                        name="autoCompany"
                        value={this.state.autoCompany}
                        placeholder="input sample autoCompany"
                        onChange={this.onChange} /><br/>
                    
                    <TextField
                        required
                        id="sandard-required"
                        variant="standard"
                        label="입금 계좌번호"
                        type="number"
                        name="autoAccount"
                        value={this.state.autoAccount}
                        placeholder="input sample autoAccount"
                        onChange={this.onChange} /><br/>

                    <TextField
                        required
                        id="sandard-required"
                        variant="standard"
                        label="출금금액"
                        type="number"
                        name="autoAmount"
                        value={this.state.autoAmount}
                        placeholder="input sample autoAmount"
                        onChange={this.onChange} /><br/>

                    <TextField
                        required
                        id="sandard-required"
                        variant="standard"
                        label="출금일"
                        type="date"
                        name="autoDate"
                        value={this.state.autoDate}
                        onChange={this.onChange} /><br/>
                        
                      <TextField
                        required
                        id="sandard-required"
                        variant="standard"
                        label="비밀번호를 입력하세요"
                        type="password"
                        name="accountPW"
                        value={this.state.accountPW}
                        placeholder="input sample accountPW" /><br/><br/>

                    <Button variant="contained" color="primary" onClick={this.autoList}>자동이체</Button>
                    <br/>
            </div>
        );
    }
}
export default autoWithdrawal;