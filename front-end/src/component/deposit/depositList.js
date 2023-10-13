import React, { Component } from 'react';
import { Typography, Container, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import ApiService from '../../api/deposit';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import FindInPageRoundedIcon from '@mui/icons-material/FindInPageRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

class depositList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            deposits: [ ],
            message: null,
            page: 0,
            rPage: 5,
            searchQuery: '', // 검색어를 저장할 상태 변수
           
        }
    }

    // 라이프사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 렌더링
    componentDidMount() {
        this.loadDepositProductList();
    }

    // list 정보
    loadDepositProductList = () => {     
        ApiService.fetchdepositsPL()
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

    // 1건 select
    selectDeposit = (yNo) => {
        window.localStorage.setItem("DepositNum", yNo);
        this.props.history.push("/DepositDetail")
    }

    // sign
    signDeposit = (yNo) => {
        window.localStorage.setItem("DepositNum", yNo);
        this.props.history.push("/DepositSign")
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
                <Typography variant="h4" style={style}> deposit Product </Typography>

                <TableContainer >
                     {/* 검색기능 */}
                     <div style={search}>
                        <div style={searchIcon}>
                            <SearchRoundedIcon fontSize='large' color='action' />
                        </div>
                        <input style={searchInput}
                            type="text"
                            placeholder="상품명 검색"
                            value={this.state.searchQuery}
                            onChange={(e) => this.setState({ searchQuery: e.target.value })}
                        />
                    </div>
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
                            {this.state.deposits.filter((loan) =>
                                loan.loanProductName.toLowerCase().includes(this.state.searchQuery.toLowerCase())
                            ).slice(page * rPage, page *
                                rPage + rPage).map((deposit) => (
                                <TableRow hover key={deposit.yNo}>
                                    <TableCell align='center'>{deposit.yNo}</TableCell>
                                    <TableCell align='center'>{deposit.yName}</TableCell>
                                    <TableCell align='center'>{deposit.ySummary}</TableCell>
                                    <TableCell align='center'>{deposit.interestRate}%</TableCell>
                                    <TableCell align='center'>
                                        <FindInPageRoundedIcon fontSize='large' color='primary' onClick={() => this.selectDeposit(deposit.yNo)}/>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <EditNoteOutlinedIcon fontSize='large' onClick={() => this.signDeposit(deposit.yNo)}/>
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
const search = {
    display: 'flex',
    justifyContent: 'right',
}
const searchIcon = {
    display: 'flex',
    alignItems: 'center',
}

const searchInput = {
    width: '300px',
    height: '30px',
    margin: '20px 0 10px 0',
    border: '1px solid rgba(224, 224, 224, 1)'
}


export default depositList;