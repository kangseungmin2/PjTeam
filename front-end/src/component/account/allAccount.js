import React, { Component } from "react";
import ApiService from '../../ApiService';
import { TextField,  Button, Stack, Grid,  InputAdornment, Input, FormHelperText, FormControl } from "@mui/material";
import {Table,TableHead,TableBody,TableRow,TableCell, Typography, Container} from '@mui/material';
import {Create,Delete} from "@mui/icons-material";
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import imgLogo from "../../resource/accountList.png"

class allAccount extends Component{

constructor(props){
    super(props);
    this.state = {
        accounts :[],
        message: null
        // page: 0,
        // rPage:5
    }
}
componentDidMount(){
    this.accountList();
}

accountList = () => {
    ApiService.accountList()
    .then(res =>{
        console.log('data',res.data);
        this.setState({
            accounts : res.data,
        })
         
    })
    .catch(err => {
        console.log('accountList Errror',err)
    });
}



// delete
deleteAccount = (accountNum) =>{
    ApiService.deleteAccount(accountNum)
    .then(res =>{
        this.setState({
            accounts:this.state.accounts.filter(account=> account.accountNum !== accountNum)         
        });
        window.location.reload();
        console.log('delete 성공 : ', res.data);
        alert("delete 성공~"); 
    })
    .catch(err=>{
        console.log('deleteAccount() Error! :',err);
    })
}

    // // page
    // handleChangePage = (event,newpage) => { 
    //     this.setState({ page: newpage });
    // } 
   
    // // rowPage
    // handleChangeRowsPerPage = (event) => { 
    //     this.setState({ rPage: parseInt(event.target.value, 10) });
    //     this.setState({ page: 0 }); // 페이지를 첫 페이지로 리셋
    // }
    render(){
        return(
            <div>
                
            </div>
        );
    }
}
const style = {
    display: 'flex',
    justifyContent: 'center'
}

export default allAccount;
