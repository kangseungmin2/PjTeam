import React, { Component } from "react";
import { Table, MenuItem, TableBody, TableRow, TableCell, Typography, TableFooter, Select } from "@mui/material";
import ApiService from "../../ApiService";

export default class lastFundAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            accountList : [],
            selectNum: 0,
            password: 0,
            rePassword: 0
        }
    }

    componentDidMount(){
        this.fAccountList();
    };

    fAccountList = () => {
        const id = window.localStorage.getItem('id')
        ApiService.fAccountList(id)
        .then(res => {
            console.log('fAccountList() res!!', res);
            this.setState({
                accountList: res.data
            })
        })
        .catch(err => {
            console.log('fAccountList() Error!!', err);
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // 비밀번호 숫자 초과시
    pwOnChange = (e) => {
        const name = e.target.name
        if (e.target.value.length > 4) {
            alert('계좌에 비밀번호는 4자리 입니다.');
            this.setState(prevState => ({
                ...prevState.name,
                [e.target.name]: ''
            }));
        }
        else {
            this.setState({
                [e.target.name] : e.target.value
            });
        }
    } 
    
    // insert시 비밀번호 체크
    insertAccount = () => {
        const data = {
            id : window.localStorage.getItem("id"),
            fdPw : this.state.password,
            accountNum : this.state.selectNum
        }

        if (this.state.password == this.state.rePassword) {
            ApiService.insertAccount(data)
            .then(res => {
                console.log('insertAccount() res!', res);
                alert("개좌개설이 완료되었습니다.")
                this.props.history.push("/main")
            })
            .catch(err => {
                console.log('insertAccount() Error!', err);
            })
        }
        else {
            alert("비밀번호가 일치하지 않습니다.")
        }
    }

    render() {
        return (
            <div align='center'>
                <Typography variant="h4">
                    펀드 계좌개설
                </Typography>

                <Typography style={typography}>
                    정보입력
                </Typography>

                <Table style={tableStyle}>
                    <TableBody style={tableBody}>
                        <TableRow>
                            <TableCell style={tableHead}>
                                계좌명
                            </TableCell>
                            <TableCell style={tableRow} colSpan={4}>
                                입출금 펀드계좌
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell style={tableHead}>
                                펀드유형 및 형태
                            </TableCell>
                            <TableCell style={tableRow}>
                                재간접 투자 / 개방형
                            </TableCell>
                            <TableCell style={tableHead}>
                                운용사
                            </TableCell>
                            <TableCell style={tableRow}>
                                우리은행
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <Table style={tableStyle}>
                    <TableBody style={tableBody}>
                        <TableRow>
                            <TableCell style={tableHead}>
                                신규계좌 비밀번호
                            </TableCell>
                            <TableCell style={tableRow}>
                                <input 
                                    type="password"
                                    name="password"
                                    value={this.state.password || ''}
                                    onChange={(e) => this.pwOnChange(e)}
                                />
                            </TableCell>

                            <TableCell style={tableHead}>
                                비밀번호 확인
                            </TableCell>
                            <TableCell style={tableRow}>
                                <input 
                                    type="password"
                                    name="rePassword"
                                    value={this.state.rePassword || ''}
                                    onChange={(e) => this.pwOnChange(e)}
                                />
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell style={tableHead} >
                                출금계좌
                            </TableCell>
                            <TableCell style={tableRow} colSpan={4}>
                                <Select
                                    name="selectNum"
                                    value={this.state.selectNum}
                                    onChange={this.onChange}
                                    style={{width : '500px', height : '30px'}}
                                >
                                 {this.state.accountList.map(num => (        
                                    <MenuItem value={num.accountNum}>{num.accountNum}</MenuItem>
                                 ))}
                                </Select>

                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <TableFooter>
                    <TableRow style={style}>
                        <TableCell style={{ border: 'none' }}>
                            <button type="button" className="btn btn-primary btn-block md-3" style={button} onClick={() => this.insertAccount()}>계좌개설</button>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </div>
        )
    }
}
const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const button = {
    width: '130px',
    height: '40px',
    boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    borderRadius: '10px'
}

const typography = {
    textAlign: 'left',
    fontSize: '20px',
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

const tableBody = {
    borderTop: '2px solid gray',
    borderBottom: '1px solid rgb(230, 229, 227)',
};

const tableRow = {
    border: '1px solid rgb(230, 229, 227)',
    textAlign: 'center'
};