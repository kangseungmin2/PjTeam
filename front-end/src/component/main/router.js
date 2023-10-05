import React from "react";
import {BrowserRouter,Route} from 'react-router-dom';   //npm install react-router-dom@5    react-router-dom@5 => @6은 지원안되는 메서드가 많다.
import openAccount from '../account/openAccount';
import allAccount from "../account/allAccount";
import depositList from "../deposit/depositList";
import loan from "../loan/loan_productList";
import login from "../customer/login";
import join from "../customer/join";
import balanceList from "../account/balanceList";
import passwordModify from "../account/passwordModify";
import deleteAccount from "../account/deleteAccount";
import oneTransfer from "../transfer/oneTransfer";
import multipleTransfer from "../transfer/multipleTransfer";
import autoWithdrawal from "../transfer/autoWithdrawal";
import changeAuto from "../transfer/changeAuto";
import cancleAuto from "../transfer/cancleAuto";

const AppRouter = () => {
    
    return(
        <div>
            <BrowserRouter>
                <div style={style}>
                <Route path="/openAccount" component={openAccount}/>    {/* 서윤-계좌개설 */}
                    <Route path="/allAccount" component={allAccount}/>       {/* 서윤-전체계좌조회 */}
                    <Route path="/balanceList" component={balanceList}/>       {/* 서윤-잔액조회 */}
                    <Route path="/passwordModify" component={passwordModify}/>       {/* 서윤-비밀번호 변경 */}
                    <Route path="/deleteAccount" component={deleteAccount}/>       {/* 서윤-계좌해지 */}
                    <Route path="/login" component={login}/>       {/* 승민-로그인 */}
                    <Route path="/join" component={join}/>          {/* 회원가입-로그인 */}
                    <Route path="/loanList" component={loan}/>       {/* 상아-대출상품 */}
                    <Route path="/depositList" component={depositList}/>        {/* 석준-예/적금 조회 */}
                    <Route path="/oneTransfer" component={oneTransfer}/>    {/* 정현-한건이체 */}
                    <Route path="/multipleTransfer" component={multipleTransfer}/>    {/* 정현-다건이체 */}
                    <Route path="/autoWithdrawal" component={autoWithdrawal}/>    {/* 정현-자동이체 */}
                    <Route path="/changeAuto" component={changeAuto}/>    {/* 정현-자동이체변경*/}
                    <Route path="/cancleAuto" component={cancleAuto}/>    {/* 정현-자동이체해지 */}
                </div>
            </BrowserRouter>
            
        </div>
    )
}
const style ={
    margin:'10px'

}

export default AppRouter;