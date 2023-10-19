import * as React from 'react';
import classNames from 'classnames';  // npm i classnames --save   대소문자 주의 
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';



export default class login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      active: "login",
      id: "",    // login: "" -> id: ""
      password: "",
      onLogin: props.onLogin, // 사용자가 자격증명을 보낸후 상위구성요소가 로그인 양식을 숨길수 있다.
      onAdmin: props.onAdmin
    };
  };

  // 필드의 업데이트된 값을 state에 저장
  onChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };

  // 로그인 처리
  onSubmitLogin = (e) => {
    console.log('[onSubmitLogin]');
    this.state.onLogin(e, this.state.id, this.state.password);  // this.state.login-> this.state.id
  };

  // 로그인 처리
  onSubmitAdmin = (e) => {
    console.log('[onSubmitLogin]');
    this.state.onAdmin(e, this.state.id, this.state.password);  // this.state.login-> this.state.id
  };


  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-4">
          <div className="tab-content">
            <div className={classNames("tab-pane", "fade", this.state.active === "login" ? "show active" : "")}
              id="pills-login" >

              {/* 로그인 폼, (name="login" -> name="id"),  input type="login" -> input type="text", label : ID */}
              <form onSubmit={this.onSubmitLogin}>

                <Container component="main" maxWidth="xs">
                  <CssBaseline />
                  <Box
                    sx={{
                      marginTop: 8,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="id"
                      label="id"
                      name="id"
                      autoComplete="email"
                      autoFocus
                      onChange={this.onChangeHandler}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={this.onChangeHandler}
                    />
                  </Box>
                </Container>

                <button type="submit" className="btn btn-primary btn-block mb-4">로그인</button>
              </form>
            </div>

            <div className={classNames("tab-pane", "fade", this.state.active === "admin" ? "show active" : "")}
              id="pills-login" >
              <h3>관리자 로그인</h3>
              {/* 관리자 로그인 폼, (name="login" -> name="id"),  input type="login" -> input type="text", label : ID */}
              <form onSubmit={this.onSubmitAdmin}>

                <div className="form-outline mb-4">
                  <input type="text" id="adminName" name="id" className="form-control" onChange={this.onChangeHandler} />
                  <label className="form-label" htmlFor="adminName">ID</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" id="adminPassword" name="password" className="form-control" onChange={this.onChangeHandler} />
                  <label className="form-label" htmlFor="adminPassword">Password</label>
                </div>

                <button type="submit" className="btn btn-primary btn-block mb-4">로그인</button>
              </form>
            </div>
          </div>
          <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">

            {/* Login 버튼 */}
            <li className="nav-item" role="presentation">
              <button className={classNames("nav-link", this.state.active === "login" ? "active" : "")}
                id="tab-login" onClick={() => this.setState({ active: "login" })}>고객 로그인</button>
            </li>
          </ul>

          <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">

            {/* Login 버튼 */}
            <li className="nav-item" role="presentation">
              <button className={classNames("nav-link", this.state.active === "admin" ? "active" : "")}
                id="tab-admin" onClick={() => this.setState({ active: "admin" })}>관리자 로그인</button>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}