import React, { Component, useState } from "react";
import { Button, IconButton,Table, TableHead, TableBody, TableRow, TableCell, Typography, Select, MenuItem, FormControl, Input,InputAdornment,TableFooter, Grid, Container, Tab, label } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import Checkbox from '@mui/material/Checkbox';
import Account from "../../api/account.js";
import loan from "../../api/loanSign.js"

function name(t) {
    if (t === "e") {
        return "입출금";
    }
    else if (t === "y") {
        return "예금";
    }
    else if (t === "j") {
        return "적금";
    }
    else if (t === "d") {
        return "대출";
    }
    else {
        return "펀드";
    }
}


class agree extends Component {

    constructor(props) {
        super(props);

        this.state = {
            checked: false,
            data: [],
            accountNum:'',
            accountPW: '불일치',
            accountPWD: '',         // 계좌 비번  


        }
    }

    componentDidMount() {
        this.useInsertionEffect();
    }

    useInsertionEffect = () => {
        let id = window.localStorage.getItem("id");
        Account.accountList(id)
            .then(res => {
                this.setState({
                    data: res.data
                })
            })
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

    pwCheck = (e) => {
        e.preventDefault();
        const id = window.localStorage.getItem("id")
        let inputData = {
            accountNum: this.state.accountNum,
            id: id
        }

        loan.pwCheck(inputData)
            .then((res) => {
                const accountPwD = res.data;
                this.setState({ accountPWD: accountPwD },()=>{
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
    chkChange = (e) => {
        this.setState({ checked: e.target.checked })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        },()=>{
        console.log(this.state.accountNum)
    });
    }

    nextButton = () => {
        if (this.state.checked) {
            console.log("여기")
            this.props.history.push("/delAccountSuccess");
        }
        else {
            alert("약관에 동의하세요.");
        }
    }

    render() {
        const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
        return (
            <div align='center'>
                <form>
                    <br />
                    <Typography variant="h4">
                        해지신청
                    </Typography>
                    <br /><br />
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
                                    (단, 인터넷 해지가 불가한 경우 영업점을 방문하여 해지해 주시기 바랍니다.)
                                    <br />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        
                    </Table>
                    <br />
                    <Typography style={typography}>
                        즉시해지정보입력
                    </Typography>
                    <Table style={tableStyle}>
                        <TableHead>
                            <TableRow>
                                <TableCell style={tableHead}>
                                    해지계좌번호
                                </TableCell>
                                <TableCell style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)' }}>
                                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '50ch' }}>
                                        <Select
                                            labelId="accountNum-label"
                                            id="accountNumInput"
                                            name="accountNum"
                                            value={this.state.accountNum}
                                            onChange={this.onChange}
                                        >
                                            {this.state.data.map((account) => (
                                                <MenuItem key={account.accountNum} value={account.accountNum}>
                                                    {name(account.accountType)} : {account.accountNum}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </TableCell>

                            </TableRow>
                            <TableRow>
                                <TableCell style={tableHead}>
                                    비밀번호
                                </TableCell>
                                <TableCell style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)' }}>
                                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '50ch' }}>
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
                                    </FormControl>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                    <Grid container spacing={2}>
                        <Button style={{ margin: '0 auto' }} color="primary" variant="outlined" onClick={this.pwCheck}>비밀번호 확인</Button>
                    </Grid>
                    <br /><br/>

                    {/* <Table style={tableStyle}>
                        <TableHead>
                            <TableRow>
                                <TableCell style={tableHead}>
                                    해지구분
                                </TableCell>
                                <TableCell style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)' }}>
                                    해지불가
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell style={tableHead}>
                                    해지불가사유
                                </TableCell>
                                <TableCell style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)' }}>
                                    휴일거래는 불가능합니다.
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table> */}


                    <Typography style={typography}>
                        알아두세요!
                    </Typography>
                    <Table style={{ width: '53vw' }}>
                        <TableHead style={style}  >
                            <TableRow>
                                <TableCell style={style} colSpan={4}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={tableBody}>
                            <TableRow>
                                <TableCell style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)', padding: '30px' }}>
                                    - 예,적금을 중도해지하시면 가입당시 고시한 약정금리가 아닌 저금리의 각 상품별 중도해지 이율이 적용됩니다.<br />
                                    - 예금담보대출 : 예/적금 가입금액의 95% 까지 인터넷뱅킹으로 즉시 대출금을 입금하여 드립니다.
                                    -만기 앞당김 해지 안내(영업점 신규분, 인터넷 신규분 모두 해당)
                                    <br />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <div>

                        <span style={{ color: "red", fontSize: '14px' }}>※ 필수</span> <span style={{ color: "black", fontSize: '13px' }}>모든 이용약관을 확인 하였으며, 이의 동의합니다.</span>
                        <Checkbox
                            {...label}
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                            checked={this.state.checked}
                            onChange={this.chkChange}
                        />
                    </div>
                    <Table>
                        <TableHead>
                            <TableRow style={style}>
                                <TableCell style={{ border: 'none' }}>
                                    <button type="button" className="btn btn-primary btn-block md-3" style={button} onClick={this.nextButton}>확인</button>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>

                    <br /><br />
                    <br />
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

const style2 = {
    fontSize: '30px',
    border: 'none'
}

const box = {
    borderRadius: '10px 10px',
    boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.2)',
    width: '50vw',
    height: '20vw',
    margin: '30px 30px',
    border: 'none'
}

const boxText = {
    width: '450px',
    margin: '0px 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none'
}

const boxText2 = {
    width: '450px',
    margin: '0px 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none'
}

const button = {
    width: '130px',
    height: '40px',
    boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    borderRadius: '10px'
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

export default agree;