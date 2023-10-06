import React, { Component } from "react";
import imgLogo from "../../../resource/loanList.png";
class LoanProductList extends Component{
    render(){
        return(
            <div>
                <h3>아상 대출상품(관리자)</h3>
                <img src={imgLogo}></img>
            </div>
        );
    }
}
export default LoanProductList;