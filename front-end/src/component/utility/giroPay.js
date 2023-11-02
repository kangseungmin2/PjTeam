import React, { Component } from "react";
import { Button, TextField , Typography, Table, TableHead, TableBody, TableRow, TableCell, Grid, FormControl, Select, MenuItem, Input,InputAdornment,IconButton} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import utility from "../../api/utility.js";
import member from "../../api/member.js";
import loanSign from "../../api/loanSign.js";
import Account from "../../api/account.js";
import Checkbox from '@mui/material/Checkbox';

function Unix_timestamp(t) {
    const date = new Date(t); //date객체는 UTC로부터 지난시간을 밀리초로 나타내는 UNIX 타임스탬프를 담는다.(밀리초를 초로 변환하려면 *1000)
    //console.log(date) //2023-02-28T05:36:35.000Z 출력됨
    const year = date.getFullYear(); //년도 구하기
    const month = "0" + (date.getMonth() + 1);
    const day = "0" + date.getDate();
    return year + "-" + month.substr(-2) + "-" + day.substr(-2);
}

function name(t){
    if(t === "e"){
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

class giroPay extends Component{
    constructor(props){
        super(props);
        this.state ={
            data:[],
            utilAccount:[],
            accountNum:0,
            id:'',
            name:'',
            utilityType:'',
            utilityId:'',
            transactionDate :'',
            notificationDate:'',
            amount:'',              // 여기까지가 utilities table 
            accountPW: '불일치',     
            accountPWD: '',         // 계좌 비번  
            checked: false,
            UtilTransactionDTO : {  // 계좌이체 table
                utNum:0,
                accountNum:0,
                utilityId:'',
                utilityType:'a', 
                utAmount:0,
            },
            errorMessage : '',
            checked: false,
            isButtonDisabled: true
        };
    };

    componentDidMount() {
        this.utilityInfo();
        member.memberInfo(window.localStorage.getItem("id"))
        .then(res => {
            let join = res.data;
            console.log('data', res.data);
            this.setState({
                name: join.name
            })
        })
        .catch(err =>{
            console.log('에러',err)
        })
        this.useInsertionEffect();
        
    }

    // 로그인한 회원의 입출금 계좌정보를 list로 불러온다.
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

    // 계좌번호와 id를 넘겨 비밀번호를 받아오고 비밀번호가 일치하면 버튼 활성화
    pwCheck = (e) => {
        e.preventDefault();
        const id = window.localStorage.getItem("id")
        let inputData = {
            accountNum: this.state.accountNum,
            id: id
        }
        loanSign.pwCheck(inputData)
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
    // 약관동의 체크박스 체크확인
    onCheckboxChange = () => {
        this.setState({ checked: !this.state.checked });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
       },()=>{
        this.setState({
            UtilTransactionDTO : {
                [e.target.name]: e.target.value,
                utilityId: this.state.utilityId,
                utAmount: this.state.amount,
                utilityType : 'a',
                accountNum : this.state.accountNum,
                id : window.localStorage.getItem('id')
            }
        })
       })
    }

    pwChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
       })
    }
    
    //불러올 공과금납부정보
    utilityInfo = (e) =>{
        utility.utilityInfo(window.localStorage.getItem("utilityId"))
            .then(res =>{
                let utility = res.data;
                this.setState({
                    utilityType : utility.utilityType,
                    utilityId : utility.utilityId,
                    amount : utility.amount,
                    transactionDate : utility.transactionDate,
                    notificationDate : utility.notificationDate
                })
            })
    }

    // x
    utilTransfer = () => {
        // 이체 메서드 진행

        utility.utilTransfer(this.state.UtilTransactionDTO)
            .then(response => {
                console.log(response);
                if (response.data.success) {
                    // 성공적인 응답 처리
                    console.log(response);
                    alert(response.data.message);
                    window.location.reload();
                  } else {
                    // 오류 메시지 처리
                    alert(response.data.message);
                    window.location.reload();
                  }
            });
            // .catch(response => {
            //     console.log('API Error:', response);
            //     alert(response.data.message);
            //     window.location.reload();
            // });
    };

    //즉시 이체
    saveUtil = (e) => {
        e.preventDefault();
        utility.utilTransfer(this.state.UtilTransactionDTO)
            .then(res => {
                console.log('성공 :' , res.data);
                this.props.history.push("/paySuccess");
            })
            .catch(err => {
                console.log('에러!!:'+err);
            })
    }
    chkChange = (e) => {
        this.setState({ checked: e.target.checked })
    }


    render(){
        return(
            <div align="center">
                    <Typography variant="h4">
                        지로/생활요금/기타 납부
                    </Typography>
                    <br/><br/>
                    <Table style={tableStyle}>
                        <TableHead>
                            <TableRow>
                                <TableCell style={tableHead}>
                                    납부의무자명(사업장명)
                                </TableCell>
                                <TableCell colSpan={4} style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)'}}>
                                <TextField
                                    // required
                                    id="standard-required"
                                    // variant="standard"
                                    label="name"
                                    type="text"
                                    name="name"
                                    disabled
                                    value={this.state.name}
                                    onChange={this.onChange} />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell style={tableHead}>
                                    전자납부번호
                                </TableCell>
                                <TableCell style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)' }}>
                                <TextField
                                    // required
                                    id="standard-required"
                                    // variant="standard"
                                    label="utilityId"
                                    type="text"
                                    name="utilityId"
                                    disabled
                                    value={this.state.utilityId}
                                    onChange={this.onChange} />
                                </TableCell>
                                <TableCell style={tableHead}>
                                    부과년월
                                </TableCell>
                                <TableCell style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)' }}>
                                <TextField
                                    // required
                                    id="standard-required"
                                    // variant="standard"
                                    label="transactionDate"
                                    type="text"
                                    name="transactionDate"
                                    disabled
                                    value={Unix_timestamp(this.state.transactionDate)}
                                    onChange={this.onChange} />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={tableHead}>
                                    납기내 기한
                                </TableCell>
                                <TableCell style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)' }}>
                                <TextField
                                    // required
                                    id="standard-required"
                                    // variant="standard"
                                    label="notificationDate"
                                    type="text"
                                    name="notificationDate"
                                    disabled
                                    value={Unix_timestamp(this.state.notificationDate)}
                                    onChange={this.onChange} />
                                </TableCell>
                                <TableCell style={tableHead}>
                                    납기내 금액
                                </TableCell>
                                <TableCell style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)' }}>
                                <TextField
                                    // required
                                    id="standard-required"
                                    // variant="standard"
                                    label="amount"
                                    type="text"
                                    name="amount"
                                    disabled
                                    value={this.state.amount}
                                    onChange={this.onChange} />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={tableHead}>
                                    납기후 기한
                                </TableCell>
                                <TableCell style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)' }}>
                                <TextField
                                    // required
                                    id="standard-required"
                                    // variant="standard"
                                    label="notificationDate"
                                    type="text"
                                    name="notificationDate"
                                    disabled
                                    value={Unix_timestamp(this.state.notificationDate)}
                                    onChange={this.onChange} />
                                </TableCell>
                                <TableCell style={tableHead}>
                                    납기후 금액
                                </TableCell>
                                <TableCell style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)' }}>
                                <TextField
                                    // required
                                    id="standard-required"
                                    // variant="standard"
                                    label="amount"
                                    type="text"
                                    name="amount"
                                    disabled
                                    value={this.state.amount}
                                    onChange={this.onChange} />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={tableHead}>
                                    납부금액
                                </TableCell>
                                <TableCell colSpan={4} style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)' }}>
                                <TextField
                                    // required
                                    id="standard-required"
                                    // variant="standard"
                                    label="amount"
                                    type="text"
                                    name="amount"
                                    disabled
                                    value={this.state.amount}
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
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell style={tableHead}>
                                    계좌비밀번호
                                </TableCell>
                                <TableCell style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)' }}>
                                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '50ch' }}>
                                        <Input
                                            required
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
                                            placeholder="Input accountPW"
                                            onChange={this.pwChange}
                                        />
                                        <br/>
                                        <Grid container spacing={1}>
                                            <Button style={{ margin: '0 auto' }} color="primary" variant="outlined" onClick={this.pwCheck}>비밀번호 확인</Button>
                                        </Grid>
                                    </FormControl>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow>
                                <TableCell style={tableHead}>
                                    연락전화번호
                                </TableCell>
                                <TableCell colSpan={4} style={{ border: '1px solid rgb(230, 229, 227)' }}>
                                <TextField
                                    id="standard-required"
                                    // variant="standard"
                                    label="phone"
                                    type="text"
                                    name="phone"
                                    // disabled
                                    value={this.state.phone}
                                    placeholder="Input phone"
                                    onChange={this.onChange} />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <br />
                    <span style={{ color: "red", fontSize: '13px' }}>※ 납입 정보를 확인 하였으며, 동의합니다. ※</span>
                        <Checkbox
                            inputProps={{ 'aria-label': 'Checkbox demo' }}
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                            checked={this.state.checked}
                            onChange={this.onCheckboxChange}
                        />
                    <br /><br />
                    <button onClick={this.saveUtil} type="button" className="btn btn-primary btn-block mb-4" style={{color : "primary", border : 'none', width : '20vw'}} disabled={!this.state.checked || this.state.isButtonDisabled}>
                        즉시이체</button>
                        <br/>
                    <button onClick type="button" className="btn btn-primary btn-block mb-4" style={{color : "primary", border : 'none', width : '20vw'}}>
                    자동이체 신청</button>
                    <br/>
                    <Button href="/payChk" variant="outlined" color="primary">취소</Button>
                    <br/>

                    <Typography style={typography}>
                        알아두세요!
                    </Typography>
                    <Table style={{width:'53vw'}}>
                        <TableHead style={style}  >
                            <TableRow>
                                <TableCell style={style} colSpan={4}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={tableBody}>
                            <TableRow>
                                <TableCell style={{ textAlign: 'left', padding:'30px'}}>
                                    - 고지내용에 관한 사항은 국민건강보험공단에 문의하시기 바랍니다. <br/>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        <br /><br />
                    </Table>
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
    marginBottom: '70px'
};

const tableHead = {
    border: '1px solid rgb(230, 229, 227)',
    textAlign: 'center',
    fontWeight: '700',
    backgroundColor: 'rgba(135, 206, 235, 0.2)'
};
export default giroPay;