import React, { Component } from "react";
import aChk from "../../resource/펀드계좌조회.jpg";

export default class accountChk extends Component {
    fundDetail = () => {
        this.props.history.push("/fundDetail");
    }
    render(){
        return(
            <div>
                <h3>Account Check</h3>
                <img src={aChk} onClick={this.fundDetail}/>
            </div>
        );
    }

} 