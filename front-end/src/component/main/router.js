import React from "react";
import {BrowserRouter,Route} from 'react-router-dom';   //npm install react-router-dom@5    react-router-dom@5 => @6은 지원안되는 메서드가 많다.
import main from "../main/main";

import openAccount from '../account/openAccount';
import allAccount from "../account/allAccount";
import balanceList from "../account/balanceList";
import passwordModify from "../account/passwordModify";
import deleteAccount from "../account/deleteAccount";
import adminAccount from "../mypage/admin/adminAccount";
import answerList from "../mypage/admin/answerList";
import management from "../mypage/admin/management";
import deleteMember from "../mypage/member/deleteMember";
import memAccount from "../mypage/member/memAccount";
import memberInfo from "../mypage/member/memberInfo";
import modifyMember from "../mypage/member/modifyMember";
import questionList from "../mypage/member/questionList";
import questionAdd from "../mypage/member/questionAdd";
import answer from "../mypage/admin/answer";
import question from "../mypage/member/question";
import utilityList from "../utility/utilityList";
import giroPay from "../utility/giroPay";
import localtaxPay from "../utility/localtaxPay";
import dutyPay from "../utility/dutyPay";
import pensionPay from "../utility/pensionPay";

import login from "../customer/login";
import join from "../customer/join";
import chat from "../customer/chat";

import transAccount from "../transfer/transAccount";
import oneTransfer from "../transfer/oneTransfer";
import transferList from "../transfer/transferList";
import transDetail from "../transfer/transDetail";
import multipleTransfer from "../transfer/multipleTransfer";
import changeLimit from "../transfer/changeLimit";
import autoWithdrawal from "../transfer/autoWithdrawal";
import changeAuto from "../transfer/changeAuto";
import cancleAuto from "../transfer/cancleAuto";
import alterAuto from "../transfer/alterAuto";
import autoList from "../transfer/autoList";
import autoDetail from "../transfer/autoDetail";

import FundList from "../fund/fundList";
import AccountChk from "../fund/accountChk";
import FundDetail from "../fund/fundDetail";
import FundAccount from "../fund/fundAccount";
import MyFund from "../fund/myFund";
import LastFundAccount from "../fund/lastFundAccount"
import FundTransaction from "../fund/fundTransaction"
import TransactionList from "../fund/transactionList"
import MyFundChk from "../fund/myFundChk"
import FundSettlement from "../admin/fund/fundSettlement"


import BoardList from '../admin/board/boardList';
import BoardAdd from '../admin/board/boardAdd';
import BoardEdit from '../admin/board/boardEdit';
import LoanList from '../loan/loanList';
// import LoanSign from '../loan/loanSign';
import Repayment from '../loan/repayment';
import LoanProductAdd from '../admin/loan/loanProductAdd';
import LoanProductEdit from '../admin/loan/loanProductEdit';
import LoanProductList from '../admin/loan/loanProductList';
import LoanSignConfirm from '../admin/loan/loanSignConfirm';
import LoanDetail from "../loan/loanDetail";
import LoanSignList from "../loan/loanSignList";
import BoardListMember from "../board/boardListMember";
import Checkout from "../loan/loanSign";


