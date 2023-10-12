import * as React from 'react';
import classNames from 'classnames';  // npm i classnames --save   대소문자 주의 

export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: "login",
            id: "",    // login: "" -> id: ""
            password: "",
            name: "",
            residentRegistrationNumber: "",
            address: "",
            hp: "",
            job: "",
            email: "",
            onLogin: props.onLogin, // 사용자가 자격증명을 보낸후 상위구성요소가 로그인 양식을 숨길수 있다.
            onRegister: props.onRegister
        };
    };

    // 필드의 업데이트된 값을 state에 저장
    onChangeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name]: value});
    };

    // 로그인 처리
    onSubmitLogin = (e) => {
        console.log('[onSubmitLogin]');
        this.state.onLogin(e, this.state.id, this.state.password);  // this.state.login-> this.state.id
    };

    // 등록 처리
    onSubmitRegister = (e) => {
        console.log('[onSubmitRegister]');
        this.state.onRegister(
            e,            
            this.state.id,    // this.state.login-> this.state.id 
            this.state.password,
            this.state.name,
            this.state.residentRegistrationNumber,
            this.state.address,
            this.state.hp,
            this.state.job,
            this.state.email
        );
    };

    render() {
        return (
          <div className="row justify-content-center">
            <div className="col-4">
            <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
              
              {/* Login 버튼 */}
              <li className="nav-item" role="presentation">
                <button className={classNames("nav-link", this.state.active === "login" ? "active" : "")}                  
                   id="tab-login" onClick={() => this.setState({active: "login"})}>Login</button>
              </li>

              {/* Register 버튼 */}
              <li className="nav-item" role="presentation">
                <button className={classNames("nav-link", this.state.active === "register" ? "active" : "")} 
                 id="tab-register" onClick={() => this.setState({active: "register"})}>Register</button>
              </li>
            </ul>

            <div className="tab-content">
              <div className={classNames("tab-pane", "fade", this.state.active === "login" ? "show active" : "")} 
                id="pills-login" >
                
                {/* 로그인 폼, (name="login" -> name="id"),  input type="login" -> input type="text", label : ID */}
                <form onSubmit={this.onSubmitLogin}>

                  <div className="form-outline mb-4">
                    <input type="text" id="loginName" name= "id" className="form-control" onChange={this.onChangeHandler}/>   
                    <label className="form-label" htmlFor="loginName">ID</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="loginPassword" name="password" className="form-control" onChange={this.onChangeHandler}/>
                    <label className="form-label" htmlFor="loginPassword">Password</label>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>

                </form>
              </div>
              
              {/* 등록 폼, (name="login" -> name="id")  , label : ID*/}
              <div className={classNames("tab-pane", "fade", this.state.active === "register" ? "show active" : "")} id="pills-register" >
                <form onSubmit={this.onSubmitRegister}>
                 
                  <div className="form-outline mb-4">
                    <input type="text" id="login" name="id" className="form-control" onChange={this.onChangeHandler}/>
                    <label className="form-label" htmlFor="login">ID</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="registerPassword" name="password" className="form-control" onChange={this.onChangeHandler}/>
                    <label className="form-label" htmlFor="registerPassword">Password</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="text" id="firstName" name="name" className="form-control" onChange={this.onChangeHandler}/>
                    <label className="form-label" htmlFor="firstName">name</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="text" id="number" name="residentRegistrationNumber" className="form-control" onChange={this.onChangeHandler}/>
                    <label className="form-label" htmlFor="number">주민번호</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="text" id="address" name="address" className="form-control" onChange={this.onChangeHandler}/>
                    <label className="form-label" htmlFor="address">address</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="text" id="hp" name="hp" className="form-control" onChange={this.onChangeHandler}/>
                    <label className="form-label" htmlFor="hp">hp</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="text" id="job" name="job" className="form-control" onChange={this.onChangeHandler}/>
                    <label className="form-label" htmlFor="job">직업</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="text" id="email" name="email" className="form-control" onChange={this.onChangeHandler}/>
                    <label className="form-label" htmlFor="email">이메일</label>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block mb-3">회원 가입</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        )
    }
}