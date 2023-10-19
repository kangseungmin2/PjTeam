import React, { Component } from 'react';
import { Button, Typography, Container, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import deposit from '../../../api/deposit';
import { Create, Delete } from '@mui/icons-material'
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

class depositProductList extends Component {

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
        deposit.fetchdeposits()
            .then(res => {
                this.setState({
                    deposits: res.data
                })
            })
            .catch(err => {
                console.log('loadDepositProductList() Error!!', err);
            })
        //console.log(this.state.deposits)
    }

    // insert
    addDeposit = () => {
        window.localStorage.removeItem("DepositNum");
        this.props.history.push("/DepositProductAdd");
    }

    // update
    editDeposit = (yeNo) => {
        window.localStorage.setItem("DepositNum", yeNo);
        this.props.history.push("/DepositProductEdit")
    }

    // delete
    deleteDeposit = (yeNo) => {
         
        const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
        if (confirmDelete) {
            deposit.deleteDeposit(yeNo)
            .then(res => {
                this.setState({
                    deposits: this.state.deposits.filter(deposit => deposit.yeNo !== yeNo)
                });
                console.log('delete 성공 : ', res.data);
            })
            .catch(err => {
                console.log('deleteDeposit() Error!!', err);
            })
        }else {
            console.log('삭제가 취소되었습니다.');
        }    
    }

    // page
    handleChangePage = (event,newpage) => { 
        this.setState({ page: newpage });
    } 
   
    // rowPage
    handleChangeRowsPerPage = (event) => { 
        this.setState({ rPage: parseInt(event.target.value, 10) });
        this.setState({ page: 0 }); 
    } 


    render() {
        const { page } = this.state;
        const { rPage } = this.state;
        

        return (

            <Container component="main" maxWidth="md">

                <PaidOutlinedIcon fontSize='large' color='primary' />
                <Typography variant="h4" style={style}> Deposit Product </Typography>

                <TableContainer >
                     {/* 검색기능 */}
                     <div>
                     <Button variant="contained" style={btn} color="primary" onClick={this.addDeposit}> Add Product </Button>
                    </div>
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
                                <TableCell align="center" width="100">No.</TableCell>
                                <TableCell align="center" width="400">상품명</TableCell>
                                <TableCell align="center" width="100">금리</TableCell>
                                <TableCell align="center" width="100">상품수정</TableCell>
                                <TableCell align="center" width="100">상품삭제</TableCell>
                                <TableCell align="center" width="150">등록일</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {this.state.deposits.filter((deposit) =>
                                deposit.yeName.toLowerCase().includes(this.state.searchQuery.toLowerCase())
                            ).slice(page * rPage, page *
                                rPage + rPage).map((deposit) => (
                                <TableRow hover key={deposit.yeNo}>
                                    <TableCell align='center'>{deposit.yeNo}</TableCell>
                                    <TableCell align='center'>{deposit.yeName}</TableCell>
                                    <TableCell align='center'>{deposit.interestRate}%</TableCell>
                                    <TableCell align='center'><button className="btn" onClick={() => this.editDeposit(deposit.yeNo)}><Create /></button></TableCell>
                                    <TableCell align='center'><button className="btn" onClick={() => this.deleteDeposit(deposit.yeNo)}><Delete /></button></TableCell>
                                    <TableCell align='center'> {new Date(deposit.yeRegistrationDate).toLocaleDateString(
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

export default depositProductList;