import depositProductList from '../admin/deposit/depositProductList';
import savingsProductList from '../admin/savings/savingsProductList';
import depositProductAdd from '../admin/deposit/depositProductAdd';
import savingsProductAdd from '../admin/savings/savingsProductAdd';
import depositProductEdit from '../admin/deposit/depositProductEdit';
import savingsProductEdit from '../admin/savings/savingsProductEdit';
import depositList from "../deposit/depositList";
import savingsList from "../savings/savingsList";
import depositDetail from "../deposit/depositDetail";
import savingsDetail from "../savings/savingsDetail";
import depositSign from "../deposit/depositSign";
import savingsSign from "../savings/savingsSign";
import depositDelete from "../deposit/depositDelete";
import depositCheck from "../deposit/depositCheck";


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
                    <Route path="/adminAccount" component={adminAccount}/>       {/* 서윤-관리자-결산 */}
                    <Route path="/answerList" component={answerList}/>       {/* 서윤-관리자-1:1문의 */}
                    <Route path="/management" component={management}/>       {/* 서윤-관리자-회원관리 */}
                    <Route path="/deleteMember" component={deleteMember}/>       {/* 서윤-회원-회원탈퇴 */}
                    <Route path="/memAccount" component={memAccount}/>       {/* 서윤-회원-결산 */}
                    <Route path="/memberInfo" component={memberInfo}/>       {/* 서윤-회원-내정보 */}
                    <Route path="/modifyMember" component={modifyMember}/>       {/* 서윤-회원-내정보수정 */}
                    <Route path="/questionList" component={questionList}/>       {/* 서윤-회원-1:1문의 */}
                    <Route path="/questionAdd" component={questionAdd}/>       {/* 서윤-회원-1:1문의 작성 */}
                    <Route path="/answer" component={answer}/>       {/* 서윤-관리자-1:1문의 작성 */}
                    <Route path="/question" component={question}/>       {/* 서윤-회원-1:1문의 작성 */}
                    <Route path="/utilityList" component={utilityList}/>       {/* 서윤-공과금-납부내역조회 */}
                    <Route path="/giroPay" component={giroPay}/>       {/* 서윤-공과금-지로,생활요금 납부 */}
                    <Route path="/localtaxPay" component={localtaxPay}/>       {/* 서윤-공과금-지방세,등록금 납부 */}
                    <Route path="/dutyPay" component={dutyPay}/>       {/* 서윤-공과금-국고,관세 납부 */}
                    <Route path="/pensionPay" component={pensionPay}/>       {/* 서윤-공과금-연금,보험료 납부 */}
                    
                    <Route path="/login" component={login}/>       {/* 승민-로그인 */}
                    <Route path="/join" component={join}/>          {/* 승민 -회원가입-로그인 */}
                    <Route path="/chat" component={chat}/>          {/* 승민 -채팅 */}

                    <Route path="/boardList" component={BoardList}/>    {/* 상아-게시판목록 */}
                    <Route path="/boardAdd" component={BoardAdd}/>       {/* 상아-게시판추가 */}
                    <Route path="/boardEdit" component={BoardEdit}/>       {/* 상아-게시판수정 */}
                    <Route path="/boardListMember" component={BoardListMember}/>       {/* 상아-게시판목록(고객) */}
                    <Route path="/loanList" component={LoanList}/>       {/* 상아-대출상품목록(고객) */}
                    <Route path="/loanDetail" component={LoanDetail}/>       {/* 상아-대출상세페이지(고객) */}
                    <Route path="/loanSign" component={Checkout}/>       {/* 상아-대출가입(고객) */}
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
                    <Route path="/depositDelete" component={depositDelete}/>        {/* 석준-예/적금 해지 */}
                    <Route path="/depositCheck" component={depositCheck}/>        {/* 석준-예/적금 해지 */}
                    
                    <Route path="/transAccount" component={transAccount}/>    {/* 정현-한건이체시 계좌선택 */}
                    <Route path="/oneTransfer" component={oneTransfer}/>    {/* 정현-한건이체 */}
                    <Route path="/multipleTransfer" component={multipleTransfer}/>    {/* 정현-다건이체 */}
                    <Route path="/transferList" component={transferList}/>    {/* 정현-이체목록 */}
                    <Route path="/transDetail" component={transDetail}/>    {/* 정현-이체상세확인 */}
                    <Route path="/changeLimit" component={changeLimit}/>    {/* 정현-이체한도변경 */}
                    <Route path="/autoWithdrawal" component={autoWithdrawal}/>    {/* 정현-자동이체 */}
                    <Route path="/changeAuto" component={changeAuto}/>    {/* 정현-자동이체변경/해지*/}
                    <Route path="/alterAuto" component={alterAuto}/>    {/* 정현-자동이체변경*/}
                    <Route path="/cancleAuto" component={cancleAuto}/>    {/* 정현-자동이체해지 */}
                    <Route path="/autoList" component={autoList}/>    {/* 정현-자동이체목록 */}
                    <Route path="/autoDetail" component={autoDetail}/>    {/* 정현-자동이체상세 */}

                    <Route path="/fundAccount" component={FundAccount}/>        {/* 종훈-펀드계좌 개설 2-2*/}
                    <Route path="/lastFundAccount" component={LastFundAccount}/>        {/* 종훈-펀드계좌 개설 2-3*/}
                    <Route path="/fundTransaction" component={FundTransaction}/>        {/* 종훈-펀드계좌 거래내역 2-1*/}
                    <Route path="/transactionList" component={TransactionList}/>        {/* 종훈-펀드계좌 거래내역 2-2*/}
                    <Route path="/fundList" component={FundList}/>        {/* 종훈-펀드 리스트 */}
                    <Route path="/accountChk" component={AccountChk}/>        {/* 종훈-펀드계좌 체크*/}
                    <Route path="/fundDetail" component={FundDetail}/>        {/* 종훈-펀드 상세페이지 */}
                    <Route path="/myFundChk" component={MyFundChk}/>        {/* 종훈-펀드 보유현황 전 계좌체크 */}
                    <Route path="/myFund" component={MyFund}/>        {/* 종훈-펀드 보유현황 */}
                    <Route path="/fundSettlement" component={FundSettlement}/>        {/* 종훈-펀드 관리자 결산 */}
                    
                </div>
            </BrowserRouter>
            
        </div>
    )
}
const style ={
    margin:'10px'

}

export default AppRouter;