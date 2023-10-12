import React, { Component } from "react";
import imgLogo from "../../resource/openAccount.png"
class openAccount extends Component{
    render(){
        return(
            <div>
                <h3>서윤 계좌개설</h3>
                <img src={imgLogo}></img>
            </div>
        );
    }
}

export default openAccount;