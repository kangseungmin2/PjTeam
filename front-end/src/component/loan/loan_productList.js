import React, { Component } from "react";
import imgLogo from "../../resource/loanList.png";
class loan extends Component{
    render(){
        return(
            <div>
                <h3>아상 대출상품</h3>
                <img src={imgLogo}></img>
            </div>
        );
    }
}
export default loan;