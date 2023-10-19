import React, { Component } from 'react';
import { Button, Typography, Container, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import savings from '../../../api/savings';
import { Create, Delete } from '@mui/icons-material'
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

class savingsProductList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            savingss: [ ],
            message: null,
            page: 0,
            rPage: 5,
            searchQuery: '', // 검색어를 저장할 상태 변수
        }
    }

    // 라이프사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 렌더링
    componentDidMount() {
        this.loadsavingsProductList();
    }

    // list 정보
    loadsavingsProductList = () => {       
        savings.fetchsavingss()
            .then(res => {
                this.setState({
                    savingss: res.data
                })
            })
            .catch(err => {
                console.log('loadsavingsProductList() Error!!', err);
            })      
    }

    // insert
    addSavings = () => {
        window.localStorage.removeItem("SavingsNum");
        this.props.history.push("/SavingsProductAdd");
    }

    // update
    editSavings = (juckNo) => {
        window.localStorage.setItem("SavingsNum", juckNo);
        this.props.history.push("/SavingsProductEdit")
    }

    // delete
    deleteSavings = (juckNo) => {

         // 사용자에게 삭제 확인을 물어보고 확인을 선택한 경우에만 삭제를 실행
         const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");

         if (confirmDelete) {
            savings.deleteSavings(juckNo)
            .then(res => {
                this.setState({
                    savingss: this.state.savingss.filter(savings => savings.juckNo !== juckNo)
                });
                console.log('delete 성공 : ', res.data);
            })
            .catch(err => {
                console.log('deleteSavings() Error!!', err);
            })
        } else {
            // 사용자가 확인 대화 상자에서 "취소"를 선택한 경우 아무 작업도 수행하지 않음
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
                     {/* 검색기능 */}
                     <div>
                     <Button variant="contained" style={btn} color="primary" onClick={this.addSavings}> Add Product </Button>
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
                            {this.state.savingss.filter((savings) =>
                                savings.juckName.toLowerCase().includes(this.state.searchQuery.toLowerCase())
                            ).slice(page * rPage, page *
                                rPage + rPage).map((savings) => (
                                <TableRow hover key={savings.juckNo}>
                                    <TableCell align='center'>{savings.juckNo}</TableCell>
                                    <TableCell align='center'>{savings.juckName}</TableCell>
                                    <TableCell align='center'>{savings.interestRate}%</TableCell>
                                    <TableCell align='center'><button className="btn" onClick={() => this.editSavings(savings.juckNo)}><Create /></button></TableCell>
                                    <TableCell align='center'><button className="btn" onClick={() => this.deleteSavings(savings.juckNo)}><Delete /></button></TableCell>
                                    <TableCell align='center'>{new Date(savings.juckRegistrationDate).toLocaleDateString(
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

export default savingsProductList;