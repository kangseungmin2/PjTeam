import * as React from 'react';
import classNames from 'classnames';  // npm i classnames --save   대소문자 주의 

export default class login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: "login",
            id: "",    // login: "" -> id: ""
            password: "",
            onLogin: props.onLogin // 사용자가 자격증명을 보낸후 상위구성요소가 로그인 양식을 숨길수 있다.
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
            </div>
          </div>
        </div>
        )
    }
}