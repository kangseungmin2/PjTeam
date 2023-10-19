import React from "react";
import {BrowserRouter,Route} from 'react-router-dom';   //npm install react-router-dom@5    react-router-dom@5 => @6은 지원안되는 메서드가 많다.
import main from "../main/main";

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

import depositProductList from '../admin/deposit/depositProductList';
import savingsProductList from '../admin/savings/savingsProductList';
import depositProductAdd from '../admin/deposit/depositProductAdd';
import savingsProductAdd from '../admin/savings/savingsProductAdd';
import depositProductEdit from '../admin/deposit/depositProductEdit';
import savingsProductEdit from '../admin/savings/savingsProductEdit';
import depositList from "../deposit/depositList";
import savingsList from "../savings/savingsList";
import depositSign from '../deposit/depositSign';
import savingsSign from '../savings/savingsSign';
import depositDetail from "../deposit/depositDetail";
import savingsDetail from "../savings/savingsDetail";

import MapComponent from "../map/MapComponent";


import login from "../customer/login";
import join from "../customer/join";
import oneTransfer from "../transfer/oneTransfer";
import multipleTransfer from "../transfer/multipleTransfer";
import autoWithdrawal from "../transfer/autoWithdrawal";
import changeAuto from "../transfer/changeAuto";
import cancleAuto from "../transfer/cancleAuto";

import fundList from "../fund/fundList";
import accountChk from "../fund/accountChk";
import fundDetail from "../fund/fundDetail";
import fundAccount from "../fund/fundAccount";
import myFund from "../fund/myFund";

import BoardList from '../admin/board/boardList';
import BoardAdd from '../admin/board/boardAdd';
import BoardEdit from '../admin/board/boardEdit';
import LoanList from '../loan/loanList';
import LoanSign from '../loan/loanSign';
import Repayment from '../loan/repayment';
import LoanProductAdd from '../admin/loan/loanProductAdd';
import LoanProductEdit from '../admin/loan/loanProductEdit';
import LoanProductList from '../admin/loan/loanProductList';
import LoanSignConfirm from '../admin/loan/loanSignConfirm';
import LoanDetail from "../loan/loanDetail";
import LoanSignList from "../loan/loanSignList";

import chat from "../customer/chat";


const AppRouter = () => {
    
    return(
        <div>
            <BrowserRouter>
                <div style={style}>
                <Route path="/main" component={main}></Route>
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
                    

                    <Route path="/login" component={login}/>       {/* 승민-로그인 */}
                    <Route path="/join" component={join}/>          {/* 승민 -회원가입-로그인 */}
                    <Route path="/chat" component={chat}/>          {/* 승민 -채팅 */}

                    <Route path="/boardList" component={BoardList}/>    {/* 상아-게시판목록 */}
                    <Route path="/boardAdd" component={BoardAdd}/>       {/* 상아-게시판추가 */}
                    <Route path="/boardEdit" component={BoardEdit}/>       {/* 상아-게시판수정 */}
                    <Route path="/loanList" component={LoanList}/>       {/* 상아-대출상품목록(고객) */}
                    <Route path="/loanDetail" component={LoanDetail}/>       {/* 상아-대출상세페이지(고객) */}
                    <Route path="/loanSign" component={LoanSign}/>       {/* 상아-대출가입(고객) */}
                    <Route path="/loanSignList" component={LoanSignList}/>       {/* 상아-대출가입리스트(고객) */}
                    <Route path="/repayment" component={Repayment}/>       {/* 상아-이자조회/납부(고객) */}
                    <Route path="/loanProductAdd" component={LoanProductAdd}/>       {/* 상아-대출상품등록(관리자) */}
                    <Route path="/loanProductEdit" component={LoanProductEdit}/>       {/* 상아-대출상품수정(관리자) */}
                    <Route path="/loanProductList" component={LoanProductList}/>       {/* 상아-대출상품목록(관리자) */}
                    <Route path="/loanSignConfirm" component={LoanSignConfirm}/>       {/* 상아-대출가입/조회(관리자) */}
                    <Route path="/depositProductList" component={depositProductList}/>        {/* 석준-(관리자)예금 조회 */}
                    <Route path="/savingsProductList" component={savingsProductList}/>        {/* 석준-(관리자)적금 조회 */}
                    <Route path="/depositProductAdd" component={depositProductAdd}/>        {/* 석준-(관리자)예금 등록 */}
                    <Route path="/savingsProductAdd" component={savingsProductAdd}/>        {/* 석준-(관리자)적금 등록 */}
                    <Route path="/depositProductEdit" component={depositProductEdit}/>       {/* 석준-(관리자)예금 수정 */}                  
                    <Route path="/savingsProductEdit" component={savingsProductEdit}/>       {/* 석준-(관리자)적금 수정 */}
                    <Route path="/depositList" component={depositList}/>        {/* 석준-예금 조회 */}
                    <Route path="/savingsList" component={savingsList}/>        {/* 석준-적금 조회 */}                                 
                    <Route path="/depositDetail" component={depositDetail}/>        {/* 석준-예금 상세페이지조회 */}
                    <Route path="/savingsDetail" component={savingsDetail}/>        {/* 석준-적금 상세페이지조회 */}
                    <Route path="/depositSign" component={depositSign}/>        {/* 석준-예금 신규가입 */}
                    <Route path="/savingsSign" component={savingsSign}/>        {/* 석준-적금 신규가입 */}   
                    <Route path="/MapComponent" component={MapComponent}/>        {/* 석준- */}   
                    <Route path="/oneTransfer" component={oneTransfer}/>    {/* 정현-한건이체 */}
                    <Route path="/multipleTransfer" component={multipleTransfer}/>    {/* 정현-다건이체 */}
                    <Route path="/autoWithdrawal" component={autoWithdrawal}/>    {/* 정현-자동이체 */}
                    <Route path="/changeAuto" component={changeAuto}/>    {/* 정현-자동이체변경*/}
                    <Route path="/cancleAuto" component={cancleAuto}/>    {/* 정현-자동이체해지 */}

                    <Route path="/fundAccount" component={fundAccount}/>        {/* 종훈-펀드계좌 개설 */}
                    <Route path="/fundList" component={fundList}/>        {/* 종훈-펀드 리스트 */}
                    <Route path="/accountChk" component={accountChk}/>        {/* 종훈-펀드계좌 체크*/}
                    <Route path="/fundDetail" component={fundDetail}/>        {/* 종훈-펀드 상세페이지 */}
                    <Route path="/myFund" component={myFund}/>        {/* 종훈-펀드 보유현황 */}
                </div>
            </BrowserRouter>
            
        </div>
    )
}
const style ={
    margin:'10px'

}

export default AppRouter;