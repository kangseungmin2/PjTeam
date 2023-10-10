import React, { Component } from "react";
import imgLogo from "../../../resource/loanSignConfirm.png";
class LoanSignConfirm extends Component{
    render(){
        return(
            <div>
                <h3>아상 대출신청 승인/반려(관리자)</h3>
                <img src={imgLogo}></img>
            </div>
        );
    }
}
export default LoanSignConfirm;