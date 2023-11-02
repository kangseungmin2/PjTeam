import React, { Component } from "react";
import { TextField , Typography, Table, TableHead, TableBody, TableRow, TableCell} from '@mui/material';
import Account from "../../api/account.js";
import member from "../../api/member.js";

function Unix_timestamp(t) {
    const date = new Date(t); //date객체는 UTC로부터 지난시간을 밀리초로 나타내는 UNIX 타임스탬프를 담는다.(밀리초를 초로 변환하려면 *1000)
    //console.log(date) //2023-02-28T05:36:35.000Z 출력됨
    const year = date.getFullYear(); //년도 구하기
    const month = "0" + (date.getMonth() + 1);
    const day = "0" + date.getDate();
    return year + "-" + month.substr(-2) + "-" + day.substr(-2);
}

class openSuccess extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: '',
            accountNum:"",
            name:'',
            utilityType:'',
            accountLimit:'', 
            madeDate:0
        }
    }

    //개좌개설한 id 회원이름 불러오는 메서드
    componentDidMount() {
        this.accountInfo();
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
        
    }

    //전 화면에서 개설한 계좌정보
    accountInfo = (e) =>{
        Account.successAccount(window.localStorage.getItem("id"))
        .then(res=>{
            let account = res.data;
            this.setState({
                accountNum: account.accountNum,
                utilityType: account.utilityType,
                accountLimit: account.accountLimit,
                madeDate: account.madeDate,

            })
        })
    }

    nextButton = () => {
        this.props.history.push("/main");
    }

    render() {
        return (
            <div align='center'>
                <form>
                <br /><br />
                <br /><br />
                    <Typography variant="h4">
                        계좌 개설이 완료되었습니다.
                    </Typography>
                    <br /><br />
                    <Typography variant="h6" style={style}>개설정보</Typography>
                    <br />
                    
                    <Table style={tableStyle}>
                        <TableBody>
                            <TableRow>
                                <TableCell style={tableHead}>
                                    계좌명의
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
                                    onChange={(e)=>this.onChange(e)} />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={tableHead}>
                                    계좌번호
                                </TableCell>
                                <TableCell style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)' }} colSpan={3}>
                                입출금
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={tableHead}>
                                    계좌번호
                                </TableCell>
                                <TableCell colSpan={4} style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)'}}>
                                <TextField
                                    // required
                                    id="standard-required"
                                    // variant="standard"
                                    label="accountNum"
                                    type="text"
                                    name="accountNum"
                                    disabled
                                    value={this.state.accountNum}
                                    onChange={(e)=>this.onChange(e)} />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={tableHead}>
                                    계좌생성일
                                </TableCell>
                                <TableCell style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)' }}>{Unix_timestamp(this.state.madeDate)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={tableHead}>
                                    계좌상태
                                </TableCell>
                                <TableCell style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)' }} colSpan={3}> 
                                    정상
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={tableHead}>
                                    계좌한도
                                </TableCell>
                                <TableCell style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)' }} colSpan={3}>
                                <TextField
                                    // required
                                    id="accountLimit"
                                    // variant="standard"
                                    label="accountLimit"
                                    type="text"
                                    name="accountLimit"
                                    disabled
                                    value={(this.state.accountLimit)}
                                    onChange={(e)=>this.onChange(e)} />
                                </TableCell>
                            </TableRow>  
                        </TableBody>
                    </Table>

                    <Table>
                        <TableHead>
                            <TableRow style={style}>
                                <TableCell style={{ border: 'none' }}>
                                    <button type="button" className="btn btn-primary btn-block md-3" style={button} onClick={this.nextButton}>메인</button>
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

const button = {
    width: '130px',
    height: '40px',
    boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    borderRadius: '10px'
}



export default openSuccess;