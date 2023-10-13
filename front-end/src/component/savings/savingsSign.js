import { Component } from "react";
import imgLogo from "../../resource/yj_new.png";

class savingsSign extends Component{
    render(){
        return(
            <div>
                <h3>석준형 예/적금 신규</h3>
                <img src={imgLogo}></img>
            </div>
        );
    }
}

export default savingsSign