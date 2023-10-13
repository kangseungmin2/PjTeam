import React, { Component } from 'react';
import { Typography, Container, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import ApiService from '../../ApiService';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import FindInPageRoundedIcon from '@mui/icons-material/FindInPageRounded';


class savingsList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            savingss: [
                {
                    jNo: 1, jName: "적금상품1",jRegistrationDate: "2023-10-09", interestRate: 3, jSummary: "상품설명",
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
                    jNo: 7, jName: "적금상품7", jRegistrationDate: "2023-10-09", interestRate: 3, jSummary: "상품설명",
                    jType: "자동납부", jMinPrice: 500000, jMaxPrice: 50000000, jMinDate: 3, jMaxDate: 36
                },
                {
                    jNo: 8, jName: "적금상품8", jRegistrationDate: "2023-10-09", interestRate: 3, jSummary: "상품설명",
                    jType: "자동납부", jMinPrice: 500000, jMaxPrice: 50000000, jMinDate: 3, jMaxDate: 36
                },
                {
                    jNo: 9, jName: "적금상품9", jRegistrationDate: "2023-10-09", interestRate: 3, jSummary: "상품설명",
                    jType: "자동납부", jMinPrice: 500000, jMaxPrice: 50000000, jMinDate: 3, jMaxDate: 36
                },
                {
                    jNo: 10, jName: "적금상품10", jRegistrationDate: "2023-10-09", interestRate: 3, jSummary: "상품설명",
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
        ApiService.fetchsavingssPL()
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

    // 1건 select
    selectsavings = (jNo) => {
        window.localStorage.setItem("jNo", jNo);
        this.props.history.push("/savingsDetail")
    }

    // sign
    signsavings = (jNo) => {
        window.localStorage.setItem("jNo", jNo);
        this.props.history.push("/savingsSign")
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
                <Typography variant="h4" style={style}> savings Product </Typography>

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
                            {this.state.savingss.slice(page * rPage, page * 
                            rPage + rPage).map((savings) => (
                                <TableRow hover key={savings.jNo}>
                                    <TableCell align='center'>{savings.jNo}</TableCell>
                                    <TableCell align='center'>{savings.jName}</TableCell>
                                    <TableCell align='center'>{savings.jSummary}</TableCell>
                                    <TableCell align='center'>{savings.interestRate}%</TableCell>
                                    <TableCell align='center'>
                                        <FindInPageRoundedIcon fontSize='large' color='primary' onClick={() => this.selectsavings(savings.jNo)}/>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <EditNoteOutlinedIcon fontSize='large' onClick={() => this.signsavings(savings.jNo)}/>
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



export default savingsList;