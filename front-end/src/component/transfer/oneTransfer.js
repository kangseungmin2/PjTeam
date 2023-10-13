import { TextField, Typography, Button } from "@mui/material";
import ApiService from '../../ApiService';
import React, { Component } from "react";

class oneTransfer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            accountNum: '',
            trbank:'',
            trName: '',
            trbank: '',
            trAccountNum: '',
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
            brtrbankand: this.state.trbank,
            trName: this.state.trName,
            trbank: this.state.trbank,
            accountPW: this.state.accountPW

        }
        ApiService.onetransfer(inputData)
            .then(res => {
                console.log('onetransfer() 성공 : ', res.data);
                this.props.history.push('/samples');        // RouterComponent.js - ListSampleComponent 호출
            })
            .catch(err =>{
                console.log('onetransfer() 에러 : ', err);
            })
    }

    render(){
        return(
            <div align="center"><br/><br/>
                <Typography variant="h4"> 한건이체 </Typography>
                    <TextField
                        required
                        id="sandard-required"
                        variant="standard"
                        label="출금 계좌번호"
                        type="text"
                        name="accountNum"
                        value={this.state.accountNum}
                        placeholder="input sample accountNum"
                        onChange={this.onChange} /><br/>

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
                        label="입금하실 금액을 입력하세요"
                        type="text"
                        name="trAmount"
                        value={this.state.trAmount}
                        placeholder="input sample trAmount"
                        onChange={this.onChange} /><br/>

                      <TextField
                        required
                        id="sandard-required"
                        variant="standard"
                        label="입금계좌번호를 입력하세요"
                        type="text"
                        name="trAccountNum"
                        value={this.state.trAccountNum}
                        placeholder="input sample trAccountNum"
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

                    <Button variant="contained" color="primary" onClick={this.saveSample}>이체</Button>
                    <br/>
            </div>
        );
    }
}
export default oneTransfer;