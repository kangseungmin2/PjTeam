import React, { Component } from "react";
import { Button, TextField , Typography, Container} from "@mui/material";
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import ApiService from "../../ApiService.js"

class passwordModify extends Component{
    constructor(props){
        super(props);

        this.state = {
            accountNum:'',
            id:'',
            accountPW:'',
            accountLimit:''
        }
    }

    componentDidMount() {
        this.loadAccount();
    }
    loadAccount = () => {
        ApiService.fetchAccountByNum(window.localStorage.getItem("accountNum"))
            .then(res => {
                let account = res.data;
                this.setState({
                    accountNum: account.accountNum,
                    id: account.id,
                    accountPW: account.accountPW,
                    accountLimit: account.accountLimit
                })
            })
            .catch(err => {
                console.log('loadAccount() Error !', err);
            });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    passwordModify = (e) => {
        e.preventDefault();
        let inputData = {
            accountNum: this.state.accountNum,
            id: this.state.id,
            accountPW: this.state.accountPW,
            accountLimit: this.state.accountLimit
        }
        ApiService.passwordModify(inputData)
            .then(res => {
                this.setState({
                })
                console.log('성공 :' , res.data);
                alert("수정 성공~"); 
                this.props.history.push("/allAccount");
            })
            .catch(err => {
                console.log('editAccount 에러!!:'+err);
            })
    }

    render(){
        return(
            <Container component="main" maxWidth="md">
                <PaidOutlinedIcon fontSize='large' color='primary' />
                <Typography variant="h4" style={style} spacing={2}>비밀번호 수정</Typography>
                <TextField
                    required
                    id="standard-required"
                    variant="standard"
                    label="accountNum"
                    type="text"
                    name="accountNum"
                    value={this.state.accountNum}
                    disabled
                    
                    
                /><br/>
                <TextField
                    required
                    id="standard-required"
                    variant="standard"
                    label="id"
                    type="text"
                    name="id"
                    value={this.state.id}
                    disabled
                /><br/>
                <TextField
                    required
                    id="standard-required"
                    variant="standard"
                    label="accountPW"
                    type="password"
                    name="accountPW"
                    value={this.state.accountPW}
                    placeholder="Input accountPW"
                    onChange={this.onChange}
                /><br/>
                <TextField
                    required
                    id="standard-required"
                    variant="standard"
                    label="accountLimit"
                    type="text"
                    name="accountLimit"
                    value={this.state.accountLimit}
                    disabled
                /><br/>
                    <Button color="primary" variant="outlined" onClick={this.passwordModify}>edit</Button>
                    <Button href="/allAccount" variant="contained" color="primary">back</Button>
            </Container>
        );
    }
   
}
const style = {
    display: 'flex',
    justifyContent: 'center'
}

export default passwordModify;