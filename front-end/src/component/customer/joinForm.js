import * as React from 'react';
import { useState } from 'react';
import classNames from 'classnames';  // npm i classnames --save   대소문자 주의 
import Modal from 'react-modal';
import PhoneVerification from './hp';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';


const defaultTheme = createTheme();

export default class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      active: "login",
      id: "",    // login: "" -> id: ""
      password: "",
      passwordconfirm: "",
      name: "",
      residentRegistrationNumber: "",
      address: "",
      hp: "",
      job: "",
      email: "",
      error: "",
      onLogin: props.onLogin, // 사용자가 자격증명을 보낸후 상위구성요소가 로그인 양식을 숨길수 있다.
      onRegister: props.onRegister,
      modalIsOpen: false
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
    this.setState({ error: "로그인에 실패했습니다. 다시 시도해 주세요." });
  };

  // 등록 처리
  onSubmitRegister = (e) => {
    e.preventDefault();
    console.log('[onSubmitRegister]');
    if (this.state.password !== this.state.passwordconfirm) {
      alert("비밀번호가 일치하지 않습니다.")
    }
    else {
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
    }
  };


  setModalIsOpen = (True) => {
    if (this.state.modalIsOpen == false) {
      this.setState({
        modalIsOpen: true
      })
    }
    else {
      this.setState({
        modalIsOpen: false
      })
    }
  }
  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-4">
          <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">

            {/* Login 버튼 */}
            <li className="nav-item" role="presentation">
              <button className={classNames("nav-link", this.state.active === "login" ? "active" : "")}
                id="tab-login" onClick={() => this.setState({ active: "login" })}>Login</button>
            </li>

            {/* Register 버튼 */}
            <li className="nav-item" role="presentation">
              <button className={classNames("nav-link", this.state.active === "register" ? "active" : "")}
                id="tab-register" onClick={() => this.setState({ active: "register" })}>Register</button>
            </li>
          </ul>

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
                      label="password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={this.onChangeHandler}
                    />
                  </Box>
                </Container>
                {this.state.error && <div className="error-message">{this.state.error}</div>}
                <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>
              </form>
            </div>

            {/* 등록 폼, (name="login" -> name="id")  , label : ID*/}
            <div className={classNames("tab-pane", "fade", this.state.active === "register" ? "show active" : "")} id="pills-register" >
              <form>
                <ThemeProvider theme={defaultTheme}>
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
                      <Typography component="h1" variant="h5">
                        Sign up
                      </Typography>
                      <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} >
                            <TextField
                              fullWidth
                              autoComplete="given-name"
                              name="id"
                              required
                              id="id"
                              label="id"
                              autoFocus
                              onChange={this.onChangeHandler}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              name="password"
                              label="Password"
                              type="password"
                              id="password"
                              autoComplete="new-password"
                              onChange={this.onChangeHandler}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              name="passwordconfirm"
                              label="비밀번호 확인"
                              type="password"
                              id="passwordconfirm"
                              autoComplete="passwordconfirm"
                              onChange={this.onChangeHandler}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              name="name"
                              label="name"
                              id="name"
                              autoComplete="name"
                              onChange={this.onChangeHandler}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              id="email"
                              label="Email Address"
                              name="email"
                              autoComplete="email"
                              onChange={this.onChangeHandler}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              name="residentRegistrationNumber"
                              label="주민번호"
                              id="residentRegistrationNumber"
                              autoComplete="residentRegistrationNumber"
                              onChange={this.onChangeHandler}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              name="address"
                              label="address"
                              id="address"
                              autoComplete="address"
                              onChange={this.onChangeHandler}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              name="hp"
                              label="hp"
                              id="hp"
                              autoComplete="hp"
                              onChange={this.onChangeHandler}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              name="job"
                              label="job"
                              id="job"
                              autoComplete="job"
                              onChange={this.onChangeHandler}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  </Container>
                </ThemeProvider>
                <br /><br />
                <button type="button" className="btn btn-primary btn-block mb-3" onClick={(e) => this.onSubmitRegister(e)} >회원 가입</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}