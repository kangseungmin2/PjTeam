import React, { Component } from "react";
import imgLogo from "../../resource/loanSign.png";
class LoanSign extends Component{
    render(){
        return(
            <div>
                <h3>아상 대출가입/조회</h3>
                <img src={imgLogo}></img>
            </div>
        );
    }
}
export default LoanSign;