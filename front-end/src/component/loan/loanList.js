import React, { Component } from 'react';
import { Typography, Container, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import ApiService from '../../ApiService';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import FindInPageRoundedIcon from '@mui/icons-material/FindInPageRounded';


class LoanList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loans: [
                {
                    num: 1, loanProductName: "대출상품1", loanProductRegistrationDate: "2023-10-09", interestRate: 3, content: "상품설명",
                    minMoney: 500000, maxMoney: 50000000, minPeriod: 3, maxPeriod: 36, repayment: "만기일시상환", commission: 0
                },
                {
                    num: 2, loanProductName: "대출상품2", loanProductRegistrationDate: "2023-10-09", interestRate: 3, content: "상품설명",
                    minMoney: 500000, maxMoney: 50000000, minPeriod: 3, maxPeriod: 36, repayment: "원리금균등상환", commission: 0
                },
                {
                    num: 3, loanProductName: "대출상품3", loanProductRegistrationDate: "2023-10-09", interestRate: 3, content: "상품설명",
                    minMoney: 500000, maxMoney: 50000000, minPeriod: 3, maxPeriod: 36, repayment: "원금균등상환", commission: 0
                },
                {
                    num: 4, loanProductName: "대출상품3", loanProductRegistrationDate: "2023-10-09", interestRate: 3, content: "상품설명",
                    minMoney: 500000, maxMoney: 50000000, minPeriod: 3, maxPeriod: 36, repayment: "원금균등상환", commission: 0
                },
                {
                    num: 5, loanProductName: "대출상품3", loanProductRegistrationDate: "2023-10-09", interestRate: 3, content: "상품설명",
                    minMoney: 500000, maxMoney: 50000000, minPeriod: 3, maxPeriod: 36, repayment: "원금균등상환", commission: 0
                },
                {
                    num: 6, loanProductName: "대출상품3", loanProductRegistrationDate: "2023-10-09", interestRate: 3, content: "상품설명",
                    minMoney: 500000, maxMoney: 50000000, minPeriod: 3, maxPeriod: 36, repayment: "원금균등상환", commission: 0
                },
                {
                    num: 7, loanProductName: "대출상품3", loanProductRegistrationDate: "2023-10-09", interestRate: 3, content: "상품설명",
                    minMoney: 500000, maxMoney: 50000000, minPeriod: 3, maxPeriod: 36, repayment: "원금균등상환", commission: 0
                },
                {
                    num: 8, loanProductName: "대출상품3", loanProductRegistrationDate: "2023-10-09", interestRate: 3, content: "상품설명",
                    minMoney: 500000, maxMoney: 50000000, minPeriod: 3, maxPeriod: 36, repayment: "원금균등상환", commission: 0
                },
                {
                    num: 9, loanProductName: "대출상품3", loanProductRegistrationDate: "2023-10-09", interestRate: 3, content: "상품설명",
                    minMoney: 500000, maxMoney: 50000000, minPeriod: 3, maxPeriod: 36, repayment: "원금균등상환", commission: 0
                },
                {
                    num: 10, loanProductName: "대출상품3", loanProductRegistrationDate: "2023-10-09", interestRate: 3, content: "상품설명",
                    minMoney: 500000, maxMoney: 50000000, minPeriod: 3, maxPeriod: 36, repayment: "원금균등상환", commission: 0
                },
            ],
            message: null,
            page: 0,
            rPage: 5
        }
    }

    // 라이프사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 렌더링
    componentDidMount() {
        this.loadLoanProductList();
    }

    // list 정보
    loadLoanProductList = () => {
        console.log("음?", this.state)
        ApiService.fetchLoansPL()
            .then(res => {
                this.setState({
                    loans: res.data
                })
            })
            .catch(err => {
                console.log('loadLoanProductList() Error!!', err);
            })
        console.log(this.state.loans)
    }

    // 1건 select
    selectLoan = (num) => {
        window.localStorage.setItem("LoanNum", num);
        this.props.history.push("/loanDetail")
    }

    // sign
    signLoan = (num) => {
        window.localStorage.setItem("LoanNum", num);
        this.props.history.push("/loanSign")
    }
    

    // page
    handleChangePage = (event,newpage) => { 
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
        

        return (

            <Container component="main" maxWidth="md">

                <PaidOutlinedIcon fontSize='large' color='primary' />
                <Typography variant="h4" style={style}> Loan Product </Typography>

                <TableContainer >
                    <Table md={{ minWidth: 900 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" width="50">No.</TableCell>
                                <TableCell align="center" width="200">상품명</TableCell>
                                <TableCell align="center" width="380">상품설명</TableCell>
                                <TableCell align="center" width="70">금리</TableCell>
                                <TableCell align="center" width="100">상세보기</TableCell>
                                <TableCell align="center" width="100">가입하기</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {this.state.loans.slice(page * rPage, page * 
                            rPage + rPage).map((loan) => (
                                <TableRow hover key={loan.num}>
                                    <TableCell align='center'>{loan.num}</TableCell>
                                    <TableCell align='center'>{loan.loanProductName}</TableCell>
                                    <TableCell align='center'>{loan.content}</TableCell>
                                    <TableCell align='center'>{loan.interestRate}%</TableCell>
                                    <TableCell align='center'>
                                        <FindInPageRoundedIcon fontSize='large' color='primary' onClick={() => this.selectLoan(loan.num)}/>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <EditNoteOutlinedIcon fontSize='large' onClick={() => this.signLoan(loan.num)}/>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </TableContainer>

                <TablePagination 
                rowsPerPageOptions={[5, 10, 25]} 
                component="div"
                count={this.state.loans.length} 
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



export default LoanList;