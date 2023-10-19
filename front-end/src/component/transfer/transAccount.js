import React, { Component } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, TableFooter } from "@mui/material";
import API from '../../api/transferAuto';

export default class transAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            trAccountList: [],
            passwords : {}
        }
    }

    // 라이프사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 렌더링
    componentDidMount() {
        this.trAccountList();
    }

    trAccountList = () => {
        // const id = window.localStorage.getItem("id")
        const id = 'iu';
        API.trAccountList(id)
            .then(res => {
                console.log("여기이이잉!!",res.data)
                this.setState({
                    trAccountList: res.data // 이걸루 list에 값을 담을 수 있음!
                })
            })
            .catch(err => {
                console.log('tRAccountList() Error!!', err);
            })
    }


    // 계좌 비밀번호 4자리 맞는지 확인 
    handleChange = (e, accountNum) => {
        const inputValue = e.target.value;

        // input box에 password 4자리 숫자제한 걸기
        if (inputValue.length <= 4) {
            // 개별 비밀번호 상태를 업데이트
            this.setState(prevState => ({
                passwords: {
                    ...prevState.passwords,
                    [accountNum]: inputValue,
                }
            }));
        } else {
            alert('계좌에 비밀번호는 4자리 입니다.');
            // 해당 입력 필드 초기화
            this.setState(prevState => ({
                passwords: {
                    ...prevState.passwords,
                    [accountNum]: '',
                }
            }));
        }
    };

    // 입력한 비밀번호가 DB data랑 맞는지 비교후 상품 상세화면으로 전환
    clickBtn = (accountNum, accountPW, accountLimit, id, balance) => {
        const enteredPassword = this.state.passwords[accountNum];
        console.log("입력받은 : ", enteredPassword);
        console.log("저장된 : ", accountPW);

        if (enteredPassword == accountPW) {
            window.localStorage.removeItem("accountNum");
            window.localStorage.setItem('accountNum', accountNum);
            window.localStorage.setItem('accountLimit', accountLimit);
            window.localStorage.setItem('id', id);
            window.localStorage.setItem('accountPW', accountPW);
            window.localStorage.setItem('balance', balance);
            this.props.history.push('/oneTransfer');
        } else {
            alert('비밀번호가 일치하지 않습니다.');

            // 해당 입력 필드 초기화
            this.setState(prevState => ({
                passwords: {
                    ...prevState.passwords,
                    [accountNum]: '',
                }
            }));
        }
    };

    render() {

        return (

            <div align='center'>
                <Typography variant="h4">
                    계좌 선택
                </Typography>
                <form>
                    {this.state.trAccountList.map(list => (
                        <Table style={box} key={list.accountNum}>
                            <TableHead style={style}  >
                                <TableRow>
                                    <TableCell style={style2} colSpan={4}><span style={{ color: '#46B8FF' }}>{list.id}</span>  님의 계좌</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody style={tableBody}>

                                <TableRow style={style}>
                                    <span style={boxText}>
                                        <TableCell style={style3}>계좌번호 : </TableCell>
                                        <TableCell style={style4}>{list.accountNum}</TableCell>
                                    </span>
                                    <span style={boxText}>
                                        <TableCell style={style3}>계좌 개설일 : : </TableCell>
                                        <TableCell style={style4}>{new Date(list.madeDate).toLocaleDateString(
                                            'en-US', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit'
                                        })}
                                        </TableCell>
                                    </span>
                                </TableRow>
                                <TableRow style={style}>
                                    <span style={boxText}>
                                        <TableCell style={style3}>계좌잔액 : </TableCell>
                                        <TableCell style={style4}>{parseInt(list.balance).toLocaleString()}원</TableCell>
                                    </span>
                                    <span style={boxText}>
                                        <TableCell style={style3}>이체한도 :  </TableCell>
                                        <TableCell style={style4}>{list.accountLimit}</TableCell>
                                    </span>
                                </TableRow>
                            </TableBody>

                            <TableFooter>
                                <TableRow style={style}>
                                    <TableCell>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={this.state.passwords[list.accountNum] || ''} // 개별 비밀번호 상태 사용
                                            onChange={(e) => this.handleChange(e, list.accountNum)} // 특정 accountNum를 전달
                                            style={pwd}
                                            placeholder="계좌 비밀번호를 입력하세요."
                                        />
                                        <button type="button" className="btn btn-primary btn-block md-3" style={button} onClick={() => this.clickBtn(list.accountNum, list.accountPW, list.accountLimit, list.id, list.balance)}>확인</button>
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    ))}
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

const style3 = {
    fontSize: '20px',
    border: 'none'
}

const style4 = {
    fontSize: '20px',
    border: 'none',
    color: '#b0b0b0'
}

const box = {
    borderRadius: '50px 50px',
    boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.5)',
    width: '50vw',
    height: '20vw',
    margin: '100px 100px'
}

const boxText = {
    width: '450px',
    height: '50px',
    margin: '20px 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const pwd = {
    width: '300px',
    height: '40px',
    margin: '10px',
    fontSize: '15px',
    borderRadius: 0,
    border: 'none',
    textAlign: 'center'
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