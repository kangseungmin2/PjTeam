import React, { Component } from "react";
import { IconButton, Typography, Button, Stack, Grid, Container, InputAdornment, Input, FormHelperText, FormControl, MenuItem, Select } from "@mui/material";
import DepositSign from "../../api/depositSign";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


class SignDetail extends Component {

    constructor(props) {
        super(props);
        // staate에 초기화
        this.state = {
            yeSignNo: '',            // 예금번호
            id: window.localStorage.getItem("id"),     // 회원아이디
            yeNo: '',                // 상품번호        
            depositAccountNum: '',     // 예금계좌번호
            accountType: 'y',       // 계좌타입(y)
            accountNum: '',         // 계좌번호
            accountPW: '',          // 계좌비밀번호         
            yeAmount: '',         // 예금원금          
            yeJoinDate: '',      // 예금실행일
            yeEndDate: '',
            rate: '',                               
            message: '',
            accountNumList: [],     // 계좌 리스트 받는 배열
            accountPWD: '',         // 계좌 비번
            totalPaymentRound: '',  // 총 납부회수         
            totalInterest: '',       // 총 이자
            monthlyInterestRate: '',    // 월 금리
            showPassword: false,
            isButtonDisabled: true
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
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

    componentDidMount() {
        this.loadDepositDetail();  // 대출상품 상세정보
        this.loadAccountNum();  // 전체 계좌번호 조회
    }


    // 대출상품 상세페이지 정보 호출
    loadDepositDetail = () => {
        DepositSign.fetchDetailByNum(window.localStorage.getItem("DepositNum"))
            .then(res => {
                let deposit = res.data;
                this.setState({
                    yeSignNo: deposit.yeSignNo,
                    loanProductName: deposit.loanProductName,
                    interestRate: deposit.interestRate,
                    contentTitle: deposit.contentTitle,
                    repayment: deposit.repayment,
                })
            })
            .catch(err => {
                console.log('loadLoanDetail() Error!!', err);
            });
    }

    // 계좌 목록을 불러오는 함수
    loadAccountNum = () => {
        const id = window.localStorage.getItem("id")
        DepositSign.fetchAllAccounts(id)
            .then((res) => {
                const accounts = res.data;
                this.setState({ accountNumList: accounts });
            })
            .catch((err) => {
                console.log('계좌 목록 로딩 중 오류 발생:', err);
            });
    }

    // 계좌 비밀번호 확인
    pwCheck = (e) => {
        e.preventDefault();
        const id = window.localStorage.getItem("id")
        let inputData = {
            accountNum: this.state.accountNum,
            id: id
        }

        DepositSign.pwCheck(inputData)
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


    // 금액계산
    calRepayment = (e) => {
        e.preventDefault();

        // 대출금액, 기간
        const loanAmount = parseFloat(this.state.loanAmount);
        const loanPeriod = parseInt(this.state.loanPeriod);
        const interestRate = parseFloat(this.state.interestRate) / 100; // 금리(년)를 백분율로 변환

        const {loanExecution} = this.state;
        if (loanExecution && loanPeriod) {
            // Date형식으로 변경
            const loanExecutionDate = new Date(loanExecution);
            //  parseInt(loanPeriod, 10); => 10: 10진수를 뜻함
            const loanExpirationYear = loanExecutionDate.getFullYear() + parseInt(loanPeriod, 10);
            // Date형식으로 변경
            const loanExpirationDate = new Date(loanExecutionDate);
            loanExpirationDate.setFullYear(loanExpirationYear);

            // 대출 만기일을 "yyyy-MM-dd" 형식의 문자열로 변환
            //  ISO 8601 형식(예: "2023-10-06T00:00:00.000Z")의 문자열로 변환
            const formattedLoanExpiration = loanExpirationDate.toISOString().split('T')[0];

            // loanExpiration 상태를 설정합니다
            this.setState({ loanExpiration: formattedLoanExpiration });
        }
        if (this.state.repayment === "만기일시상환") {
            // math.round => 정수로 나타내기 위해서 사용
            // 연간 이자 계산 (대출 원금 * 이자율)
            const annualInterest = loanAmount * interestRate;

            // 총 상환금 계산 (대출 원금 + 총 이자)
            const totalRepayment = loanAmount + annualInterest * loanPeriod;

            this.setState({ totalRepayment: totalRepayment });
            this.setState({ totalInterest: annualInterest * loanPeriod });

            this.sendDataToParent()
        } else if (this.state.repayment === "원리금균등상환") {
            // 이자율(년)/12
            const monthlyInterestRate = interestRate / 12;
            // 총납입회차 = 기간(년)*12
            const totalPaymentRound = loanPeriod * 12;
            // 월 상환금
            const repaymentMonth = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -totalPaymentRound));
            // 총 상환금
            const totalRepayment = Math.round(repaymentMonth * totalPaymentRound);
            const totalInterest = Math.round(totalRepayment - loanAmount);
            this.setState({ totalRepayment: totalRepayment });
            this.setState({ totalInterest: totalInterest });
            this.sendDataToParent()
        } else if (this.state.repayment === "원금균등상환") {

            // 총납입회차 = 기간(년)*12
            const totalPaymentRound = loanPeriod * 12;
            // 월 상환금
            const repaymentMonth = Math.round(loanAmount / totalPaymentRound);
            let totalRepayment = 0;
            let totalInterest = 0;
            for (let i = 1; i <= totalPaymentRound; i++) {
                const interestPayment = Math.round((loanAmount - (i - 1) * repaymentMonth) * interestRate / 12);
                totalInterest += interestPayment;
                totalRepayment += repaymentMonth + interestPayment;
            }
            this.setState({ totalRepayment: totalRepayment });
            this.setState({ totalInterest: totalInterest });
            this.sendDataToParent()
        }
    }

    // loanSign에 데이터 넘기기
    sendDataToParent = () => {
        const data = {
            id: window.localStorage.getItem("id"),     // 회원아이디
            num: this.state.num,                // 상품번호
            accountType: 'd',       // 계좌타입(d)
            loanProductName: this.state.loanProductName,    // 대출상품명
            accountNum: this.state.accountNum,         // 계좌번호
            accountPW: this.state.accountPW,          // 계좌비밀번호
            loanState: '신청',      // 계좌상태(신청/반려/정상/해지)
            loanAmount: this.state.loanAmount,         // 대출원금
            paymentDay: this.state.paymentDay,  // 대출납입일(자동이체 할 날)
            loanExecution: this.state.loanExecution,      // 대출실행일
            loanExpiration: this.state.loanExpiration,      // 대출만기일
            repayment: this.state.repayment,          // 상환방법
            interestRate: this.state.interestRate,       // 금리
            loanPeriod: parseInt(this.state.loanPeriod)         // 대출기간
        };

        // 부모 컴포넌트로 데이터 전송
        this.props.onDataHandle(data);
    }

    render() {
        return (

            <Container component="main" maxWidth="md">
                <br />
                <Grid container spacing={2}>
                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '50ch' }}>
                        <Input
                            id="loanProductNameInput"
                            aria-describedby="standard-loanProductName-helper-text"
                            inputProps={{
                                'aria-label': 'loanProductName',
                            }}
                            name="loanProductName"
                            value={this.state.loanProductName}
                            disabled
                        />
                        <FormHelperText >loanProductName</FormHelperText>
                    </FormControl>

                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '23ch' }}>
                        <Input
                            id="interestRateInput"
                            endAdornment={<InputAdornment position="end">%</InputAdornment>}
                            aria-describedby="standard-interestRate-helper-text"
                            inputProps={{
                                'aria-label': 'interestRate',
                            }}
                            name="interestRate"
                            value={this.state.interestRate}
                            disabled
                        />
                        <FormHelperText >interestRate</FormHelperText>
                    </FormControl>

                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '23ch' }}>
                        <Input
                            id="repaymentInput"
                            endAdornment={<InputAdornment position="end"></InputAdornment>}
                            aria-describedby="standard-repayment-helper-text"
                            inputProps={{
                                'aria-label': 'repayment',
                            }}
                            name="repayment"
                            value={this.state.repayment}
                            disabled
                        />
                        <FormHelperText >repayment</FormHelperText>
                    </FormControl>
                </Grid>
                {/* 여기까지 대출 상품 설명 */}
                <Typography variant="h5" style={style} spacing={2}> Sign Loan Product </Typography><br />
                <Grid container spacing={2}>
                    {/* 계좌 선택 */}
                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '23ch' }}>
                        <Select
                            labelId="accountNum-label"
                            id="accountNumInput"
                            name="accountNum"
                            value={this.state.accountNum}
                            onChange={this.onChange}
                        >
                            {this.state.accountNumList.map((account) => (
                                <MenuItem key={account.accountNum} value={account.accountNum}>
                                    {account.accountNum}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>대출입금 계좌번호</FormHelperText>
                    </FormControl>

                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '23ch' }}>
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
                        <FormHelperText >비밀번호</FormHelperText>
                    </FormControl>
                    <Grid container spacing={2}>
                        <Button style={{ margin: '0 auto' }} color="primary" variant="outlined" onClick={this.pwCheck}>계좌확인</Button>
                    </Grid>
                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '23ch' }}>
                        <Select
                            labelId="accountNum-label"
                            id="paymentDayInput"
                            name="paymentDay"
                            value={this.state.paymentDay}
                            onChange={this.onChange}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: 200, // 5개씩 보이도록 크기조정
                                    },
                                },
                            }}
                        >
                            <MenuItem value={"선택없음"}>선택하세요</MenuItem>
                            <MenuItem value={"1"}>1일</MenuItem>
                            <MenuItem value={"2"}>2일</MenuItem>
                            <MenuItem value={"3"}>3일</MenuItem>
                            <MenuItem value={"4"}>4일</MenuItem>
                            <MenuItem value={"5"}>5일</MenuItem>
                            <MenuItem value={"6"}>6일</MenuItem>
                            <MenuItem value={"7"}>7일</MenuItem>
                            <MenuItem value={"8"}>8일</MenuItem>
                            <MenuItem value={"9"}>9일</MenuItem>
                            <MenuItem value={"10"}>10일</MenuItem>
                            <MenuItem value={"11"}>11일</MenuItem>
                            <MenuItem value={"12"}>12일</MenuItem>
                            <MenuItem value={"13"}>13일</MenuItem>
                            <MenuItem value={"14"}>14일</MenuItem>
                            <MenuItem value={"15"}>15일</MenuItem>
                            <MenuItem value={"16"}>16일</MenuItem>
                            <MenuItem value={"17"}>17일</MenuItem>
                            <MenuItem value={"18"}>18일</MenuItem>
                            <MenuItem value={"19"}>19일</MenuItem>
                            <MenuItem value={"20"}>20일</MenuItem>
                            <MenuItem value={"21"}>21일</MenuItem>
                            <MenuItem value={"22"}>22일</MenuItem>
                            <MenuItem value={"23"}>23일</MenuItem>
                            <MenuItem value={"24"}>24일</MenuItem>
                            <MenuItem value={"25"}>25일</MenuItem>
                            <MenuItem value={"26"}>26일</MenuItem>
                            <MenuItem value={"27"}>27일</MenuItem>
                            <MenuItem value={"28"}>28일</MenuItem>
                        </Select>
                        <FormHelperText >대출납입일</FormHelperText>
                    </FormControl>

                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '23ch' }}>
                        <Input
                            id="loanExecutionInput"
                            type="date"
                            name="loanExecution"
                            value={this.state.loanExecution}
                            onChange={(e) => this.setState({ loanExecution: e.target.value })}
                        />
                        <FormHelperText>대출실행일</FormHelperText>
                    </FormControl>

                    {/* 만기일 구해서 테이블에 insert만 함 */}
                    {/* <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '23ch' }}>
                        <Input
                            id="loanExecutionInput"
                            type="date"
                            name="loanExecution"
                            value={this.state.loanExpiration}
                        />
                        <FormHelperText>대출만기일</FormHelperText>
                    </FormControl> */}

                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '23ch' }}>
                        <Input
                            id="loanAmountInput"
                            endAdornment={<InputAdornment position="end">원</InputAdornment>}
                            aria-describedby="standard-loanAmount-helper-text"
                            inputProps={{
                                'aria-label': 'loanAmount',
                            }}
                            name="loanAmount"
                            onChange={this.onChange}
                        />
                        <FormHelperText >대출금액</FormHelperText>
                    </FormControl>

                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '23ch' }}>
                        <Input
                            id="loanPeriodInput"
                            endAdornment={<InputAdornment position="end">년</InputAdornment>}
                            aria-describedby="standard-loanPeriod-helper-text"
                            inputProps={{
                                'aria-label': 'loanPeriod',
                            }}
                            name="loanPeriod"
                            onChange={this.onChange}
                        />
                        <FormHelperText >대출기간</FormHelperText>
                    </FormControl>
                    <Button
                        style={{ margin: '0 auto' }}
                        color="primary"
                        variant="outlined"
                        onClick={this.calRepayment}
                        disabled={this.state.isButtonDisabled} >
                        대출 상환금 계산하기
                    </Button>
                </Grid>
                <br /><br />
                {/* 대출금 계산 */}
                <Grid container spacing={2} style={{ justifyContent: 'center' }}>
                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '21ch' }}>
                        <Input
                            id="loanAmount"
                            endAdornment={<InputAdornment position="end">원</InputAdornment>}
                            aria-describedby="standard-loanAmount-helper-text"
                            inputProps={{
                                'aria-label': 'loanAmount',
                            }}
                            name="loanAmount"
                            value={this.state.loanAmount}
                            disabled
                        />
                        <FormHelperText >대출원금</FormHelperText>
                    </FormControl>
                    <Typography variant="body1" style={style} spacing={2}>+</Typography>
                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '21ch' }}>
                        <Input
                            id="totalInterest"
                            endAdornment={<InputAdornment position="end">원</InputAdornment>}
                            aria-describedby="standard-totalInterest-helper-text"
                            inputProps={{
                                'aria-label': 'totalInterest',
                            }}
                            name="totalInterest"
                            value={this.state.totalInterest}
                            disabled
                        />
                        <FormHelperText >총대출이자</FormHelperText>
                    </FormControl>
                    <Typography variant="body1" style={style} spacing={2} paddingLeft={4}>=</Typography>
                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '35ch' }}>
                        <Input
                            id="totalRepayment"
                            endAdornment={<InputAdornment position="end">원</InputAdornment>}
                            aria-describedby="standard-totalRepayment-helper-text"
                            inputProps={{
                                'aria-label': 'totalRepayment',
                            }}
                            name="totalRepayment"
                            value={this.state.totalRepayment}
                            disabled
                        />
                        <FormHelperText >총상환금액</FormHelperText>

                    </FormControl>
                </Grid>

            </Container>
        );
    }
}
export default SignDetail;

const style = {
    display: 'flex',
    justifyContent: 'center'
}