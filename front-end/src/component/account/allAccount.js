import React, { Component } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, Container } from '@mui/material';
import Account from "../../api/account";
import LoanSignApi from "../../api/loanSign";
import ApiService from "../../ApiService";
import Saving from "../../api/savingSign";
import Deposit from "../../api/depositSign";

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
            signY: [],
            signJ: [],
            signs: [],
            accountList: [],
            message: null
            // page: 0,
            // rPage:5
        }
    }


    componentDidMount() {
        this.accountList();
    }

    accountList = () => {
        let id = window.localStorage.getItem("id");
        //입출금
        Account.accountList(id)
            .then(res => {
                console.log('입출금', res.data);
                this.setState({
                    accounts: res.data,
                })
            })
            .catch(err => {
                console.log('accountList Errror', err)
            });
        //예금
        Deposit.fetchSignConfirms(id)
            .then(res => {
                console.log('예금', res.data);
                this.setState({
                    signY: res.data,
                })
            })
            .catch(err => {
                console.log('fetchSignConfirms Errror', err)
            });
        //적금
        Saving.fetchSignConfirms(id)
        .then(res => {
            console.log('적금', res.data);
            this.setState({
                signJ: res.data,
            })

        })
        .catch(err => {
            console.log('fetchsavingssPL Errror', err)
        });
        //대출
        LoanSignApi.fetchSignConfirms(id)
        .then(res => {
            console.log('대출', res.data);
            this.setState({
                signs: res.data,
            })
        })
        .catch(err => {
            console.log('fetchSignConfirms Errror', err)
        });
        //펀드
        ApiService.fundAccountSelect(id)
        .then(res => {
            console.log('펀드', res.data);
            this.setState({
                accountList: res.data
            })

        })
        .catch(err => {
            console.log('fundAccountSelect() Error!!', err);
        });

    }

    render() {
        return (
            
            <Container maxWidth="md">
                <br/><br/>
                <Typography variant="h5" style={style}> <b>입출금</b> </Typography>
                <Table md={{ minWidth: 900 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center' style={{ color: 'navy' }}><b>예금명</b></TableCell>
                            <TableCell align='center' style={{ color: 'navy' }}><b>계좌번호</b></TableCell>
                            <TableCell align='center' style={{ color: 'navy' }}><b>계좌생성일</b></TableCell>
                            <TableCell align='center' style={{ color: 'navy' }}><b>잔액</b></TableCell>
                            <TableCell align='center' style={{ color: 'navy' }}><b>계좌상태</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.accounts.map(account =>
                            <TableRow key={account.accountNum}>
                                <TableCell component="th" scope="account">{name(account.accountType)}</TableCell>
                                <TableCell align='center'>{account.accountNum}</TableCell>
                                <TableCell align='center'>{Unix_timestamp(account.madeDate)}</TableCell>
                                <TableCell align='center'>{parseInt(account.balance).toLocaleString()}</TableCell>
                                <TableCell align='center'>{state(account.accountState)}</TableCell>
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.signY.map(deposits =>
                            <TableRow key={deposits.yeSignNo}>
                                <TableCell component="th" scope="account">{name('y')}</TableCell>
                                <TableCell align='center'>{deposits.depositAccountNum}</TableCell>
                                <TableCell align='center'>{Unix_timestamp(deposits.yeJoinDate)}</TableCell>
                                <TableCell align='center'>{parseInt(deposits.yeAmount).toLocaleString()}</TableCell>
                                <TableCell align='center'>정상</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                <br/><br/>
                <Typography variant="h5" style={style}> <b>적금</b> </Typography>
                <Table md={{ minWidth: 900 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center' style={{ color: 'navy' }}><b>예금명</b></TableCell>
                            <TableCell align='center' style={{ color: 'navy' }}><b>계좌번호</b></TableCell>
                            <TableCell align='center' style={{ color: 'navy' }}><b>계좌생성일</b></TableCell>
                            <TableCell align='center' style={{ color: 'navy' }}><b>잔액</b></TableCell>
                            <TableCell align='center' style={{ color: 'navy' }}><b>계좌상태</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.signJ.map(savings =>
                            <TableRow key={savings.juckSignNo}>
                                <TableCell component="th" scope="account">{name('j')}</TableCell>
                                <TableCell align='center'>{savings.savingsAccountNum}</TableCell>
                                <TableCell align='center'>{Unix_timestamp(savings.juckJoinDate)}</TableCell>
                                <TableCell align='center'>{parseInt(savings.juckBalance).toLocaleString()}</TableCell>
                                <TableCell align='center'>정상</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                <br/><br/>
                <Typography variant="h5" style={style}> <b>대출</b> </Typography>
                <Table md={{ minWidth: 900 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center' style={{ color: 'navy' }}><b>예금명</b></TableCell>
                            <TableCell align='center' style={{ color: 'navy' }}><b>계좌번호</b></TableCell>
                            <TableCell align='center' style={{ color: 'navy' }}><b>계좌생성일</b></TableCell>
                            <TableCell align='center' style={{ color: 'navy' }}><b>잔액</b></TableCell>
                            <TableCell align='center' style={{ color: 'navy' }}><b>계좌상태</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.signs.map(sign =>
                            <TableRow key={sign.loanNum}>
                                <TableCell component="th" scope="sign">{name('d')}</TableCell>
                                <TableCell align='center'>{sign.loanAccountNum}</TableCell>
                                <TableCell align='center'>{Unix_timestamp(sign.loanExecution)}</TableCell>
                                <TableCell align='center'>{parseInt(sign.loanAmount).toLocaleString}</TableCell>
                                <TableCell align='center'>{sign.loanState}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                <br/><br/>
                <Typography variant="h5" style={style}> <b>펀드</b> </Typography>
                <Table md={{ minWidth: 900 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center' style={{ color: 'navy' }}><b>예금명</b></TableCell>
                            <TableCell align='center' style={{ color: 'navy' }}><b>계좌번호</b></TableCell>
                            <TableCell align='center' style={{ color: 'navy' }}><b>계좌생성일</b></TableCell>
                            <TableCell align='center' style={{ color: 'navy' }}><b>잔액</b></TableCell>
                            <TableCell align='center' style={{ color: 'navy' }}><b>계좌상태</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.accountList.map(list =>
                            <TableRow key={list.fdAccount}>
                                <TableCell component="th" scope="account">{name('f')}</TableCell>
                                <TableCell align='center'>{list.fdAccount}</TableCell>
                                <TableCell align='center'>{Unix_timestamp(list.madeDate)}</TableCell>
                                <TableCell align='center'>{parseInt(list.balance).toLocaleString()}</TableCell>
                                <TableCell align='center'>정상</TableCell>                                        
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <br/><br/>
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