import React from "react";
import {BrowserRouter,Route} from 'react-router-dom';   //npm install react-router-dom@5    react-router-dom@5 => @6은 지원안되는 메서드가 많다.
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

import depositList from "../deposit/depositList";
import loan from "../loan/loan_productList";

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
                    <Route path="/adminAccount" component={adminAccount}/>       {/* 서윤-관리자-결산 */}
                    <Route path="/answerList" component={answerList}/>       {/* 서윤-관리자-1:1문의 */}
                    <Route path="/management" component={management}/>       {/* 서윤-관리자-회원관리 */}
                    <Route path="/deleteMember" component={deleteMember}/>       {/* 서윤-회원-회원탈퇴 */}
                    <Route path="/memAccount" component={memAccount}/>       {/* 서윤-회원-결산 */}
                    <Route path="/memberInfo" component={memberInfo}/>       {/* 서윤-회원-내정보 */}
                    <Route path="/modifyMember" component={modifyMember}/>       {/* 서윤-회원-내정보수정 */}
                    <Route path="/questionList" component={questionList}/>       {/* 서윤-회원-1:1문의 */}

                    <Route path="/loanList" component={loan}/>       {/* 상아-대출상품 */}
                    <Route path="/depositList" component={depositList}/>        {/* 석준-예/적금 조회 */}

                </div>
            </BrowserRouter>
        </div>
    )
}
const style ={
    margin:'10px'

}

export default AppRouter;