import React, { Component } from 'react';
import { Button, Typography, Container, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import API from "../../../api/transferAuto";
import { Create, Delete } from '@mui/icons-material'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

class adminTransfer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            trans: [],
            message: null,
            page: 0,
            rPage: 5,
            searchQuery: '', // 검색어를 저장할 상태 변수
        }
    }

    // 라이프사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 렌더링
    componentDidMount() {
        this.loadAdminTransfer();
    }

    // list 정보
    loadAdminTransfer = () => {
        API.adminTransfer()
            .then(res => {
                this.setState({
                    trans: res.data
                })
            })
            .catch(err => {
                console.log('loadAdminTransfer() Error!!', err);
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


    render() {
        const { page } = this.state;
        const { rPage } = this.state;


        return (

            <Container component="main" maxWidth="md">

                <CurrencyExchangeIcon fontSize='large' color='primary' />
                <Typography variant="h4" style={style}> 고객별 이체 목록 </Typography>

                <TableContainer >
                    {/* 검색기능 */}
                    <div style={search}>
                        <div style={searchIcon}>
                            <SearchRoundedIcon fontSize='large' color='action' />
                        </div>
                        <input style={searchInput}
                            type="text"
                            placeholder="고객아이디 검색"
                            value={this.state.searchQuery}
                            onChange={(e) => this.setState({ searchQuery: e.target.value })}
                        />
                    </div>
                    <Table md={{ minWidth: 900 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" width="100">No.</TableCell>
                                <TableCell align="center" width="100">고객ID</TableCell>
                                <TableCell align="center" width="100">수취인</TableCell>
                                <TableCell align="center" width="100">수취은행</TableCell>
                                <TableCell align="center" width="180">수취계좌번호</TableCell>
                                <TableCell align="center" width="150">금액</TableCell>
                                <TableCell align="center" width="150">이체일자</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {this.state.trans.filter((tran) =>
                                tran.id.toLowerCase().includes(this.state.searchQuery.toLowerCase())
                            ).slice(page * rPage, page *
                                rPage + rPage).map((tran) => (
                                    <TableRow hover key={tran.transferNum}>
                                        <TableCell align='center'>{tran.transferNum}</TableCell>
                                        <TableCell align='center'>{tran.id}</TableCell>
                                        <TableCell align='center'>{tran.trName}</TableCell>
                                        <TableCell align='center'>{tran.trbank}</TableCell>
                                        <TableCell align='center'>{tran.trAccountNum}</TableCell>
                                        <TableCell align='center'>{tran.trAmount}</TableCell>
                                        <TableCell align='center'>
                                            {new Date(tran.trDate).toLocaleDateString(
                                                'ko-KR', {
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
                    count={this.state.trans.length}
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


export default adminTransfer;