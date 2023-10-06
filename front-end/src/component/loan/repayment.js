import React, { Component } from "react";
import imgLogo from "../../resource/repayment.png";
class Repayment extends Component{
    render(){
        return(
            <div>
                <h3>아상 이자조회/납부</h3>
                <img src={imgLogo}></img>
            </div>
        );
    }
}
export default Repayment;