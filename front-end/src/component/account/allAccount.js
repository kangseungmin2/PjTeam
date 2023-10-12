import React, { Component } from "react";

import {Table,TableHead,TableBody,TableRow,TableCell, Typography} from '@mui/material';
import {Create,Delete} from "@mui/icons-material";
import ApiService from "../../ApiService.js";

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
}

function state(t){
    if(t === "j"){
        return "정상";
    }
}
class allAccount extends Component{

constructor(props){
    super(props);
    this.state = {
        accounts :[],
        message: null
    }
}
componentDidMount(){
    this.accountList();
}

accountList = () => {
    ApiService.accountList()
    .then(res =>{
        console.log('data',res.data)
        this.setState({
            accounts : res.data,
        })
         
    })
    .catch(err => {
        console.log('accountList Errror',err)
    });
}

// update
// editSample = (accountid) =>{
//     window.localStorage.setItem("accountid",accountid);
//     this.props.history.push('/allAccount');
// }
// // delete
// deleteSample = (accountid) =>{
//     ApiService.deleteSample(accountid)
//     .then(res =>{
//         this.setState({
//             account:this.state.account.filter(account=> account.accountid !== accountid)
//         })
//     })
//     .catch(err=>{
//         console.log('deleteSample:',err)
//     })
// }


    render(){
        return(
            <div>
                <Typography variant="h4" style={style}> 전체계좌조회 </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>예금명</TableCell>
                            <TableCell>계좌번호</TableCell>
                            <TableCell>계좌생성일</TableCell>
                            <TableCell>잔액</TableCell>
                            <TableCell>계좌상태</TableCell>
                            {/* <TableCell>계좌수정</TableCell>
                            <TableCell>계좌해지</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                            {this.state.accounts.map(account =>
                            <TableRow key={account.accountid}>
                                <TableCell component="th" scope="account">{name(account.accountType)}</TableCell>
                                <TableCell>{account.accountNum}</TableCell>
                                <TableCell>{Unix_timestamp(account.madeDate)}</TableCell>
                                <TableCell>{account.balance}</TableCell>
                                <TableCell>{state(account.accountState)}</TableCell>
                                {/* <TableCell onClick={()=>this.editSample(account.accountid)}>
                                    <Create />
                                </TableCell>
                                <TableCell onClick={()=>this.deleteSample(account.accountid)}>
                                    <Delete />
                                </TableCell> */}
                            </TableRow>
                            )}
                    </TableBody>
                </Table>                  

            </div>
        );
    }
    
}
const style={
    display: 'flex',
    justifyContent: 'center'
}
export default allAccount;