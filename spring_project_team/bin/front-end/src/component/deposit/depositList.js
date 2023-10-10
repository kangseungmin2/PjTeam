import { Component } from "react";
import imgLogo from "../../resource/openAccount.png";

class depositList extends Component{
    render(){
        return(
            <div>
                <h3>석준형 예/적금 조회</h3>
                <img src={imgLogo}></img>
            </div>
        );
    }
}

export default depositList