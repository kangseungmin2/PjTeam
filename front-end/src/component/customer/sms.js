import React, { Component } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import { Typography } from '@mui/material';
import Container from '@mui/material/Container';

const SMS_API_BASE_URL = "http://15.165.6.111:8083/sms"
class PhoneVerification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: '',
      code2: '', // 인증번호 저장
      verificationCode: '', // 입력한 인증번호
      isButtonDisabled : true
    };
  }

  sendSMS = () => {
    const { phoneNumber } = this.state;


    // 요청에 보낼 데이터 객체
    const data = {
      phoneNumber: phoneNumber,
    };
    // Axios를 사용하여 서버에 POST 요청 보내기
    axios
      .post(SMS_API_BASE_URL + "/sns", this.state.phoneNumber)
      .then((response) => {
        if (response.data === 'error') {
          alert('휴대폰 번호가 올바르지 않습니다.');
        } else {
          alert('휴대폰 전송이 완료되었습니다.');
          this.setState({ code2: response.data });
          console.log('res.data', response.data)
          this.setState({ isButtonDisabled: false });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  verifyCode = () => {
    console.log('code2', this.state.code2)
    console.log('verificationCode', this.state.verificationCode)
    if (this.state.verificationCode == this.state.code2) {
      alert('인증 성공');

      let data = {
        isButtonDisabled : this.state.isButtonDisabled,
        phoneNumber : this.state.phoneNumber
      }
      this.props.onDataHandle(data)
    } else {
      alert('인증 실패');
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" style={style}> 본인 인증 </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="phoneNumber"
            label="전화번호"
            name="phoneNumber"
            autoComplete="phoneNumber"
            placeholder="전화번호를 입력해주세요."
            autoFocus
            onChange={this.handleChange}
          />
          <button className="btn btn-primary btn-block mb-4" onClick={this.sendSMS}>
            입력
          </button>
          <TextField
            margin="normal"
            required
            fullWidth
            name="verificationCode"
            label="인증번호"
            type="verificationCode"
            id="verificationCode"
            placeholder='인증번호를 입력해주세요.'
            autoComplete="current-verificationCode"
            onChange={this.handleChange}
          />
          <button className="btn btn-primary btn-block mb-4" onClick={this.verifyCode} disabled ={this.state.isButtonDisabled}>
            인증확인
          </button>
        </Box>
        </Container>
      </div>
    );
  }
}

const style = {
  display: 'flex',
  justifyContent: 'center'
}

export default PhoneVerification;