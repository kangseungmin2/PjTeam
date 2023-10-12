import React, { Component } from "react";

import {Table,TableHead,TableBody,TableRow,TableCell, Typography, Container} from '@mui/material';
import {Create,Delete} from "@mui/icons-material";
import ApiService from "../../ApiService.js";
import EAccount from "./eAccount.js";
import YAccount from "./yAccount.js";
function Unix_timestamp(t){
    const date = new Date(t); //date객체는 UTC로부터 지난시간을 밀리초로 나타내는 UNIX 타임스탬프를 담는다.(밀리초를 초로 변환하려면 *1000)
  	//console.log(date) //2023-02-28T05:36:35.000Z 출력됨
   const year = date.getFullYear(); //년도 구하기
    const month = "0" + (date.getMonth()+1);
    const day = "0" + date.getDate();
    const hour = "0" + date.getHours();
    const minute = "0" + date.getMinutes();
    const second = "0" + date.getSeconds();
    return year + "-" + month.substr(-2) + "-" + day.substr(-2) + " " + hour.substr(-2) + ":" + minute.substr(-2) + ":" + second.substr(-2);
}

function name(t){
    if(t === "e"){
        return "입출금";
    }
    else if (t === "y") {
        return "예금";
    }
    else if (t === "j") {
        return "적금";
    }
    else if (t === "d") {
        return "대출";
    }
    else {
        return "펀드";
    }
}

function state(t){
    if(t === "j"){
        return "정상";
    }
    else if (t ==="h") {
        return "휴면";
    }
    else if (t ==="s") {
        return "해지";
    }
    else {
        return "정지";
    }   
    
}
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

//update
passwordModify = (accountNum) =>{
    window.localStorage.setItem("accountNum",accountNum);
    this.props.history.push('/passwordModify');
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
            <Container maxWidth="md">
                <Typography variant="h4" style={style}> 전체계좌조회 </Typography>
                {<EAccount />} <br/><br/>             
                {<YAccount />} <br/><br/>  
            </Container>
        );
    }
    
}
const style ={
    display: 'flex',
    justifyContent: 'center'
}
export default allAccount;