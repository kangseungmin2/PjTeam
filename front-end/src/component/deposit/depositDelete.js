import { Component } from "react";
import imgLogo from "../../resource/yj_delete.png";

class depositDelete extends Component{
    render(){
        return(
            <div>
                <h3>석준형 예/적금 해지</h3>
                <img src={imgLogo}></img>
            </div>
        );
    }
}

export default depositDelete