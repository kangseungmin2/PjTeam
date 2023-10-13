import React, { Component } from 'react';
import { Typography, Container, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import ApiService from '../../ApiService';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';


class transferList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            trans: [
                {
                    num: 1, transType: "1건이체1", transAmount: 10000, transBalance: 100000, transDate: "2023-10-09", transDetail: "상세내용1"
                },
                {
                    num: 2, transType: "1건이체2", transAmount: 10000, transBalance: 90000, transDate: "2023-10-09", transDetail: "상세내용2"
                },
                {
                    num: 3, transType: "1건이체3", transAmount: 10000, transBalance: 80000, transDate: "2023-10-09", transDetail: "상세내용3"
                },
                {
                    num: 4, transType: "1건이체4", transAmount: 10000, transBalance: 70000, transDate: "2023-10-09", transDetail: "상세내용4"
                },
                {
                    num: 5, transType: "1건이체5", transAmount: 10000, transBalance: 60000, transDate: "2023-10-09", transDetail: "상세내용5"
                },
                {
                    num: 6, transType: "1건이체6", transAmount: 10000, transBalance: 50000, transDate: "2023-10-09", transDetail: "상세내용6"
                },
                {
                    num: 7, transType: "1건이체7", transAmount: 10000, transBalance: 40000, transDate: "2023-10-09", transDetail: "상세내용7"
                },
                {
                    num: 8, transType: "1건이체8", transAmount: 10000, transBalance: 30000, transDate: "2023-10-09", transDetail: "상세내용8"
                },
                {
                    num: 9, transType: "1건이체9", transAmount: 10000, transBalance: 20000, transDate: "2023-10-09", transDetail: "상세내용9"
                },
                {
                    num: 10, transType: "1건이체10", transAmount: 10000, transBalance: 10000, transDate: "2023-10-09", transDetail: "상세내용10"
                }
            ],
            message: null,
            page: 0,
            rPage: 5
        }
    }

    // 라이프사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 렌더링
    componentDidMount() {
        this.loadtransList();
    }

    // list 정보
    loadtransList = () => {
        console.log("T.T", this.state)
        ApiService.fetchTransPL()
            .then(res => {
                this.setState({
                    trans: res.data
                })
            })
            .catch(err => {

                console.log('loadtransList() Error!!', err);
            })
        console.log(this.state.trans)
    }

    // 1건 selects
    selectTransfer = (num) => {
        window.localStorage.setItem("TranNum", num);
        this.props.history.push("/transferDetail")
    }

    // check
    checkTran = (num) => {
        window.localStorage.setItem("TranNum", num);
        this.props.history.push("/checkTran")
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
                <Typography variant="h4" style={style}> 이체목록 </Typography>

                <TableContainer >
                    <Table md={{ minWidth: 900 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" width="50">No.</TableCell>
                                <TableCell align="center" width="200">이체명</TableCell>
                                <TableCell align="center" width="150">금액</TableCell>
                                <TableCell align="center" width="150">잔액</TableCell>
                                <TableCell align="center" width="100">이체일자</TableCell>
                                <TableCell align="center" width="50">상세</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {this.state.trans.slice(page * rPage, page * 
                            rPage + rPage).map((tran) => (
                                <TableRow hover key={tran.num}>
                                    <TableCell align='center'>{tran.num}</TableCell> 
                                    <TableCell align='center'>{tran.transType}</TableCell>
                                    <TableCell align='center'>{tran.transAmount}원</TableCell>
                                    <TableCell align='center'>{tran.transBalance}원</TableCell>
                                    <TableCell align='center'>{tran.transDate}</TableCell>
                                    <TableCell align='center'>
                                        <EditNoteOutlinedIcon fontSize='large' onClick={() => this.checkTran(tran.num)}/>
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



export default transferList;