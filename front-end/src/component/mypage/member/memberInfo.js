import React, { Component } from "react";
import imgLogo from "../../../resource/memberInfo.png"

class memberInfo extends Component{
    render(){
        return(
            <div>
                <img src={imgLogo}></img>
            </div>
        );
    }
}
export default memberInfo;