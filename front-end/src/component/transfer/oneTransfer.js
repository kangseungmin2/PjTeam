import { TextField, Typography, Button } from "@mui/material";
import React, { Component } from "react";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import API from '../../api/transferAuto';

class oneTransfer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: '',
            accountNum: 0,
            balance: 0,
            accountLimit: 0,
            trbank:'',
            trName: '',
            trAccountNum: 0,
            trAmount: 0,
            accountPW: 0
        }
    }

    componentDidMount() {
        this.oneTransferData();
    }

    oneTransferData = () => {
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

    transferList = (e) =>{
        e.preventDefault();

        let inputData = {
            accountNum: parseInt(this.state.accountNum),
            accountLimit: parseInt(this.state.accountLimit),
            id: this.state.id,
            accountPW: parseInt(this.state.accountPW),
            trbank: this.state.trbank,
            trName: this.state.trName,
            trAccountNum: parseInt(this.state.trAccountNum),
            trAmount: parseInt(this.state.trAmount)
        }

        console.log(inputData)
        API.oneTransfer(inputData)
            .then(res => {
                console.log('onetransfer() 성공 : ', res.data);
                this.props.history.push('/oneTransfer');        // RouterComponent.js - ListSampleComponent 호출
            })
            .catch(err =>{
                console.log('onetransfer() 에러 : ', err);
            })
    }

    render(){
        return(
            <div align="center"><br/><br/>
            <CurrencyExchangeIcon fontSize='large' color='primary' />
                <Typography variant="h4"> 한건이체 </Typography>
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
                        label="입금은행"
                        type="text"
                        name="trbank" // 컬럼명
                        value={this.state.trbank}
                        placeholder="input sample trbank"
                        onChange={this.onChange} /><br/>

                    <TextField
                        required
                        id="sandard-required"
                        variant="standard"
                        label="수취인명"
                        type="text"
                        name="trName"
                        value={this.state.trName}
                        placeholder="input sample trName"
                        onChange={this.onChange} /><br/>
                    
                    
                    <TextField
                        required
                        id="sandard-required"
                        variant="standard"
                        label="입금 계좌번호"
                        type="number"
                        name="trAccountNum"
                        value={this.state.trAccountNum}
                        placeholder="input sample trAccountNum"
                        onChange={this.onChange} /><br/>

                    <TextField
                        required
                        id="sandard-required"
                        variant="standard"
                        label="입금하실 금액을 입력하세요"
                        type="number"
                        name="trAmount"
                        value={this.state.trAmount}
                        placeholder="input sample trAmount"
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

                    <Button variant="contained" color="primary" onClick={this.transferList}>이체</Button>
                    <br/>
            </div>
        );
    }
}
export default oneTransfer;