import { Component } from "react";
import imgLogo from "../../resource/yj_check.png";

class depositCheck extends Component{
    render(){
        return(
            <div>
                <h3>석준형 예/적금 계좌관리</h3>
                <img src={imgLogo}></img>
            </div>
        );
    }
}

export default depositCheck