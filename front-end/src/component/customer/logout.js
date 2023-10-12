import React , { Component } from "react";

export function logout(){
    localStorage.removeItem("id");
    this.props.history.push('/main');
}
