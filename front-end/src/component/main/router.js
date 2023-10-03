import React from "react";
import {BrowserRouter,Route} from 'react-router-dom';   //npm install react-router-dom@5    react-router-dom@5 => @6은 지원안되는 메서드가 많다.
import openAccount from '../account/openAccount';
import allAccount from "../account/allAccount";
import depositList from "../deposit/depositList";
import loan from "../loan/loan_productList";

const AppRouter = () => {
    return(
        <div>
            <BrowserRouter>
                <div style={style}>
                    <Route path="/openAccount" component={openAccount}/>    {/* 서윤-계좌개설 */}
                    <Route path="/allAccount" component={allAccount}/>       {/* 서윤-전체계좌조회 */}
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