<<<<<<< HEAD
import { Component } from "react";
import LoginForm from "./loginForm.js";
import { request, setAuthToken } from "../../heplers/axios_helper.js";;

class AppContent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            componentToShow: "welcome" // componentToShow의 초기값은 welcome
        }
    }

    // login일 땐 componentToShow의 값을 login으로 줌
    login = () => {
        this.setState({componentToShow: "login"})
    }

    // login일 땐 componentToShow의 값을 welcome으로 줌
    logout = () => {
        this.setState({componentToShow: "welcome"})
    }

    onLogin = (e, id, password) => {
        e.preventDefault();
        request(
            "POST",
            "/login",
            {
                id: id,
                password: password
            })
            .then((response) => {
                this.setState({componentToShow: "messages"});
                setAuthToken(response.data.token);
                this.props.history.push('/main');
            })
            .catch((error) => {
                this.setState({componentToShow: "welcome"});
                setAuthToken(null);
            })
    }
    render() {
        return(
            <div>
                {<LoginForm onLogin={this.onLogin} onRegister={this.onRegister} />}
            </div>
        );
    }
}

export default AppContent;

=======
import React, {Component} from 'react';
import classNames from 'classnames';    // npm i classnames 대소문자 주의

class loginForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            active:"login",
            id: "",
            password: "",
            firstName: "",
            lastName: "",
            onLogin: props.onLogin,     // 사용자가 자격증명을 보낸후 상위구성요소가 로그인 양식을 숨길 수 있다.
            onRegister: props.onRegister
        };
    };

    // 필드의 업데이트 값을 state에 저장
    onChangeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name]: value});
    }
    // 로그인 처리
    onSubmitLogin = (e) => {
        this.setState.onLogin(e, this.state.id, this.state.password);
    }
    // 등록 처리
    onSubmitRegister =(e) => {
        console.log('onSubmitRegister !!!');
        this.state.onRegister(
            e,
            this.state.id,
            this.state.password,
            this.state.firstName,
            this.state.lastName
        );
    };

    render(){
        return(
            <div className='row justify-content-center'>
                <div className='col-4'>
                    <ul className='nav nav-pills nav-justified mb-3' id="ex1" role="tablist">
                        {/* 로그인 버튼 */}
                        <li className='nav-item' role="presentation">
                            <button className={classNames("nav-link", this.state.active ==="login" ? "active" : "")}
                                id="tab-login" onClick={() => this.setState({active:"login"})}>Login</button>
                        </li>
                        {/* 등록 버튼 */}
                        <li className='nav-item' role="presentation">
                            <button className={classNames("nav-link", this.state.active ==="register" ? "active" : "")}
                                id="tab-register" onClick={() => this.setState({active:"register"})}>Register</button>
                        </li>
                    </ul>
                

                    <div className="tab-content">
                        <div className={classNames("tab-pane","fade", this.state.active === "login" ? "show active" : "")}
                            id="pills-login">
                            {/* 로그인폼 */}
                            <form onSubmit={this.onSubmitLogin}>
                                <div className="form-outline mb-4">
                                    <input type="text" id="loginName" name="id" className="form-control" onChange={this.onChangeHandler} />
                                    <label className="form-label" htmlFor="loginName">ID</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="password" id="loginPassword" name="password" className="form-control" onChange={this.onChangeHandler} />
                                    <label className="form-label" htmlFor="loginPassword">Password</label>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mb-4">Sign In</button>
                            </form>
                        </div>
                    </div>

                    <div className="tab-container">
                        <div className={classNames("tab-pane","fade", this.state.active === "register" ? "show active" : "")}
                            id="pills-register">
                            {/* 등록폼 */}
                            <form onSubmit={this.onSubmitRegister}>
                                <div className="form-outline mb-4">
                                    <input type="text" id="login" name="id" className="form-control" onChange={this.onChangeHandler} />
                                    <label className="form-label" htmlFor="login">ID</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="password" id="registerPassword" name="password" className="form-control" onChange={this.onChangeHandler} />
                                    <label className="form-label" htmlFor="registerPassword">Password</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="text" id="firstName" name="firstName" className="form-control" onChange={this.onChangeHandler} />
                                    <label className="form-label" htmlFor="firstName">First Name</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="text" id="lastName" name="lastName" className="form-control" onChange={this.onChangeHandler} />
                                    <label className="form-label" htmlFor="lastName">Last Name</label>
                                </div>

                                <button type="submit" className="btn btn-primary btn-block mb-4">Sign Up</button>
                            </form>
                        </div>  
                    </div>

                </div>
            </div>
        );
    }
}
export default loginForm;
>>>>>>> refs/remotes/origin/Branch-JJH
