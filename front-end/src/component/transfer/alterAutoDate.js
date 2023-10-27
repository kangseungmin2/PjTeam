import { Table, TableHead, TableBody, TableRow, TableCell, Typography, TableFooter, InputAdornment, Input, FormHelperText, FormControl } from "@mui/material";
import React, { Component } from "react";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import API from '../../api/transferAuto';

// 자동이체 출금일 변경화면
export default class alterAutoDate extends Component {
  constructor(props) {
    super(props);

    this.state = {
        autos: {
            accountNum: 0,
            accountLimit: 0,
            accountPW: 0,
        },
        chageDate: 0,
        passwords: {}
    };

}


  componentDidMount() {
    this.alterAutoDate();
  }
  
    // list 정보
    alterAutoDate = () => {
      API.autoDetail(window.localStorage.getItem("AutoNum"))
          .then(res => {
              console.log('alterAutoDate() res!!', res);
              this.setState({
                  autos: res.data
              })
          })
          .catch(err => {
              console.log('alterAutoDate() Error!!', err);
          })
  }

    // 계좌 비밀번호 4자리 맞는지 확인 
    handleChange = (e, accountNum) => {
      const inputValue = e.target.value;

      // input box에 password 4자리 숫자제한 걸기
      if (inputValue.length <= 4) {
          // 개별 비밀번호 상태를 업데이트
          this.setState(prevState => ({
              passwords: {
                  ...prevState.passwords,
                  [accountNum]: inputValue,
              }
          }));
      } else {
          alert('계좌에 비밀번호는 4자리 입니다.');
          // 해당 입력 필드 초기화
          this.setState(prevState => ({
              passwords: {
                  ...prevState.passwords,
                  [accountNum]: '',
              }
          }));
      }
  };

  handleLimit = (e) => {
      const inputValue = e.target.value;

      this.setState({
        chageDate : inputValue
      })
  }


  // 입력한 비밀번호가 DB data랑 맞는지 비교후 상품 상세화면으로 전환
  clickBtn = (accountNum, accountPW) => {
    const enteredPassword = this.state.passwords[accountNum];
    const strChageDate = this.state.chageDate;


    if (enteredPassword == accountPW) {
      if (strChageDate != '') {
        window.localStorage.removeItem("accountNum");
        window.localStorage.setItem('accountNum', accountNum);
        window.localStorage.setItem('chageDate', strChageDate);
        API.
        this.props.history.push('/limitAccount');
      }
      else{
        alert('변경을 희망하시는 한도를 숫자로 입력해주세요.');
        window.location.reload();
      }
       
    } else {
        alert('비밀번호가 일치하지 않습니다.');

        // 해당 입력 필드 초기화
        this.setState(prevState => ({
            passwords: {
                ...prevState.passwords,
                [accountNum]: '',
            }
        }));
    }
};


  render() {
    return (
      <div>
        <CurrencyExchangeIcon fontSize='large' color='primary' />
        <Typography variant="h4" style={style}> 자동이체 출금일 변경 </Typography>
        <br/>
        <Table>
              <TableHead>
                  <TableRow>
                    <TableCell align="center" width="100">자동이체명</TableCell>
                    <TableCell align="center" width="100">{this.state.autos.autoTitle}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell align="center" width="100">수취기업</TableCell>
                    <TableCell align="center" width="100">{this.state.autos.autoCompany}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell align="center" width="100">출금금액</TableCell>
                    <TableCell align="center" width="100">{this.state.autos.autoAmount}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell align="center" width="100">출금계좌</TableCell>
                    <TableCell align="center" width="100">{this.state.autos.accountNum}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell align="center" width="100">기존 출금일</TableCell>
                    <TableCell align="center" width="100">{new Date(this.state.autos.autoDate).toLocaleString('ko-KR', {
                                                    year: 'numeric',
                                                    month: '2-digit',
                                                    day: '2-digit'
                                                    })}</TableCell>
                  </TableRow>


                  <TableRow>
                    <TableCell align="center" width="100">변경 출금일</TableCell>
                    <TableCell align="center" width="100">
                        <input
                        type="date"
                        id="autoDate"
                        name="autoDate"
                        value= {new Date(this.state.alterDate).toLocaleString('ko-KR', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit'
                          })} 
                        onChange={(e) => this.handleLimit(e)} // 특정 accountNum를 전달
                        />
                   </TableCell>
                 </TableRow>
              </TableHead>
        </Table>

          <Table>
            <TableBody align="center">
              <TableRow>
                  <TableCell align="center">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={this.state.passwords[this.state.autos.accountNum] || ''} // 개별 비밀번호 상태 사용
                        onChange={(e) => this.handleChange(e, this.state.autos.accountNum)} // 특정 accountNum를 전달
                        style={pwd}
                        placeholder="계좌 비밀번호를 입력하세요."
                    />
                    <button type="button" className="btn btn-primary btn-block md-3" style={button} onClick={() => this.clickBtn(this.state.autos.accountNum, this.state.autos.accountPW, this.state.autos.accountLimit)}>변경</button>
                </TableCell>
              </TableRow>
             </TableBody>
          </Table>
      
        <br />
      </div>
    );
  }
}

const style = {
  display: 'flex',
  justifyContent: 'center',
};

const pwd = {
  width: '300px',
  height: '40px',
  margin: '10px',
  fontSize: '15px',
  borderRadius: 0,
  border: 'none',
  textAlign: 'center'
}

const button = {
  width: '130px',
  height: '40px',
  boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.5)',
  textAlign: 'center',
  borderRadius: '10px'
}



