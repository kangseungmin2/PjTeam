import React, { Component } from "react";
import { Button, TextField , Typography, Table, TableHead, TableBody, TableRow, TableCell, Container} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Account from "../../api/account.js";


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
            accountNum:'',
            id:'',
            utilityType:'',
            utilityId:'',
            data:[],
            checked: false
        }
    }
    
    // componentDidMount() {
    //     this.setState({
    //         id : window.localStorage.getItem("id")
    //     });
    // }

    // onChange = (e) => {
    //     this.setState({
    //         [e.target.name]:e.target.value
    //     });
    // }

    // saveAccount = (e) => {
    //     e.preventDefault();
    //     let inputData = {
    //         accountNum: this.state.accountNum,
    //         id: this.state.id,
    //         accountPW: this.state.accountPW,
    //         accountLimit: this.state.accountLimit
    //     }
    //     ApiService.accountOpen(inputData)
    //         .then(res => {
    //             console.log('성공 :' , res.data);
    //             alert("계좌개설 성공~"); 
    //             this.props.history.push("/main");
    //         })
    //         .catch(err => {
    //             console.log('에러!!:'+err);
    //         })
    // }
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
                                    required
                                    id="standard-required"
                                    // variant="standard"
                                    label="id"
                                    type="text"
                                    name="id"
                                    disabled
                                    value={this.state.id}
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
                                    required
                                    id="standard-required"
                                    // variant="standard"
                                    label="id"
                                    type="text"
                                    name="id"
                                    disabled
                                    value={this.state.id}
                                    onChange={this.onChange} />
                                </TableCell>
                                <TableCell style={tableHead}>
                                    부과년월
                                </TableCell>
                                <TableCell style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)' }}>
                                <TextField
                                    required
                                    id="standard-required"
                                    // variant="standard"
                                    label="id"
                                    type="text"
                                    name="id"
                                    disabled
                                    value={this.state.id}
                                    onChange={this.onChange} />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={tableHead}>
                                    납기내 기한
                                </TableCell>
                                <TableCell style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)' }}>
                                <TextField
                                    required
                                    id="standard-required"
                                    // variant="standard"
                                    label="id"
                                    type="text"
                                    name="id"
                                    disabled
                                    value={this.state.id}
                                    onChange={this.onChange} />
                                </TableCell>
                                <TableCell style={tableHead}>
                                    납기내 금액
                                </TableCell>
                                <TableCell style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)' }}>
                                <TextField
                                    required
                                    id="standard-required"
                                    // variant="standard"
                                    label="id"
                                    type="text"
                                    name="id"
                                    disabled
                                    value={this.state.id}
                                    onChange={this.onChange} />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={tableHead}>
                                    납기후 기한
                                </TableCell>
                                <TableCell style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)' }}>
                                <TextField
                                    required
                                    id="standard-required"
                                    // variant="standard"
                                    label="id"
                                    type="text"
                                    name="id"
                                    disabled
                                    value={this.state.id}
                                    onChange={this.onChange} />
                                </TableCell>
                                <TableCell style={tableHead}>
                                    납기후 금액
                                </TableCell>
                                <TableCell style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)' }}>
                                <TextField
                                    required
                                    id="standard-required"
                                    // variant="standard"
                                    label="id"
                                    type="text"
                                    name="id"
                                    disabled
                                    value={this.state.id}
                                    onChange={this.onChange} />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={tableHead}>
                                    납부금액
                                </TableCell>
                                <TableCell colSpan={4} style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)' }}>
                                <TextField
                                    required
                                    id="standard-required"
                                    // variant="standard"
                                    label="id"
                                    type="text"
                                    name="id"
                                    disabled
                                    value={this.state.id}
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
                                    <select>
                                        {this.state.data.map((item) =>(
                                            <option key={item.accountNum} value={item.accountNum}>
                                                {name(item.accountType)} ({item.accountNum}) 
                                            </option>
                                        ))};
                                    </select>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell style={tableHead}>
                                    계좌비밀번호
                                </TableCell>
                                <TableCell colSpan={4} style={{  border: '1px solid rgb(230, 229, 227)' }}>
                                <TextField
                                    required
                                    id="standard-required"
                                    // variant="standard"
                                    label="password"
                                    type="password"
                                    name="password"
                                    disabled
                                    value={this.state.password}
                                    placeholder="Input password"
                                    onChange={this.onChange} />
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
                                    required
                                    id="standard-required"
                                    // variant="standard"
                                    label="phone"
                                    type="text"
                                    name="phone"
                                    disabled
                                    value={this.state.phone}
                                    placeholder="Input phone"
                                    onChange={this.onChange} />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <Button color="primary" variant="contained" onClick={this.passwordModify}>확인</Button>
                    <Button href="/allAccount" variant="outlined" color="primary">취소</Button>
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
                                    <br />
                                </TableCell>
                            </TableRow>
                        </TableBody>
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