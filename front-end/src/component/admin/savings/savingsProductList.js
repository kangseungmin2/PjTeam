import React, { Component } from 'react';
import { Button, Typography, Container, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import ApiService from '../../../ApiService';
import { Create, Delete } from '@mui/icons-material'
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';


class savingsProductList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            savingss: [
                {
                    jNo: 1, jName: "적금상품1", jRegistrationDate: "2023-10-09", interestRate: 3, jSummary: "상품설명",
                    jType: "자동납부", jMinPrice: 500000, jMaxPrice: 50000000, jMinDate: 3, jMaxDate: 36
                },
                {
                    jNo: 2, jName: "적금상품2", jRegistrationDate: "2023-10-09", interestRate: 3, jSummary: "상품설명",
                    jType: "자동납부", jMinPrice: 500000, jMaxPrice: 50000000, jMinDate: 3, jMaxDate: 36
                },
                {
                    jNo: 3, jName: "적금상품3", jRegistrationDate: "2023-10-09", interestRate: 3, jSummary: "상품설명",
                    jType: "자동납부", jMinPrice: 500000, jMaxPrice: 50000000, jMinDate: 3, jMaxDate: 36
                },
                {
                    jNo: 4, jName: "적금상품4", jRegistrationDate: "2023-10-09", interestRate: 3, jSummary: "상품설명",
                    jType: "자동납부", jMinPrice: 500000, jMaxPrice: 50000000, jMinDate: 3, jMaxDate: 36
                },
                {
                    jNo: 5, jName: "적금상품5", jRegistrationDate: "2023-10-09", interestRate: 3, jSummary: "상품설명",
                    jType: "자동납부", jMinPrice: 500000, jMaxPrice: 50000000, jMinDate: 3, jMaxDate: 36
                },
                {
                    jNo: 6, jName: "적금상품6", jRegistrationDate: "2023-10-09", interestRate: 3, jSummary: "상품설명",
                    jType: "자동납부", jMinPrice: 500000, jMaxPrice: 50000000, jMinDate: 3, jMaxDate: 36
                },
                {
                    jNo: 7, jName: "적금상품8", jRegistrationDate: "2023-10-09", interestRate: 3, jSummary: "상품설명",
                    jType: "자동납부", jMinPrice: 500000, jMaxPrice: 50000000, jMinDate: 3, jMaxDate: 36
                },
                {
                    jNo: 8, jName: "적금상품9", jRegistrationDate: "2023-10-09", interestRate: 3, jSummary: "상품설명",
                    jType: "자동납부", jMinPrice: 500000, jMaxPrice: 50000000, jMinDate: 3, jMaxDate: 36
                },
                {
                    jNo: 9, jName: "적금상품10", jRegistrationDate: "2023-10-09", interestRate: 3, jSummary: "상품설명",
                    jType: "자동납부", jMinPrice: 500000, jMaxPrice: 50000000, jMinDate: 3, jMaxDate: 36 
                },
                {
                    jNo: 10, jName: "적출상품3", jRegistrationDate: "2023-10-09", interestRate: 3, jSummary: "상품설명",
                    jType: "자동납부", jMinPrice: 500000, jMaxPrice: 50000000, jMinDate: 3, jMaxDate: 36 
                },
            ],
            message: null,
            page: 0,
            rPage: 5
        }
    }

    // 라이프사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 렌더링
    componentDidMount() {
        this.loadsavingsProductList();
    }

    // list 정보
    loadsavingsProductList = () => {
        console.log("음?", this.state)
        ApiService.fetchsavingss()
            .then(res => {
                this.setState({
                    savingss: res.data
                })
            })
            .catch(err => {
                console.log('loadsavingsProductList() Error!!', err);
            })
        console.log(this.state.savingss)
    }

    // insert
    addSavings = () => {
        window.localStorage.removeItem("SavingsNum");
        this.props.history.push("/SavingsProductAdd");
    }

    // update
    editSavings = (jNo) => {
        window.localStorage.setItem("jNo", jNo);
        this.props.history.push("/SavingsProductEdit")
    }

    // delete
    deleteSavings = (jNo) => {
        ApiService.deleteSavings(jNo)
            .then(res => {
                this.setState({
                    boards: this.state.savingss.filter(savings => savings.jNo !== jNo)
                });
                console.log('delete 성공 : ', res.data);
            })
            .catch(err => {
                console.log('deleteSavings() Error!!', err);
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
                <Typography variant="h4" style={style}> Savings Product </Typography>

                <TableContainer >
                    <Button variant="contained" style={btn} color="primary" onClick={this.addLoan}> Add Product </Button>
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
                            {this.state.savingss.slice(page * rPage, page * 
                            rPage + rPage).map((savings) => (
                                <TableRow hover key={savings.yNo}>
                                    <TableCell align='center'>{savings.jNo}</TableCell>
                                    <TableCell align='center'>{savings.jName}</TableCell>
                                    <TableCell align='center'>{savings.interestRate}%</TableCell>
                                    <TableCell align='center'><button className="btn" onClick={() => this.editSavings(savings.jNo)}><Create /></button></TableCell>
                                    <TableCell align='center'><button className="btn" onClick={() => this.deleteSavings(savings.jNo)}><Delete /></button></TableCell>
                                    <TableCell align='center'>{new Date(savings.jRegistrationDate).toLocaleDateString(
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
                count={this.state.savingss.length} 
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


export default savingsProductList;