import React, { Component } from "react";
import { Button, IconButton, TextField, Table, TableHead, TableBody, TableRow, TableCell, Typography, Select, MenuItem, FormControl, Input, InputAdornment, TableFooter, Grid, Container, Tab, label } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Checkbox from '@mui/material/Checkbox';
import PaymentsIcon from '@mui/icons-material/Payments';
import LoanSignApi from "../../api/loanSign";
import LoanApi from "../../api/loan";

class EndDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            checked: false,
            signs: [],      // signList
            repayments: [],     // repaymentList
            amountBalance: '',   // 잔금
            payDate: '',    // 납부일
            commission: '', // 중도상환수수료율
            earlyRepayment: '', // 중도상환수수료금액(자동계산)
            accountNum: '',         // 계좌번호
            accountNumList: [],     // 계좌 리스트 받는 배열
            accountPW: '0000',          // 계좌비밀번호
            totalRepayment: '',
            accountPWD:'',
            checked: false,
            showPassword: false,
            isButtonDisabled: true

        }
    }

    componentDidMount() {
        this.loadLoanSignList();
        this.loadRepaymentList();
        this.loadAccountNum();
        this.loadLoanDetail();

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
    // 상품정보-수수료율
    loadLoanDetail = () => {
        LoanApi.fetchDetailByNum(window.localStorage.getItem("num"))
            .then(res => {
                let loan = res.data;
                this.setState({
                    commission: loan.commission
                })
            })
            .catch(err => {
                console.log('loadLoanDetail() Error!!', err);
            });
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
                this.setState({ accountPWD: accountPwD },() =>{
                    if (this.state.accountPW == this.state.accountPWD) {
                        // 비밀번호가 일치하는 경우 알림 창 표시
                        this.setState({ isButtonDisabled: false });
                        window.alert('비밀번호가 일치. 계속 진행하세요.');
                    }
                    else {
                        // 비밀번호가 불일치
                        window.alert('비밀번호가 불일치. 확인하세요.');
                    }
                });
            })
            .catch(err => {
                console.log('pwCheck 에러', err);
            })
    }

    // 체크
    onCheckboxChange = () => {
        this.setState({ checked: !this.state.checked });
    }

    // 납입일 입력 이벤트
    handlePayDateChange = (e) => {
        // 입력한 납입일 값을 상태에 업데이트
        this.setState({
            payDate: e.target.value,
        });
        // 납입일이 변경될 때 수수료 계산 함수 호출
        const earlyRepayment = this.calculatePrepaymentFee();
        this.setState({
            earlyRepayment: earlyRepayment,
        });
        // 변경된 부분: 총 상환금액 계산 및 업데이트
        const totalRepayment = earlyRepayment + parseFloat(this.state.repayments.amountBalance);
        this.setState({
            earlyRepayment: earlyRepayment,
            totalRepayment: totalRepayment,
        });
    }


    // 중도상환수수료 계산
    calculatePrepaymentFee = () => {
        const amountBalance = parseFloat(this.state.repayments.amountBalance);
        const commissionRate = parseFloat(this.state.commission) / 100; // 수수료율을 실수로 변환
        const loanExecution = new Date(this.state.signs.loanExecution); // 대출 실행일
        const loanExpiration = new Date(this.state.signs.loanExpiration);   // 대출 만기일
        const payDate = new Date(this.state.payDate);   // 중도상환일

        // 면제기간 (대출 상품에 따라 조정)
        const exemptionPeriodMonths = 36;  // 3년 (36개월)

        // 대출 경과월수 (30일 기준)
        // (납입년-실행일년)*12 + 납입월-실행월 > 경과월
        const loanElapsedMonths = (payDate.getFullYear() - loanExecution.getFullYear()) * 12 + (payDate.getMonth() - loanExecution.getMonth());

        if (loanElapsedMonths - exemptionPeriodMonths > 0) {
            const earlyRepayment = 0
            return earlyRepayment;
        } else {
            const earlyRepayment = Math.round(amountBalance * commissionRate * ((exemptionPeriodMonths - loanElapsedMonths) / exemptionPeriodMonths))
            return earlyRepayment;
        }

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
            loanBalance : this.state.repayments.amountBalance,
            loanTermination : this.state.payDate,
            accountNum: this.state.accountNum,
            earlyRepayment : this.state.earlyRepayment
        }
        console.log('input데이터 있나', input)
        LoanSignApi.endPayment(input)
        .then(response => {
            console.log(response);
            if (response.data.success) {
                // 성공적인 응답 처리
                console.log(response);
                alert(response.data.message);
                this.props.history.push('/loanSignList');
              } else {
                // 오류 메시지 처리
                alert(response.data.message);
                window.location.reload();
              }
        });
    }

    render() {
        return (
            <div align='center'>
                <form>
                    <PaymentsIcon fontSize='large' color='primary' />
                    <Typography variant="h4">
                        해지신청
                    </Typography>
                    <Table style={{ width: '53vw' }}>
                        <TableHead style={{ width: '53vw' }}>
                            <TableRow>
                                <TableCell style={style} colSpan={4}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={tableBody}>
                            <TableRow>
                                <TableCell style={{ textAlign: 'left', color: 'red', padding: '30px' }}>
                                    ＊ 인터넷뱅킹을 통한 예,적금 해지시 추가 본인확인 절차 후 예금 해지가 가능하며, <br />
                                    해지 신청이 폭주하는 경우 추가 본인확인절차가 지연될 수 있사오니 이점 양해하여 주시기 바랍니다.<br />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)', padding: '30px' }}>
                                    - 추가 본인확인 실시 : 휴대폰 SMS인증 또는 2채널 인증 <br />
                                    (단 해외에 체류하시는 경우 고객센터를 통한 유선통화 확인을 실시합니다)<br />
                                    - 해지전 고객정보의 연락처를 반드시 확인하시기 바랍니다.<br />
                                    (해외에 체류하시는 경우 "정보변경-해외정보"에 해외연락처를 남겨주시면 해당 연락처로 연락을 드립니다.)<br />
                                    - 인터넷뱅킹에서 신규가입한 예,적금을 해지시 해지금액은 신규 당시의 출금계좌(연결게좌)로만 입금 가능합니다.<br />
                                    - 연결된 계좌가 없는 경우, 해지금액 입금계좌는 개설한지 1개월 이상 지난 계좌만 가능합니다.<br />
                                    -입출식 계좌의 경우, 개설한지 1개월 이상, 잔액 100만원 이하의 요구불 예금 (MMDA계좌 포함)의 경우, 해지가 가능합니다.<br />
                                    (단, 인터넷 해지가 불가한 경우 영업점을 방문하여 해지해 주시기 바랍니다.)<br /><br /><br />
                                    <strong>[중도상환수수료]</strong><br />
                                    - 중도상환수수료는 3년 이내에 중도상환된 원금에 대하여 중도상환수수료율 내에서 부과<br />
                                    - 중도상환수수료 = 중도상환원금 X 중도상환수수료율 X [(36개월-대출경과월수)/36개월]<br />
                                </TableCell>
                            </TableRow>
                        </TableBody>

                    </Table>
                    <br />
                    <Typography style={typography}>
                        대출 해지정보입력
                    </Typography>
                    <Table style={tableStyle}>
                        <TableHead>
                            <TableRow>
                                <TableCell style={tableHead} colSpan={4}>
                                    대출 상품
                                </TableCell>
                            </TableRow>
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
                                    해지계좌번호
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
                                <TableCell style={tableHead}>
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
                                        onChange={this.handlePayDateChange} />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={tableHead} colSpan={4}>
                                    중도상환
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={tableHead}>
                                    수수료율
                                </TableCell>
                                <TableCell style={{ textAlign: 'center', border: '1px solid rgb(230, 229, 227)' }}>
                                    <Input
                                        id="standard-required"
                                        endAdornment={<InputAdornment position="end">%</InputAdornment>}
                                        aria-describedby="standard-commission-helper-text"
                                        inputProps={{
                                            'aria-label': 'commission',
                                        }}
                                        value={this.state.commission}
                                        disabled />
                                </TableCell>
                                <TableCell style={tableHead}>
                                    수수료(원)
                                </TableCell>
                                <TableCell style={{ textAlign: 'center', border: '1px solid rgb(230, 229, 227)' }}>
                                    <TextField
                                        required
                                        id="standard-required"
                                        variant="standard"
                                        type="text"
                                        name="commission"
                                        style={{ width: '205px' }}
                                        disabled
                                        value={this.state.earlyRepayment}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={tableHead} colSpan={3}>
                                    총 상환금액
                                </TableCell>
                                <TableCell style={tableHead}>
                                    <TextField
                                        required
                                        id="standard-required"
                                        variant="standard"
                                        type="text"
                                        name="commission"
                                        style={{ width: '205px' }}
                                        disabled
                                        value={this.state.totalRepayment}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>


                    <br /><br />

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
                    <span style={{ color: "red", fontSize: '13px' }}>※ 대출 중도상환 정보를 확인 하였으며, 동의합니다. ※</span>
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
                        대출해지
                    </Button>
                    <Button href="/loanSignList" variant="outlined" color="primary">
                        취소
                    </Button>
                    <br /><br /><br />
                </form>
            </div>
        );
    }
}
const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const tableBody = {
    borderTop: '1px solid rgb(230, 229, 227)',
    borderBottom: '1px solid rgb(230, 229, 227)'
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
    marginBottom: '30px'
};

const tableHead = {
    border: '1px solid rgb(230, 229, 227)',
    textAlign: 'center',
    fontWeight: '700',
    backgroundColor: 'rgba(135, 206, 235, 0.2)'
};

export default EndDetail;