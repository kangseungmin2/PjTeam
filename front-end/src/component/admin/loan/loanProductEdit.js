import React, { Component } from "react";
import imgLogo from "../../../resource/loanProductEdit.png";
class LoanProductEdit extends Component{
    render(){
        return(
            <div>
                <h3>아상 대출상품 등록(관리자)</h3>
                <img src={imgLogo}></img>
            </div>
        );
    }
}
export default LoanProductEdit;