import React from "react";
import {BrowserRouter,Route} from 'react-router-dom';   //npm install react-router-dom@5    react-router-dom@5 => @6은 지원안되는 메서드가 많다.
import openAccount from '../account/openAccount';
import allAccount from "../account/allAccount";
import depositList from "../deposit/depositList";
import loan from "../loan/loan_productList";


import fundList from "../fund/fundList";
import accountChk from "../fund/accountChk";
import fundDetail from "../fund/fundDetail";
import fundAccount from "../fund/fundAccount";
import myFund from "../fund/myFund";
 
const AppRouter = () => { 
    return(
        <div>
            <BrowserRouter>
                <div style={style}>
                    <Route path="/openAccount" component={openAccount}/>    {/* 서윤-계좌개설 */}
                    <Route path="/allAccount" component={allAccount}/>       {/* 서윤-전체계좌조회 */}
                    <Route path="/loanList" component={loan}/>       {/* 상아-대출상품 */}
                    <Route path="/depositList" component={depositList}/>        {/* 석준-예/적금 조회 */}
                   
                   
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