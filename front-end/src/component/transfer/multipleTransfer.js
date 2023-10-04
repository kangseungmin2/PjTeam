import React, { Component } from "react";
import imgLogo from "../../resource/multipleTransfer.png"
class multipleTransfer extends Component{
    render(){
        return(
            <div>
                <h3> 정현 다건이체 </h3>
                <img src={imgLogo}></img>
            </div>
        );
    }
}

export default multipleTransfer;