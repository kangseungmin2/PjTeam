import { Component } from "react";
import imgLogo from "../../resource/main.JPG";
class main extends Component{
    render(){
        return(
            <div>
                <h3>메인화면</h3>
                <img src={imgLogo}></img>
            </div>
        );
    }
}

export default main