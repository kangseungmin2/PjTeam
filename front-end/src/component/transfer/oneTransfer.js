import React, { Component } from "react";
import imgLogo from "../../resource/oneTransfer.png"
class oneTransfer extends Component{
    render(){
        return(
            <div>
                <h3> 정현 한건이체 </h3>
                <img src={imgLogo}></img>
            </div>
        );
    }
}

export default oneTransfer;