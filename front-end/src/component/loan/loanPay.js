import React, { Component } from "react";
import { Button, TextField, Typography, Table, TableHead, TableBody, TableRow, TableCell, } from '@mui/material';
import { IconButton, InputAdornment, Input, MenuItem, Select } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import PaymentsIcon from '@mui/icons-material/Payments';
import LoanSignApi from "../../api/loanSign";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


class LoanPay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loanNum: '',
            id: window.localStorage.getItem("id"),
            signs: [],
            repayments: [],
            accountNum: '',         // 계좌번호
            accountNumList: [],     // 계좌 리스트 받는 배열
            accountPW: '0000',          // 계좌비밀번호
            accountPWD: '',
            payDate: '',    // 납입일
            checked: false,
            showPassword: false,
            isButtonDisabled: true
        }
    }

    // 라이프사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 렌더링
    componentDidMount() {
        this.loadLoanSignList();
        this.loadRepaymentList();
        this.loadAccountNum();

    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // Signlist 정보
    loadLoanSignList = () => {
        let input = {
            id: window.localStorage.getItem("id"),
            loanNum: window.localStorage.getItem("LoanNum")
        }
        console.log('input 뜨나', input)
        LoanSignApi.fetchSignList(input)
            .then((res) => {
                this.setState({
                    signs: res.data
                })
                console.log('sign리스트 뜨나', res.data)
            })
            .catch(err => {
                console.log('loadLoanSignList() Error!!', err);
            })
    }

    // repayment 정보
    loadRepaymentList = () => {
        let input = {
            id: window.localStorage.getItem("id"),
            loanNum: window.localStorage.getItem("LoanNum")
        }
        console.log('input 뜨나', input)
        LoanSignApi.fetchRepaymentList(input)
            .then((res) => {
                this.setState({
                    repayments: res.data
                })
                console.log('repayment리스트 뜨나', res.data)
            })
            .catch(err => {
                console.log('fetchRepaymentList() Error!!', err);
            })
    }

    // 계좌 목록을 불러오는 함수
    loadAccountNum = () => {
        const id = window.localStorage.getItem("id")
        LoanSignApi.fetchAllAccounts(id)
            .then((res) => {
                const accounts = res.data;
                this.setState({ accountNumList: accounts });
            })
            .catch((err) => {
                console.log('계좌 목록 로딩 중 오류 발생:', err);
            });
    }

    // 비밀번호
    handleClickShowPassword = () => {
        this.setState((prevState) => ({
            showPassword: !prevState.showPassword
        }));
    }
    // 비밀번호
    handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    // 계좌 비밀번호 확인
    pwCheck = (e) => {
        e.preventDefault();
        const id = window.localStorage.getItem("id")
        let inputData = {
            accountNum: this.state.accountNum,
            id: id
        }

        LoanSignApi.pwCheck(inputData)
            .then((res) => {
                const accountPwD = res.data;
                this.setState({ accountPWD: accountPwD });

                if (this.state.accountPW == this.state.accountPWD) {
                    // 비밀번호가 일치하는 경우 알림 창 표시
                    this.setState({ isButtonDisabled: false });
                    window.alert('비밀번호가 일치. 계속 진행하세요.');
                }
                else {
                    // 비밀번호가 불일치
                    window.alert('비밀번호가 불일치. 확인하세요.');
                }
            })
            .catch(err => {
                console.log('pwCheck 에러', err);
            })
    }

    // 체크
    onCheckboxChange = () => {
        this.setState({ checked: !this.state.checked });
    }

    // 납입요청
    payRequest = () => {
        let input = {
            id: window.localStorage.getItem("id"),
            loanNum: window.localStorage.getItem("LoanNum"),
            repayment : this.state.repayments.repayment,
            loanPeriod : this.state.repayments.loanPeriod,
            paymentRound : this.state.repayments.paymentRound,
            interestRate : this.state.repayments.interestRate,
            loanAmount : this.state.repayments.loanAmount,
            repaymentMonth : this.state.repayments.repaymentMonth,
            interest : this.state.repayments.interest,
            amountBalance : this.state.repayments.amountBalance,
            payDate : this.state.payDate,
            accountNum: this.state.accountNum,
        }
        console.log('input데이터 있나', input)
        LoanSignApi.payment(input)
        .then(response => {
            console.log(response);
            if (response.data.success) {
                // 성공적인 응답 처리
                console.log(response);
                alert(response.data.message);
                this.props.history.push('/repayment');
              } else {
                // 오류 메시지 처리
                alert(response.data.message);
                window.location.reload();
              }
        });
        
    }

    render() {
        return (
            <div align="center">
                <PaymentsIcon fontSize='large' color='primary' />
                <Typography variant="h4">
                    대출상환금 납부하기
                </Typography>
                <br />
                <Table style={tableStyle}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={tableHead} colSpan={4}>
                                대출 상품
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell style={tableHead}>
                                상품명
                            </TableCell>
                            <TableCell style={{ textAlign: 'center', border: '1px solid rgb(230, 229, 227)' }}>
                                <TextField
                                    required
                                    id="standard-required"
                                    variant="standard"
                                    type="text"
                                    name="loanProductName"
                                    disabled
                                    value={this.state.signs.loanProductName} />
                            </TableCell>
                            <TableCell style={tableHead}>
                                계좌번호
                            </TableCell>
                            <TableCell style={{ textAlign: 'center', border: '1px solid rgb(230, 229, 227)' }}>
                                <TextField
                                    required
                                    id="standard-required"
                                    variant="standard"
                                    type="text"
                                    name="loanAccountNum"
                                    disabled
                                    value={this.state.signs.loanAccountNum} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={tableHead}>
                                시작일
                            </TableCell>
                            <TableCell style={{ textAlign: 'center', border: '1px solid rgb(230, 229, 227)' }}>
                                {new Date(this.state.signs.loanExecution).toLocaleDateString(
                                    'ko-KR', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit'
                                })}
                            </TableCell>
                            <TableCell style={tableHead}>
                                만기일
                            </TableCell>
                            <TableCell style={{ textAlign: 'center', border: '1px solid rgb(230, 229, 227)' }}>
                                {new Date(this.state.signs.loanExpiration).toLocaleDateString(
                                    'ko-KR', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit'
                                })}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={tableHead}>
                                상환방식
                            </TableCell>
                            <TableCell style={{ textAlign: 'center', border: '1px solid rgb(230, 229, 227)' }}>
                                <TextField
                                    required
                                    id="standard-required"
                                    variant="standard"
                                    type="text"
                                    name="repayment"
                                    disabled
                                    value={this.state.signs.repayment} />
                            </TableCell>
                            <TableCell style={tableHead}>
                                금리
                            </TableCell>
                            <TableCell style={{ textAlign: 'center', border: '1px solid rgb(230, 229, 227)' }}>
                                <Input
                                    id="interestRateInput"
                                    endAdornment={<InputAdornment position="end">%</InputAdornment>}
                                    aria-describedby="standard-interestRate-helper-text"
                                    inputProps={{
                                        'aria-label': 'interestRate',
                                    }}
                                    name="interestRate"
                                    value={this.state.signs.interestRate}
                                    disabled
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Table style={tableStyle}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={tableHead} colSpan={4}>
                                대출상환금
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell style={tableHead}>
                                상환회차
                            </TableCell>
                            <TableCell style={{ textAlign: 'center', border: '1px solid rgb(230, 229, 227)' }}>
                                <Input
                                    id="paymentRound"
                                    endAdornment={<InputAdornment position="end">회차</InputAdornment>}
                                    aria-describedby="standard-paymentRound-helper-text"
                                    inputProps={{
                                        'aria-label': 'paymentRound',
                                    }}
                                    name="paymentRound"
                                    disabled
                                    value={this.state.repayments.paymentRound}
                                />
                            </TableCell>
                            <TableCell style={tableHead}>
                                최종납입일
                            </TableCell>
                            <TableCell style={{ textAlign: 'center', border: '1px solid rgb(230, 229, 227)' }}>
                                {this.state.repayments.payDate
                                    ? new Date(this.state.repayments.payDate).toLocaleDateString('ko-KR', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit'
                                    })
                                    : '' // payDate가 null이면 빈 문자열을 렌더링
                                }
                            </TableCell>

                        </TableRow>
                        <TableRow>
                            <TableCell style={tableHead}>
                                원금상환
                            </TableCell>
                            <TableCell style={{ textAlign: 'center', border: '1px solid rgb(230, 229, 227)' }}>
                                <Input
                                    id="repaymentAmount"
                                    endAdornment={<InputAdornment position="end">원</InputAdornment>}
                                    aria-describedby="standard-repaymentAmount-helper-text"
                                    inputProps={{
                                        'aria-label': 'repaymentAmount',
                                    }}
                                    name="repaymentAmount"
                                    disabled
                                    value={this.state.repayments.repaymentAmount}
                                />
                            </TableCell>
                            <TableCell style={tableHead}>
                                이자상환
                            </TableCell>
                            <TableCell style={{ textAlign: 'center', border: '1px solid rgb(230, 229, 227)' }}>
                                <Input
                                    id="interest"
                                    endAdornment={<InputAdornment position="end">원</InputAdornment>}
                                    aria-describedby="standard-interest-helper-text"
                                    inputProps={{
                                        'aria-label': 'interest',
                                    }}
                                    name="interest"
                                    disabled
                                    value={this.state.repayments.interest}
                                />
                            </TableCell>

                        </TableRow>
                        <TableRow>
                            <TableCell style={tableHead}>
                                월상환금
                            </TableCell>
                            <TableCell style={{ textAlign: 'center', border: '1px solid rgb(230, 229, 227)' }}>
                                <Input
                                    id="repaymentMonth"
                                    endAdornment={<InputAdornment position="end">원</InputAdornment>}
                                    aria-describedby="standard-repaymentMonth-helper-text"
                                    inputProps={{
                                        'aria-label': 'repaymentMonth',
                                    }}
                                    name="repaymentMonth"
                                    disabled
                                    value={this.state.repayments.repaymentMonth}
                                />
                            </TableCell>
                            <TableCell style={tableHead}>
                                잔금
                            </TableCell>
                            <TableCell style={{ textAlign: 'center', border: '1px solid rgb(230, 229, 227)' }}>
                                <Input
                                    id="amountBalance"
                                    endAdornment={<InputAdornment position="end">원</InputAdornment>}
                                    aria-describedby="standard-amountBalance-helper-text"
                                    inputProps={{
                                        'aria-label': 'amountBalance',
                                    }}
                                    name="amountBalance"
                                    disabled
                                    value={this.state.repayments.amountBalance}
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Table style={tableStyle}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={tableHead} colSpan={4}>
                                납부일 설정
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell style={tableHead}>
                                이체지정
                            </TableCell>
                            <TableCell style={{ textAlign: 'center', border: '1px solid rgb(230, 229, 227)' }}>
                                <Input
                                    id="paymentDay"
                                    endAdornment={<InputAdornment position="end">일</InputAdornment>}
                                    aria-describedby="standard-paymentDay-helper-text"
                                    inputProps={{
                                        'aria-label': 'paymentDay',
                                    }}
                                    name="paymentDay"
                                    disabled
                                    value={this.state.signs.paymentDay}
                                />
                            </TableCell>
                            <TableCell style={tableHead2}>
                                납입날짜
                            </TableCell>
                            <TableCell style={{ textAlign: 'center', border: '1px solid rgb(230, 229, 227)' }}>
                                <TextField
                                    required
                                    id="standard-required"
                                    variant="standard"
                                    type="date"
                                    name="payDate"
                                    style={{ width: '205px' }}
                                    value={this.state.signs.payDate} 
                                    onChange={this.onChange} />
                            </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>


                <Typography style={typography}>
                    출금계좌선택
                </Typography>
                <Table style={tableStyle}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={tableHead}>
                                출금계좌번호
                            </TableCell>
                            <TableCell style={{ textAlign: 'center', border: '1px solid rgb(230, 229, 227)' }}>
                                <Select
                                    labelId="accountNum-label"
                                    id="accountNumInput"
                                    name="accountNum"
                                    style={{ width: '350px' }}
                                    value={this.state.accountNum}
                                    onChange={this.onChange}
                                >
                                    {this.state.accountNumList.map((account) => (
                                        <MenuItem key={account.accountNum} value={account.accountNum}>
                                            {account.accountNum}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell style={tableHead} >
                                계좌비밀번호
                            </TableCell>
                            <TableCell colSpan={4} style={{ textAlign: 'center', border: '1px solid rgb(230, 229, 227)' }} >
                                <Input
                                    id="accountPWInput"
                                    type={this.state.showPassword ? "text" : "password"}
                                    name="accountPW"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                                onMouseDown={this.handleMouseDownPassword}
                                            >
                                                {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    onChange={this.onChange}
                                />
                                <Button style={{ margin: '10px' }} color="primary" variant="outlined" onClick={this.pwCheck}>계좌확인</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <span style={{ color: "red", fontSize: '13px' }}>※ 납입 정보를 확인 하였으며, 동의합니다. ※</span>
                <Checkbox
                    inputProps={{ 'aria-label': 'Checkbox demo' }}
                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                    checked={this.state.checked}
                    onChange={this.onCheckboxChange}
                />
                <br /><br />
                <Button
                    color="primary"
                    variant="contained"
                    onClick={this.payRequest}
                    disabled={!this.state.checked || this.state.isButtonDisabled} // checked와 계좌확인 버튼 비활성화 상태 모두 확인
                    style={{ marginRight: '10px' }}
                >
                    이자납입
                </Button>
                <Button href="/repayment" variant="outlined" color="primary">
                    취소
                </Button>
                <br /><br /><br />

            </div>

        );
    }

}


const typography = {
    textAlign: 'left',
    fontSize: '17px',
    margin: '20px',
    borderBottom: '2px solid',
    borderImage: 'linear-gradient(135deg, #0074D9, #00A8E8, #0074D9) 1',
    width: '53vw'
}
const tableStyle = {
    width: '50vw',
    marginBottom: '70px'
};

const tableHead = {
    border: '1px solid rgb(230, 229, 227)',
    textAlign: 'center',
    fontWeight: '700',
    backgroundColor: 'rgba(135, 206, 235, 0.2)',

};

const tableHead2 = {
    border: '1px solid rgb(230, 229, 227)',
    textAlign: 'center',
    fontWeight: '700',
    backgroundColor: 'rgba(135, 206, 235)',

};
export default LoanPay;