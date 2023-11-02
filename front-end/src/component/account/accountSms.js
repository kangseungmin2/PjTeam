import React, { Component } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography , Table, TableCell, TableBody, TableRow, TableHead } from '@mui/material';
import Container from '@mui/material/Container';

const SMS_API_BASE_URL = "http://localhost:8083/sms"
class accountSms extends Component {
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

  //인증번호 인증
  verifyCode = () => {
    console.log('code2', this.state.code2)
    console.log('verificationCode', this.state.verificationCode)
    if (this.state.verificationCode == this.state.code2) {
      alert('인증 성공');
      this.props.history.push("/openAccount");
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
            marginBottom: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Table style={box}>
          <TableBody>
          <TableCell style={boxText2}>
              <Typography variant="h4" style={style}> 계좌 개설 전<br/> 본인인증을 해주세요.</Typography>
            </TableCell>
          </TableBody>
          <TableBody style={tableBody}>
          <br/>
            <TableRow>
              <TableCell style={boxText}>
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
                <TableCell style={boxText3}>
              <button className="btn btn-primary btn-block mb-3" onClick={this.sendSMS}>
                입력
              </button>
              </TableCell>
              </TableCell>     
            </TableRow>
            <TableRow>
            <TableCell style={boxText}>
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
            <TableCell style={boxText3}>
            <button className="btn btn-primary btn-block mb-3" onClick={this.verifyCode} disabled ={this.state.isButtonDisabled}>
              인증확인
            </button>
            </TableCell>
            </TableCell>
            </TableRow>
            <br/>
            </TableBody>
          </Table>
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

const box = {
  borderRadius: '50px 50px',
  boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.5)',
  width: '50vw',
  height: '20vw',
  margin: '50px'
}

const boxText = {
  width: '550px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'baseline',
  border : 'none',
  marginLeft: '130px'
}

const boxText2 = {
  width: '450px',
  margin: '50px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'baseline',
  border : 'none',
  marginLeft: '80px'
}

const boxText3 = {
  width: '250px',
  justifyContent: 'center',
  alignItems: 'center',
  border : 'none',
  marginLeft: '15px'
}

const tableBody = {
  borderTop: '1px solid rgb(230, 229, 227)',
  margin: '50px',
  justifyContent: 'center',
  alignItems: 'baseline'
}

export default accountSms;