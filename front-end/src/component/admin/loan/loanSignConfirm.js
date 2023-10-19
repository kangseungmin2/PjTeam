import React, { Component } from 'react';
import { Button, Typography, Container, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import LoanSignConfrimApi from "../../../api/loanSignConfirm";
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

class LoanSignConfirm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            signs: [],
            loanNum: '',
            loanPeriod: '',
            message: null,
            page: 0,
            rPage: 5
        }
    }

    // 라이프사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 렌더링
    componentDidMount() {
        this.loadLoanSignConfirmList();
    }

    // // list 정보
    loadLoanSignConfirmList = () => {
        LoanSignConfrimApi.fetchSignConfirms()
            .then((res) => {
                this.setState({
                    signs: res.data
                })
            })
            .catch(err => {
                console.log('loadLoanSignConfirmList() Error!!', err);
            })
    }

    // page
    handleChangePage = (event, newpage) => {
        this.setState({ page: newpage });
    }

    // rowPage
    handleChangeRowsPerPage = (event) => {
        this.setState({ rPage: parseInt(event.target.value, 10) });
        this.setState({ page: 0 }); // 페이지를 첫 페이지로 리셋
    }

    // 승인체크
    editSign = (num) => {
        // 승인 또는 반려 여부를 묻는 컨펌창
        const confirmMessage = `대출번호 ${num} 를 승인하시겠습니까?`;
        // 1건 select
        LoanSignConfrimApi.fetchDetailByNum(num)
            .then(res => {
                // let sign = res.data;
                this.setState({
                    loanNum: res.data.loanNum,
                    loanPeriod: res.data.loanPeriod,
                    loanAmount: res.data.loanAmount
                })
                let inputData = {
                    loanNum: res.data.loanNum,
                    loanPeriod: res.data.loanPeriod,
                    loanAmount: res.data.loanAmount
                }

                if (window.confirm(confirmMessage)) {
                    // 승인 작업 처리
                    LoanSignConfrimApi.editSignSuccess(inputData)
                        .then((response) => {
                            if (response.status === 200) {
                                console.log(`대출번호 ${num} 승인됨`);
                                this.loadLoanSignConfirmList();
                            }
                        })
                        .catch((error) => {
                            console.error(`대출번호 ${num} 승인 중 오류 발생:`, error);
                        });
                } else {
                    // 승인이 아니라면 반려로 처리
                    LoanSignConfrimApi.editSignFail(inputData)
                        .then((response) => {
                            if (response.status === 200) {
                                console.log(`대출번호 ${num} 반려됨`);
                                this.loadLoanSignConfirmList();
                            }
                        })
                        .catch((error) => {
                            console.error(`대출번호 ${num} 반려 중 오류 발생:`, error);
                        });
                }
                console.log('야야야ㅑ야야', res.data.loanNum, res.data.loanPeriod);
            })
            .catch(err => {
                console.log('fetchDetailByNum() Error!!', err);
            });


    }

    render() {
        const { page } = this.state;
        const { rPage } = this.state;


        return (

            <Container component="main" maxWidth="md">
                <PaidOutlinedIcon fontSize='large' color='primary' />
                <Typography variant="h4" style={style}> Sign Confirm </Typography>

                <TableContainer >

                    <Table md={{ minWidth: 900 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" width="50">No.</TableCell>
                                <TableCell align="center" width="80">회원</TableCell>
                                <TableCell align="center" width="350">상품명</TableCell>
                                <TableCell align="center" width="200">대출원금</TableCell>
                                <TableCell align="center" width="140">실행일</TableCell>
                                <TableCell align="center" width="140">만기일</TableCell>
                                <TableCell align="center" width="80">승인</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {this.state.signs.slice(page * rPage, page *
                                rPage + rPage).map((sign) => (
                                    <TableRow hover key={sign.loanNum}>
                                        <TableCell align='center'>{sign.loanNum}</TableCell>
                                        <TableCell align='center'>{sign.id}</TableCell>
                                        <TableCell align='center'>
                                            <MDBAccordion>
                                                <MDBAccordionItem collapseId={sign.loanNum} headerTitle={<>{sign.loanProductName}</>}>
                                                    <p>금리 : {sign.interestRate}%</p>
                                                    <p>상환방법 : {sign.repayment}</p>
                                                </MDBAccordionItem>
                                            </MDBAccordion>
                                        </TableCell>
                                        <TableCell align='center'>{sign.loanAmount}원</TableCell>
                                        <TableCell align='center'>
                                            {new Date(sign.loanExecution).toLocaleDateString(
                                                'en-US', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit'
                                            })}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {sign.loanExpiration ?
                                                new Date(sign.loanExpiration).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: '2-digit',
                                                    day: '2-digit'
                                                }) : ''}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {sign.loanState !== '신청' ? (
                                                <span>{sign.loanState}</span>
                                            ) : (
                                                <button className="btn" onClick={() => this.editSign(sign.loanNum)}>
                                                    <CheckOutlinedIcon color='error' />
                                                </button>
                                            )}
                                        </TableCell>

                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={this.state.signs.length}
                    rowsPerPage={rPage}
                    page={page}
                    onPageChange={this.handleChangePage}
                    onRowsPerPageChange={this.handleChangeRowsPerPage}
                />

            </Container>

        );
    }
}

const style = {
    display: 'flex',
    justifyContent: 'center'
}

const btn = {
    display: 'flex',
    justifyContent: 'left'
}



export default LoanSignConfirm;