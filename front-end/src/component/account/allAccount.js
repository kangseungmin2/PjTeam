import React, { Component } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, Container } from '@mui/material';
import Account from "../../api/account";
import { Create, Delete } from "@mui/icons-material";

function Unix_timestamp(t) {
    const date = new Date(t); //date객체는 UTC로부터 지난시간을 밀리초로 나타내는 UNIX 타임스탬프를 담는다.(밀리초를 초로 변환하려면 *1000)
    //console.log(date) //2023-02-28T05:36:35.000Z 출력됨
    const year = date.getFullYear(); //년도 구하기
    const month = "0" + (date.getMonth() + 1);
    const day = "0" + date.getDate();
    return year + "-" + month.substr(-2) + "-" + day.substr(-2);
}
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

function state(t) {
    if (t === "j") {
        return "정상";
    }
    else if (t === "h") {
        return "휴면";
    }
    else if (t === "s") {
        return "해지";
    }
    else {
        return "정지";
    }

}


class eAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: [],
            accounts2: [],
            message: null
            // page: 0,
            // rPage:5
        }
    }


    componentDidMount() {
        this.accountList();
    }

    accountList = () => {
        console.log("여기요12")
        let id = window.localStorage.getItem("id");
        Account.accountList(id)
            .then(res => {
                console.log('data', res.data);
                this.setState({
                    accounts: res.data,
                })

            })
            .catch(err => {
                console.log('accountList Errror', err)
            });

        Account.accountList2(id)
            .then(res => {
                console.log('data', res.data);
                this.setState({
                    accounts2: res.data,
                })

            })
            .catch(err => {
                console.log('accountList Errror', err)
            });
    }


    passwordModify(accountnum) {
        window.localStorage.setItem("accountNum", accountnum);
        this.props.history.push("/passwordModify")
    }

    // delete
    deleteAccount = (accountNum) => {

        Account.deleteAccount(accountNum)
            .then(res => {
                this.setState({
                    accounts: this.state.accounts.filter(account => account.accountNum !== accountNum)
                });
                window.location.reload();
                console.log('delete 성공 : ', res.data);
                alert("delete 성공~");
            })
            .catch(err => {
                console.log('deleteAccount() Error! :', err);
            })
    }


    render() {
        return (
            <Container maxWidth="md">
                <Typography variant="h5" style={style}> <b>입출금</b> </Typography>
                <Table md={{ minWidth: 900 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center' style={{ color: 'navy' }}><b>예금명</b></TableCell>
                            <TableCell align='center' style={{ color: 'navy' }}><b>계좌번호</b></TableCell>
                            <TableCell align='center' style={{ color: 'navy' }}><b>계좌생성일</b></TableCell>
                            <TableCell align='center' style={{ color: 'navy' }}><b>잔액</b></TableCell>
                            <TableCell align='center' style={{ color: 'navy' }}><b>계좌상태</b></TableCell>
                            <TableCell align='center' style={{ color: 'navy' }}><b>비밀번호변경</b></TableCell>
                            <TableCell align='center' style={{ color: 'navy' }}><b>계좌해지</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.accounts.map(account =>
                            <TableRow key={account.accountNum}>
                                <TableCell component="th" scope="account">{name(account.accountType)}</TableCell>
                                <TableCell align='center'>{account.accountNum}</TableCell>
                                <TableCell align='center'>{Unix_timestamp(account.madeDate)}</TableCell>
                                <TableCell align='center'>{account.balance}</TableCell>
                                <TableCell align='center'>{state(account.accountState)}</TableCell>
                                <TableCell align='center' onClick={() => this.passwordModify(account.accountNum)}>
                                    <Create />
                                </TableCell>
                                <TableCell align='center' onClick={() => this.deleteAccount(account.accountNum)}>
                                    <Delete />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <br/><br/>
                <Typography variant="h5" style={style}> <b>예금</b> </Typography>
                <Table md={{ minWidth: 900 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center' style={{ color: 'navy' }}><b>예금명</b></TableCell>
                            <TableCell align='center' style={{ color: 'navy' }}><b>계좌번호</b></TableCell>
                            <TableCell align='center' style={{ color: 'navy' }}><b>계좌생성일</b></TableCell>
                            <TableCell align='center' style={{ color: 'navy' }}><b>잔액</b></TableCell>
                            <TableCell align='center' style={{ color: 'navy' }}><b>계좌상태</b></TableCell>
                            <TableCell align='center' style={{ color: 'navy' }}><b>비밀번호변경</b></TableCell>
                            <TableCell align='center' style={{ color: 'navy' }}><b>계좌해지</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.accounts2.map(account =>
                            <TableRow key={account.accountNum}>
                                <TableCell component="th" scope="account">{name(account.accountType)}</TableCell>
                                <TableCell align='center'>{account.accountNum}</TableCell>
                                <TableCell align='center'>{Unix_timestamp(account.madeDate)}</TableCell>
                                <TableCell align='center'>{account.balance}</TableCell>
                                <TableCell align='center'>{state(account.accountState)}</TableCell>
                                <TableCell align='center' onClick={() => this.passwordModify(account.accountNum)}>
                                    <Create />
                                </TableCell>
                                <TableCell align='center' onClick={() => this.deleteAccount(account.accountNum)}>
                                    <Delete />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Container>

        );
    }
}
const style = {
    display: 'flex',
    justifyContent: 'left',
    size: '10px'
}
export default eAccount;