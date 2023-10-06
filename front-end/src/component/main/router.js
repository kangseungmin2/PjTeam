import React from "react";
import {BrowserRouter,Route} from 'react-router-dom';   //npm install react-router-dom@5    react-router-dom@5 => @6은 지원안되는 메서드가 많다.
import openAccount from '../account/openAccount';
import allAccount from "../account/allAccount";
import balanceList from "../account/balanceList";
import passwordModify from "../account/passwordModify";
import deleteAccount from "../account/deleteAccount";
import adminAccount from "../mypage/admin/adminAccount";
import answer from "../mypage/admin/answer";
import management from "../mypage/admin/management";
import deleteMember from "../mypage/member/deleteMember";
import memAccount from "../mypage/member/memAccount";
import memberInfo from "../mypage/member/memberInfo";
import modifyMember from "../mypage/member/modifyMember";
import question from "../mypage/member/question";
import depositList from "../deposit/depositList";
import depositNew from "../deposit/depositNew";
import depositDelete from "../deposit/depositDelete";
import depositCheck from "../deposit/depositCheck";
import loan from "../loan/loan_productList";
import login from "../customer/login";
import join from "../customer/join";
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
                    <Route path="/adminAccount" component={adminAccount}/>       {/* 서윤-관리자-결산 */}
                    <Route path="/answer" component={answer}/>       {/* 서윤-관리자-1:1문의 */}
                    <Route path="/management" component={management}/>       {/* 서윤-관리자-회원관리 */}
                    <Route path="/deleteMember" component={deleteMember}/>       {/* 서윤-회원-회원탈퇴 */}
                    <Route path="/memAccount" component={memAccount}/>       {/* 서윤-회원-결산 */}
                    <Route path="/memberInfo" component={memberInfo}/>       {/* 서윤-회원-내정보 */}
                    <Route path="/modifyMember" component={modifyMember}/>       {/* 서윤-회원-내정보수정 */}
                    <Route path="/question" component={question}/>       {/* 서윤-회원-1:1문의 */}
                    <Route path="/loanList" component={loan}/>       {/* 상아-대출상품 */}
                    <Route path="/depositList" component={depositList}/>        {/* 석준-예/적금 조회 */}
                    <Route path="/depositNew" component={depositNew}/>        {/* 석준-예/적금 신규가입 */}
                    <Route path="/depositDelete" component={depositDelete}/>        {/* 석준-예/적금 해지 */}
                    <Route path="/depositCheck" component={depositCheck}/>        {/* 석준-예/적금 해지 */}
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