import React, { Component } from 'react';
import { Typography, Container, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import LoanSignApi from "../../api/loanSign";
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';
import PaymentsIcon from '@mui/icons-material/Payments';

class Repayment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            signs: [],
            signLoanNums: [],
            repayments: [],
            repaymentLoanNums: [],
            dtoSum: [],
            id: window.localStorage.getItem("id"),
            loanNum: '',
            loanPeriod: '',
            paymentRound: '',
            repaymentAmount: '',
            interest: '',
            repaymentMonth: '',
            amountBalance: '',
            payDate: '',
            message: null,
            page: 0,
            rPage: 5
        }
    }

    componentDidMount() {
        // Spring Boot에서 SignDTO 데이터 가져오기
        const id = window.localStorage.getItem("id");
        LoanSignApi.fetchSigns(id)
            .then((res1) => {
                this.setState({
                    signs: res1.data,
                    signLoanNums: res1.data.map(sign => sign.loanNum)  // loanNum만 추출
                })
                console.log('signs!', res1.data);
                // Spring Boot에서 CalRepaymentDTO 데이터 가져오기
                LoanSignApi.fetchRepayments(id)
                    .then((res2) => {
                        this.setState({
                            repayments: res2.data,
                            repaymentLoanNums: res1.data.map(repayment => repayment.loanNum)
                        })
                        console.log('repayments!', res2.data);

                        // 두 데이터를 합쳐서 설정
                        const combinedData = [];
                        res1.data.forEach(sign => {
                            // 해당하는 repayments 찾기 (loanNum을 기준으로)
                            const relatedRepayments = res2.data.filter(repayment => repayment.loanNum === sign.loanNum);

                            // 만약 관련된 repayments를 찾았다면, 합쳐서 combinedData에 추가
                            if (relatedRepayments.length > 0) {
                                combinedData.push({
                                    loanNum: sign.loanNum,
                                    signData: sign,
                                    repaymentData: relatedRepayments,
                                    paymentRound: relatedRepayments.map(repayment => repayment.paymentRound),
                                    repaymentAmount: relatedRepayments.map(repayment => repayment.repaymentAmount),
                                    interest: relatedRepayments.map(repayment => repayment.interest),
                                    repaymentMonth: relatedRepayments.map(repayment => repayment.repaymentMonth),
                                    amountBalance: relatedRepayments.map(repayment => repayment.amountBalance),
                                    payDate: relatedRepayments.map(repayment => repayment.payDate)

                                });
                            }
                        });
                        this.setState({
                            dtoSum: combinedData
                        })
                        console.log('dto값 : ', this.state.dtoSum)

                    })
                    .catch(err => {
                        console.log('fetchRepayments() Error!!', err);
                    })

            })

            .catch(err => {
                console.log('loadSign() Error!!', err);
            })
    }

    // 1건 select
    selectLoan = (num) => {
        window.localStorage.setItem("LoanNum", num);
        this.props.history.push("/loanPay")
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

    render() {
        const { page } = this.state;
        const { rPage } = this.state;
        const { dtoSum } = this.state;

        return (
            <Container component="main" maxWidth="md">
                <PaidOutlinedIcon fontSize='large' color='primary' />
                <Typography variant="h4" style={style}> Repayment List </Typography>

                <TableContainer >

                    <Table md={{ minWidth: 900 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" width="150">계좌번호</TableCell>
                                <TableCell align="center" width="160">납입회차</TableCell>
                                <TableCell align="center" width="140">납입원금</TableCell>
                                <TableCell align="center" width="140">이자</TableCell>
                                <TableCell align="center" width="140">월상환금</TableCell>
                                <TableCell align="center" width="150">잔금</TableCell>
                                <TableCell align="center" width="100">납부</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {dtoSum.slice(page * rPage, page * rPage + rPage).map((repayment) => (
                                <TableRow hover key={repayment.loanNum} >
                                    <TableCell align='center'>
                                        <MDBAccordion>
                                            <MDBAccordionItem collapseId={repayment.signData.loanNum} headerTitle={<>{repayment.signData.loanAccountNum}</>}>
                                                <p>대출원금 : {repayment.signData.loanAmount}</p>
                                                <p>금리 : {repayment.signData.interestRate}%</p>
                                                <p>상환방법 : {repayment.signData.repayment}</p>
                                            </MDBAccordionItem>
                                        </MDBAccordion>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <MDBAccordion>
                                            <MDBAccordionItem collapseId={repayment.signData.loanNum} headerTitle={<>{repayment.paymentRound}회</>}>
                                                <p>최종납부일</p>
                                                <p>{repayment.payDate}</p>
                                            </MDBAccordionItem>
                                        </MDBAccordion>
                                    </TableCell>
                                    <TableCell align='center'>{repayment.repaymentAmount}원</TableCell>
                                    <TableCell align='center'>{repayment.interest}원</TableCell>
                                    <TableCell align='center'>{repayment.repaymentMonth}원</TableCell>
                                    <TableCell align='center'>{repayment.amountBalance}원</TableCell>
                                    <TableCell align='center'>
                                        {repayment.signData.loanState !== '해지' && <PaymentsIcon onClick={() => this.selectLoan(repayment.loanNum)} />}
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={this.state.dtoSum.length}
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

export default Repayment;