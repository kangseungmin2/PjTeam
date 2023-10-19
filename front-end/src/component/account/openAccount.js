import React, { Component } from "react";
import { Button, TextField , Typography, label} from "@mui/material";
import ApiService from "../../ApiService.js"
import Checkbox from '@mui/material/Checkbox';

class openAccount extends Component{
    constructor(props){
        super(props);

        this.state ={
            accountNum:'',
            id:'',
            accountPW:'',
            accountLimit:''
        }
    }
    componentDidMount() {
        this.setState({
            id : window.localStorage.getItem("id")
        });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    saveAccount = (e) => {
        e.preventDefault();
        let inputData = {
            accountNum: this.state.accountNum,
            id: this.state.id,
            accountPW: this.state.accountPW,
            accountLimit: this.state.accountLimit
        }
        ApiService.accountOpen(inputData)
            .then(res => {
                console.log('성공 :' , res.data);
                alert("계좌개설 성공~"); 
                this.props.history.push("/main");
            })
            .catch(err => {
                console.log('에러!!:'+err);
            })
    }
    render(){
        const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
        return(
            <div>
                <Typography variant="h4">계좌 개설</Typography>
                <TextField
                    required
                    id="standard-required"
                    variant="standard"
                    label="id"
                    type="text"
                    name="id"
                    disabled
                    value={this.state.id}
                    placeholder="Input id"
                    onChange={this.onChange}
                /><br/>
                <TextField
                    required
                    id="standard-required"
                    variant="standard"
                    label="accountPW"
                    type="text"
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
                    placeholder="Input accountLimit"
                    onChange={this.onChange}
                /><br/>
                <div>
                    <Button variant="contained" color="primary" onClick={this.saveAccount}>계좌 개설</Button>
                </div>
                <br/>

            </div>
            
        );
    }
   
}

export default openAccount;