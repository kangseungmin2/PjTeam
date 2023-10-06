import React,{Component} from "react";
import fAccount from "../../resource/펀드계좌임시.jpg";

export default class fundAccount extends Component {
    render(){
        return(
            <div>
                <h3>Fund Account</h3> 
                <img src={fAccount}/>
            </div> 
        );
    }
}