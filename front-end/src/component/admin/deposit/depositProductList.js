import React, { Component } from 'react';
import { Button, Typography, Container, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import ApiService from '../../../ApiService';
import { Create, Delete } from '@mui/icons-material'
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';


class depositProductList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            deposits: [
                {
                    yNo: 1, yName: "예금상품1", yRegistrationDate: "2023-10-09", interestRate: 3, ySummary: "상품설명",
                    yMinPrice: 500000, yMaxPrice: 50000000, yMinDate: 3, yMaxDate: 36
                },
                {
                    yNo: 2, yName: "예금상품2", yRegistrationDate: "2023-10-09", interestRate: 3, ySummary: "상품설명",
                    yMinPrice: 500000, yMaxPrice: 50000000, yMinDate: 3, yMaxDate: 36
                },
                {
                    yNo: 3, yName: "예금상품3", yRegistrationDate: "2023-10-09", interestRate: 3, ySummary: "상품설명",
                    yMinPrice: 500000, yMaxPrice: 50000000, yMinDate: 3, yMaxDate: 36
                },
                {
                    yNo: 4, yName: "예금상품4", yRegistrationDate: "2023-10-09", interestRate: 3, ySummary: "상품설명",
                    yMinPrice: 500000, yMaxPrice: 50000000, yMinDate: 3, yMaxDate: 36
                },
                {
                    yNo: 5, yName: "예금상품5", yRegistrationDate: "2023-10-09", interestRate: 3, ySummary: "상품설명",
                    yMinPrice: 500000, yMaxPrice: 50000000, yMinDate: 3, yMaxDate: 36
                },
                {
                    yNo: 6, yName: "예금상품6", yRegistrationDate: "2023-10-09", interestRate: 3, ySummary: "상품설명",
                    yMinPrice: 500000, yMaxPrice: 50000000, yMinDate: 3, yMaxDate: 36
                },
                {
                    yNo: 7, yName: "예금상품8", yRegistrationDate: "2023-10-09", interestRate: 3, ySummary: "상품설명",
                    yMinPrice: 500000, yMaxPrice: 50000000, yMinDate: 3, yMaxDate: 36
                },
                {
                    yNo: 8, yName: "예금상품9", yRegistrationDate: "2023-10-09", interestRate: 3, ySummary: "상품설명",
                    yMinPrice: 500000, yMaxPrice: 50000000, yMinDate: 3, yMaxDate: 36
                },
                {
                    yNo: 9, yName: "예금상품10", yRegistrationDate: "2023-10-09", interestRate: 3, ySummary: "상품설명",
                    yMinPrice: 500000, yMaxPrice: 50000000, yMinDate: 3, yMaxDate: 36 
                },
                {
                    yNo: 10, yName: "대출상품3", yRegistrationDate: "2023-10-09", interestRate: 3, ySummary: "상품설명",
                    yMinPrice: 500000, yMaxPrice: 50000000, yMinDate: 3, yMaxDate: 36 
                },
            ],
            message: null,
            page: 0,
            rPage: 5
        }
    }

    // 라이프사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 렌더링
    componentDidMount() {
        this.loadDepositProductList();
    }

    // list 정보
    loadDepositProductList = () => {
        console.log("음?", this.state)
        ApiService.fetchdeposits()
            .then(res => {
                this.setState({
                    deposits: res.data
                })
            })
            .catch(err => {
                console.log('loadDepositProductList() Error!!', err);
            })
        console.log(this.state.deposits)
    }

    // insert
    addDeposit = () => {
        window.localStorage.removeItem("DepositNum");
        this.props.history.push("/DepositProductAdd");
    }

    // update
    editDeposit = (yNo) => {
        window.localStorage.setItem("yNo", yNo);
        this.props.history.push("/DepositProductEdit")
    }

    // delete
    deleteDeposit = (yNo) => {
        ApiService.deleteDeposit(yNo)
            .then(res => {
                this.setState({
                    boards: this.state.deposits.filter(deposit => deposit.yNo !== yNo)
                });
                console.log('delete 성공 : ', res.data);
            })
            .catch(err => {
                console.log('deleteDeposit() Error!!', err);
            })
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
                <Typography variant="h4" style={style}> Deposit Product </Typography>

                <TableContainer >
                    <Button variant="contained" style={btn} color="primary" onClick={this.addDeposit}> Add Product </Button>
                    <Table md={{ minWidth: 900 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" width="100">No.</TableCell>
                                <TableCell align="center" width="400">상품명</TableCell>
                                <TableCell align="center" width="100">금리</TableCell>
                                <TableCell align="center" width="100">상품수정</TableCell>
                                <TableCell align="center" width="100">상품삭제</TableCell>
                                <TableCell align="center" width="150">등록일</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {this.state.deposits.slice(page * rPage, page * 
                            rPage + rPage).map((deposit) => (
                                <TableRow hover key={deposit.yNo}>
                                    <TableCell align='center'>{deposit.yNo}</TableCell>
                                    <TableCell align='center'>{deposit.yName}</TableCell>
                                    <TableCell align='center'>{deposit.interestRate}%</TableCell>
                                    <TableCell align='center'><button className="btn" onClick={() => this.editDeposit(deposit.yNo)}><Create /></button></TableCell>
                                    <TableCell align='center'><button className="btn" onClick={() => this.deleteDeposit(deposit.yNo)}><Delete /></button></TableCell>
                                    <TableCell align='center'> {new Date(deposit.yRegistrationDate).toLocaleDateString(
                                                'en-US', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit'
                                            })}
                                        </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </TableContainer>

                <TablePagination 
                rowsPerPageOptions={[5, 10, 25]} 
                component="div"
                count={this.state.deposits.length} 
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


export default depositProductList;