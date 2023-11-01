import React, { Component } from "react";
import { Button, TextField, Typography, Table, TableHead, TableBody, TableRow, TableCell, } from '@mui/material';
import { IconButton, InputAdornment, Input, MenuItem, Select } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import PaymentsIcon from '@mui/icons-material/Payments';
import SavingsSignApi from "../../api/savingSign";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


class SavngsPay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            juckSignNo: '',
            id: window.localStorage.getItem("id"),
            signs: [],
            accountNum: '',         // 계좌번호
            accountNumList: [],     // 계좌 리스트 받는 배열
            accountPW: '0000',          // 계좌비밀번호
            accountPWD:'',
            juckPayDate: '',
            checked: false,
            showPassword: false,
            isButtonDisabled: true
        }
    }

    // 라이프사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 렌더링
    componentDidMount() {
        this.loadSavingsSignList();
        this.loadAccountNum();

    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // Signlist 정보
    loadSavingsSignList = () => {
        let input = {
            id: window.localStorage.getItem("id"),
            juckSignNo: window.localStorage.getItem("juckSignNo")
        }
        console.log('input 뜨나', input)
        SavingsSignApi.fetchSignList(input)
            .then((res) => {
                this.setState({
                    signs: res.data,
                    juckJoinDate: res.data.juckJoinDate,
                    juckEndDate: res.data.juckEndDate,
                    juckAmount: res.data.juckAmount,             
                    interestRate: res.data.interestRate, 
                    juckBalance:res.data.juckBalance
                })
                console.log('sign리스트 뜨나', res.data)
            })
            .catch(err => {
                console.log('loadSavingsSignList() Error!!', err);
            })
    }


    // 계좌 목록을 불러오는 함수
    loadAccountNum = () => {
        const id = window.localStorage.getItem("id")
        SavingsSignApi.fetchAllAccounts(id)
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

        SavingsSignApi.pwCheck(inputData)
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
            juckSignNo: window.localStorage.getItem("juckSignNo"),
            juckAmount: this.state.signs.juckAmount,           
            juckBalance:this.state.signs.juckBalance,
            accountNum: this.state.accountNum,
        }
        console.log('input데이터 있나', input)
        SavingsSignApi.payment(input)
        .then(response => {
            console.log(response);
            if (response.data.success) {
                // 성공적인 응답 처리
                console.log(response);
                alert(response.data.message);
                this.props.history.push('/savingsSignList');
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
                    적금 납부하기
                </Typography>
                <br />
                <Table style={tableStyle}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={tableHead} colSpan={4}>
                                적금 상품
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
                                    name="juckName"
                                    disabled
                                    value={this.state.signs.juckName} />
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
                                    name="savingsAccountNum"
                                    disabled
                                    value={this.state.signs.savingsAccountNum} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={tableHead}>
                                시작일
                            </TableCell>
                            <TableCell style={{ textAlign: 'center', border: '1px solid rgb(230, 229, 227)' }}>
                                {new Date(this.state.signs.juckJoinDate).toLocaleDateString(
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
                                {new Date(this.state.signs.juckEndDate).toLocaleDateString(
                                    'ko-KR', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit'
                                })}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell style={tableHead}>
                                회차
                            </TableCell>
                            <TableCell style={{ textAlign: 'center', border: '1px solid rgb(230, 229, 227)' }}>
                                <Input
                                    id="juckRound"
                                    endAdornment={<InputAdornment position="end">회차</InputAdornment>}
                                    aria-describedby="standard-juckRound-helper-text"
                                    inputProps={{
                                        'aria-label': 'juckRound',
                                    }}
                                    name="juckRound"
                                    disabled
                                    value={this.state.signs.juckRound}
                                />
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
                        <TableRow>
                            <TableCell style={tableHead}>
                                원금
                            </TableCell>
                            <TableCell style={{ textAlign: 'center', border: '1px solid rgb(230, 229, 227)' }}>
                                <Input
                                    id="juckBalance"
                                    endAdornment={<InputAdornment position="end">원</InputAdornment>}
                                    aria-describedby="standard-juckBalance-helper-text"
                                    inputProps={{
                                        'aria-label': 'juckBalance',
                                    }}
                                    name="juckBalance"
                                    disabled
                                    value={this.state.signs.juckBalance}
                                />
                            </TableCell>
                            <TableCell style={tableHead}>
                                이체금액
                            </TableCell>
                            <TableCell style={{ textAlign: 'center', border: '1px solid rgb(230, 229, 227)' }}>
                                <Input
                                    id="juckAmount"
                                    endAdornment={<InputAdornment position="end">원</InputAdornment>}
                                    aria-describedby="standard-juckAmount-helper-text"
                                    inputProps={{
                                        'aria-label': 'juckAmount',
                                    }}
                                    name="juckAmount"
                                    disabled
                                    value={this.state.signs.juckAmount}
                                />
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
                    추가납입
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
export default SavngsPay;