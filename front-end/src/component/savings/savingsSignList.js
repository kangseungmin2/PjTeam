import React, { Component } from 'react';
import { Typography, Container, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import SavingsSignApi from "../../api/savingSign";
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import PaymentsIcon from '@mui/icons-material/Payments';



class savingsSignList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            signs: [],       
            id: window.localStorage.getItem("id"),
            juckSignNo: '',
            rate: '',
            message: null,
            page: 0,
            rPage: 5,
            isModalOpen: false,
            selectedLoan: null,
            juckState: '',
            
        }
    }

    // 라이프사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 렌더링
    componentDidMount() {
        this.loadSavingsSignConfirmList();
    }

    // list 정보
    loadSavingsSignConfirmList = () => {
        const id = window.localStorage.getItem("id")
        SavingsSignApi.fetchSignConfirms(id)
            .then((res) => {
                this.setState({
                    signs: res.data
                })
            })
            .catch(err => {
                console.log('loadSavingsSignConfirmList() Error!!', err);
            })
    }
   

     // 1건 select
     selectSavings = (juckSignNo) => {
        window.localStorage.setItem("juckSignNo", juckSignNo);
        this.props.history.push("/savingsPay")
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

    // 해지 버튼 클릭
    savingsEnd = (num,juckSignNo) => {
        window.localStorage.setItem("num", num);
        window.localStorage.setItem("juckSignNo", juckSignNo);
        this.props.history.push("/savingsendDetail")
    }


    render() {
        const { page } = this.state;
        const { rPage } = this.state;


        return (

            <Container component="main" maxWidth="md">
              
                <Typography variant="h5" style={style}> Savings </Typography>

                <TableContainer >

                    <Table md={{ minWidth: 900 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" width="30">No.</TableCell>
                                <TableCell align="center" width="240">상품명</TableCell>
                                <TableCell align="center" width="140">잔액</TableCell>
                                <TableCell align="center" width="120">계좌번호</TableCell>
                                <TableCell align="center" width="140">실행일</TableCell>
                                <TableCell align="center" width="140">만기일</TableCell>
                                <TableCell align="center" width="80">상태</TableCell>
                                <TableCell align="center" width="120">해지</TableCell>
                                <TableCell align="center" width="100">납부</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {this.state.signs.slice(page * rPage, page *
                                rPage + rPage).map((sign) => (
                                    <TableRow hover key={sign.juckSignNo}>
                                        <TableCell align='center'>{sign.juckSignNo}</TableCell>
                                        <TableCell align='center'>
                                            <MDBAccordion>
                                                <MDBAccordionItem collapseId={sign.juckSignNo} headerTitle={<>{sign.juckName}</>}>
                                                    <p>금리 : {sign.interestRate}%</p>                 
                                                </MDBAccordionItem>
                                            </MDBAccordion>
                                        </TableCell>
                                        <TableCell align='center'>{sign.juckBalance}원</TableCell>
                                        <TableCell align='center'>{sign.savingsAccountNum}</TableCell>
                                        <TableCell align='center'>
                                            {new Date(sign.juckJoinDate).toLocaleDateString(
                                                'ko-KR', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit'
                                            })}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {new Date(sign.juckEndDate).toLocaleDateString(
                                                'ko-KR', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit'
                                            })}
                                        </TableCell>
                                        <TableCell align='center' style={{ color: sign.juckState === '신청' ? 'blue' : sign.juckState === '해지' || sign.juckState === '반려' ? 'red' : 'black' }}>
                                            {sign.juckState}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {sign.juckState === '정상' ? (
                                                <DoDisturbOnIcon onClick={() => this.savingsEnd(sign.num, sign.juckSignNo)} />
                                            ) : sign.juckState === '해지' ? (
                                                new Date(sign.juckCancelDate).toLocaleDateString('ko-KR', {
                                                    year: 'numeric',
                                                    month: '2-digit',
                                                    day: '2-digit'
                                                })
                                            ) : null}
                                        </TableCell>

                                        <TableCell align='center'>
                                        {this.state.juckState !== '해지' && <PaymentsIcon onClick={() => this.selectSavings(sign.juckSignNo)} />}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={this.state.signs.length}
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

export default savingsSignList;