import { TextField, Typography, Button } from "@mui/material";
import React, { Component } from "react";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import API from '../../api/transferAuto';

class changeLimit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            limitNum: 0,
            id: '',
            accountNum: 0,
            accountLimit: 0,
            wantLimit: 0,
            accountPW: 0
        }
    }

    componentDidMount() {
        this.changeLimitData();
    }

    changeLimitData = () => {
        this.setState ({
            id: window.localStorage.getItem("id"),
            accountNum: window.localStorage.getItem('accountNum'),
            accountLimit: window.localStorage.getItem('accountLimit'),
            accountPW: window.localStorage.getItem('accountPW')
        })
    }

    // update
    transferLimit = (limitNum) => {
        window.localStorage.setItem("LimitNum", limitNum);
        this.props.history.push("/transferLimit")
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    transferLimit = (e) =>{
        e.preventDefault();

        let inputData = {
            limitNum:  parseInt(this.state.limitNum),
            id: this.state.id,
            accountNum: parseInt(this.state.accountNum),
            accountLimit: parseInt(this.state.accountLimit),
            accountPW: parseInt(this.state.accountPW),
            wantLimit: parseInt(this.state.wantLimit)
        }

        console.log(inputData)
        API.changeLimit(inputData)
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
                <Typography variant="h4"> 한도변경 신청 </Typography>
                    <TextField
                        required
                        id="sandard-required"
                        variant="standard"
                        label="No."
                        type="text"
                        name="limitNum"
                        value={this.state.limitNum}/><br/>

                     <TextField
                        required
                        id="sandard-required"
                        variant="standard"
                        label="아이디"
                        type="text"
                        name="id"
                        value={this.state.id}/><br/>

                    <TextField
                        required
                        id="sandard-required"
                        variant="standard"
                        label="계좌번호"
                        type="number"
                        name="accountNum"
                        value={this.state.accountNum}/><br/>
                            
                    <TextField
                        required
                        id="sandard-required"
                        variant="standard"
                        label="기존한도"
                        type="number"
                        name="accountLimit"
                        value={this.state.accountLimit}/><br/>

                    <TextField
                        required
                        id="sandard-required"
                        variant="standard"
                        label="희망한도"
                        type="number"
                        name="wantLimit"
                        value={this.state.wantLimit}
                        placeholder="희망 한도액을 입력하세요."
                        onChange={this.onChange} /><br/>

                    <br/><br/>
                    <Button variant="contained" color="primary" onClick={this.transferLimit}>심사요청</Button>
                    <br/>
            </div>
        );
    }
}
export default changeLimit;