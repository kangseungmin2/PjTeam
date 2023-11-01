import React, { Component } from "react";
import { Button, IconButton, TextField, Table, TableHead, TableBody, TableRow, TableCell, Typography, Select, MenuItem, FormControl, Input, InputAdornment, TableFooter, Grid, Container, Tab, label } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Checkbox from '@mui/material/Checkbox';
import PaymentsIcon from '@mui/icons-material/Payments';
import SavingsSignApi from "../../api/savingSign";


class juckEndDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            juckSignNo: '',
            juckName: '',
            juckJoinDate: '',
            juckEndDate: '',
           savingsAccountNum: "",
            juckAmount: "",
            juckCancelDate: '',    //해지일
            checked: false,
            signs: [],      // signList               
            interestRate: 0,     //금리 
            interestTerm: 0, // 이자(자동계산)
            accountNum: '',         // 계좌번호
            accountNumList: [],     // 계좌 리스트 받는 배열
            accountPW: '0000',          // 계좌비밀번호 
            accountPWD:'',         
            checked: false,
            showPassword: false,
            isButtonDisabled: true

        }
    }

    componentDidMount() {
        this.loadSavingsSignList();      
        this.loadAccountNum();
       // this.loadSavingsDetail();

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
                    interestRate: res.data.interestRate,     //금리 
                })
                console.log('sign리스트 뜨나', res.data)
                // 데이터가 설정된 후 이자 계산 함수 호출
                this.calculateInterest();
                this.handleInterestAndRedeem();
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
                this.setState({ accountPwD: accountPwD });

                if (this.state.accountPW == this.state.accountPwD) {
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

      // 이자 계산 로직
   // "이자 계산" 함수를 다음과 같이 수정합니다.
    calculateInterest = () => {
    
    const juckJoinDate = new Date(this.state.juckJoinDate);
    const interestRate = parseFloat(this.state.interestRate) / 100;
    const juckAmount = parseFloat(this.state.juckAmount);
        const redeemDate = new Date(this.state.juckCancelDate);
        const interestRateMonth = interestRate / 12; // 연 이자율을 월 이자율로 변환합니다.

        // "시작일"과 "해지날짜" 사이의 월 차이를 계산합니다.
        const monthsDifference = (redeemDate.getFullYear() - juckJoinDate.getFullYear()) * 12 + (redeemDate.getMonth() - juckJoinDate.getMonth());
        const calculatedInterest = Math.round(monthsDifference * juckAmount * interestRateMonth); // 계산된 이자를 구합니다.

        // 계산된 이자를 상태에 저장합니다.
        this.setState({ interestTerm: calculatedInterest });
    
};

// "해지날짜" 변경을 처리하는 이벤트 핸들러를 다음과 같이 수정합니다.
handleRedeemDateChange = (e) => {
    // 입력한 "해지날짜"를 상태에 업데이트합니다.
    this.setState({
        juckCancelDate: e.target.value,
    }, () => {
        // "해지날짜"가 변경될 때 "이자 계산" 함수를 호출합니다.
        this.calculateInterest();
    });
};

payRequest = () =>{
    let input = {
        id : window.localStorage.getItem("id"),
        juckSignNo : window.localStorage.getItem("juckSignNo"),
        accountNum : this.state.accountNum,
        interestTerm : this.state.interestTerm,
        juckCancelDate : this.state.juckCancelDate,
        juckAmount : this.state.juckAmount
    }
    SavingsSignApi.payRequest(input)
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
                                ＊ 적금 해지 시 추가 본인확인 절차가 필요할 수 있으며, 해지 신청이 많아질 경우 추가 확인 절차에 시간이 소요될 수 있습니다. 양해 부탁드립니다.
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)', padding: '30px' }}>
                                - 추가 본인확인 방법: 휴대폰 SMS 인증 또는 2채널 인증 (해외 거주자의 경우 고객센터를 통한 유선 전화 확인 가능)
                                - 해지 전, 꼭 고객정보의 연락처를 확인해 주세요. (해외 거주자의 경우 "정보변경-해외정보"에서 해외 연락처를 등록하시면 해당 연락처로 연락드립니다.)
                                - 인터넷뱅킹을 통한 적금 해지 시, 해지 금액은 적금 신규 가입 시 사용한 출금 계좌(연결 계좌)로 입금됩니다.
                                - 연결된 계좌가 없는 경우, 해지 금액은 적금 개설 후 1개월 이상 지난 계좌로 입금됩니다.
                                - 입출식 계좌의 경우, 적금 개설 후 1개월 이상 경과하고 잔액이 100만원 이하인 적금(포함하여 MMDA 계좌)만 해지 가능합니다. 인터넷 해지가 불가한 경우, 가까운 영업점을 방문하여 해지할 수 있습니다.
                                </TableCell>
                            </TableRow>
                        </TableBody>

                    </Table>
                    <br />
                    <Typography style={typography}>
                        적금 해지정보입력
                    </Typography>
                    <Table style={tableStyle}>
                        <TableHead>
                            <TableRow>
                                <TableCell style={tableHead} colSpan={4}>
                                    적금 상품
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
                                        name="savingsProductName"
                                        disabled
                                        value={this.state.signs.juckName} />
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
                                   잔액
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
                                <TableCell style={tableHead}>
                                    해지날짜
                                </TableCell>
                                <TableCell style={{ textAlign: 'center', border: '1px solid rgb(230, 229, 227)' }}>
                                    <TextField
                                        required
                                        id="standard-required"
                                        variant="standard"
                                        type="date"
                                        name="payDate"
                                        style={{ width: '205px' }}
                                        onChange={this.handleRedeemDateChange} />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={tableHead} colSpan={4}>
                                    중도해지시
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={tableHead}>
                                    금리
                                </TableCell>
                                <TableCell style={{ textAlign: 'center', border: '1px solid rgb(230, 229, 227)' }}>
                                    <Input
                                        id="standard-required"
                                        endAdornment={<InputAdornment position="end">%</InputAdornment>}
                                        aria-describedby="standard-interestRate-helper-text"
                                        inputProps={{
                                            'aria-label': 'interestRate',
                                        }}
                                        value={this.state.signs.interestRate}
                                        disabled />
                                </TableCell>
                                <TableCell style={tableHead}>
                                    이자(원)
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
                                        value={this.state.interestTerm}
                                    />
                                </TableCell>
                            </TableRow>
                            </TableHead>
                            </Table>

                            <br /><br />

                             <Typography style={typography}>
                         입금계좌선택
                        </Typography>
                        <Table style={tableStyle}>
                        <TableHead>
                            <TableRow>
                                <TableCell style={tableHead}>
                                    입금계좌번호
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
                    <span style={{ color: "red", fontSize: '13px' }}>※ 적금 중도상환 정보를 확인 하였으며, 동의합니다. ※</span>
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
                        적금해지
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

export default juckEndDetail;