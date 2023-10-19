import React, { Component } from 'react';
import { Typography, Container, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import ApiService from '../../api/savings';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import FindInPageRoundedIcon from '@mui/icons-material/FindInPageRounded';
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';


class savingsList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            savingss: [],
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
    selectsavings = (juckNo) => {
        window.localStorage.setItem("SavingsNum", juckNo);
        this.props.history.push("/savingsDetail")
    }

    // sign
    signsavings = (juckNo) => {
        window.localStorage.setItem("SavingsNum", juckNo);
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
                            {this.state.savingss.filter((savings) =>
                                savings.juckName.toLowerCase().includes(this.state.searchQuery.toLowerCase())
                            ).slice(page * rPage, page *
                                rPage + rPage).map((savings) => (
                                <TableRow hover key={savings.juckNo}>
                                    <TableCell align='center'>{savings.juckNo}</TableCell>
                                    <TableCell align='center'>{savings.juckName}</TableCell>
                                    <TableCell align='center'>{savings.juckSummary}</TableCell>
                                    <TableCell align='center'>{savings.interestRate}%</TableCell>
                                    <TableCell align='center'>
                                        <FindInPageRoundedIcon fontSize='large' color='primary' onClick={() => this.selectsavings(savings.juckNo)}/>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <EditNoteOutlinedIcon fontSize='large' onClick={() => this.signsavings(savings.juckNo)}/>
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


export default savingsList;