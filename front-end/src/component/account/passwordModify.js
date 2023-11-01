import React, { Component } from "react";
import { TextField , Container, Button, IconButton,Table, TableHead, TableRow, TableCell, Typography, Select, MenuItem, FormControl, Input,InputAdornment, Grid } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Account from "../../api/account";
import loan from "../../api/loanSign.js";

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


class passwordModify extends Component{
    constructor(props){
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
        this.props.history.push("/pwModifySuccess");

    }


    
    render() {
        const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
        return(
        <div align='center'>
            <form>
                <br />
                <Typography variant="h4">
                    비밀번호 변경
                </Typography>
                <br /><br />
                <Table style={{ width: '53vw' }}>
                    <TableHead style={{ width: '53vw' }}>
                        <TableRow>
                            <TableCell style={style} colSpan={4}></TableCell>
                        </TableRow>
                    </TableHead>
                    
                </Table>
                <br />
                <Typography style={typography}>
                   비밀번호 인증
                </Typography>
                <Table style={tableStyle}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={tableHead}>
                                계좌번호 선택
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
                <Typography style={typography}>
                    수정
                </Typography>
                <Table style={tableStyle}>
                        <TableRow>
                            <TableCell style={tableHead}>
                                계좌번호
                            </TableCell>
                            <TableCell style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)' }}>
                                <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '50ch' }}>
                                <TextField
                                    required
                                    id="standard-required"
                                    variant="standard"
                                    label="accountNum"
                                    type="text"
                                    name="accountNum"
                                    value={this.state.accountNum}
                                    disabled     
                                />
                                </FormControl>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={tableHead}>
                                id
                            </TableCell>
                            <TableCell style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)' }}>
                                <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '50ch' }}>
                                <TextField
                                    required
                                    id="standard-required"
                                    variant="standard"
                                    label="id"
                                    type="text"
                                    name="id"
                                    value={this.state.id}
                                    disabled
                                />
                                </FormControl>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={tableHead}>
                                비밀번호
                            </TableCell>
                            <TableCell style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)' }}>
                                <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '50ch' }}>
                                <TextField
                                    required
                                    id="standard-required"
                                    variant="standard"
                                    label="accountPW"
                                    type="password"
                                    name="accountPW"
                                    value={this.state.accountPW}
                                    placeholder="Input accountPW"
                                    onChange={this.onChange}
                                />
                                </FormControl>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={tableHead}>
                                계좌한도
                            </TableCell>
                            <TableCell style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)' }}>
                                <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '50ch' }}>
                                <TextField
                                    required
                                    id="standard-required"
                                    variant="standard"
                                    label="accountLimit"
                                    type="text"
                                    name="accountLimit"
                                    value={this.state.accountLimit}
                                    disabled
                                />
                                </FormControl>
                            </TableCell>
                        </TableRow>
                </Table>
                <Container component="main" maxWidth="md">            
                    <Button color="primary" variant="outlined" onClick={this.nextButton}>edit</Button>
                    <Button href="/allAccount" variant="contained" color="primary">back</Button>
            </Container> 
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

const tableStyle = {
    width: '50vw',
    marginBottom: '30px'
};

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

const tableHead = {
    border: '1px solid rgb(230, 229, 227)',
    textAlign: 'center',
    fontWeight: '700',
    backgroundColor: 'rgba(135, 206, 235, 0.2)'
};

export default passwordModify;