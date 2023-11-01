import React, { Component } from 'react';
import { Typography, Container, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import DepositSignApi from "../../api/depositSign";
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';
import LaunchIcon from '@mui/icons-material/Launch';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';


class depositSignList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            signs: [],
            repayments: [],
            id: window.localStorage.getItem("id"),
            yeSignNo: '',
            rate: '',
            message: null,
            page: 0,
            rPage: 5,
            isModalOpen: false,
            selectedLoan: null,
            yeCancelDate: ''
        }
    }

    // 라이프사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 렌더링
    componentDidMount() {
        this.loadDepositSignConfirmList();
    }

    // list 정보
    loadDepositSignConfirmList = () => {
        const id = window.localStorage.getItem("id")
        DepositSignApi.fetchSignConfirms(id)
            .then((res) => {
                this.setState({
                    signs: res.data
                })
            })
            .catch(err => {
                console.log('loadDepositSignConfirmList() Error!!', err);
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

    // 해지 버튼 클릭
    depositEnd = (num,yeSignNo) => {
        window.localStorage.setItem("num", num);
        window.localStorage.setItem("yeSignNo", yeSignNo);
        this.props.history.push("/depositendDetail")
    }


    render() {
        const { page } = this.state;
        const { rPage } = this.state;


        return (
          <div>
            <Container component="main" maxWidth="md">
                <PaidOutlinedIcon fontSize='large' color='primary' />
                <Typography variant="h4" style={style}> Sign Confirm </Typography>
                <br/><br/>
                <Typography variant="h5" style={style}> Deposit </Typography>
                <TableContainer >

                    <Table md={{ minWidth: 900 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" width="30">No.</TableCell>
                                <TableCell align="center" width="240">상품명</TableCell>
                                <TableCell align="center" width="140">원금</TableCell>
                                <TableCell align="center" width="120">계좌번호</TableCell>
                                <TableCell align="center" width="140">실행일</TableCell>
                                <TableCell align="center" width="140">만기일</TableCell>
                                <TableCell align="center" width="80">상태</TableCell>
                                <TableCell align="center" width="120">해지</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {this.state.signs.slice(page * rPage, page *
                                rPage + rPage).map((sign) => (
                                    <TableRow hover key={sign.yeSignNo}>
                                        <TableCell align='center'>{sign.yeSignNo}</TableCell>
                                        <TableCell align='center'>
                                            <MDBAccordion>
                                                <MDBAccordionItem collapseId={sign.yeSignNo} headerTitle={<>{sign.yeName}</>}>
                                                    <p>금리 : {sign.interestRate}%</p>
                                                   
                                                </MDBAccordionItem>
                                            </MDBAccordion>
                                        </TableCell>
                                        <TableCell align='center'>{sign.yeAmount}원</TableCell>
                                        <TableCell align='center'>{sign.depositAccountNum}</TableCell>
                                        <TableCell align='center'>
                                            {new Date(sign.yeJoinDate).toLocaleDateString(
                                                'ko-KR', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit'
                                            })}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {new Date(sign.yeEndDate).toLocaleDateString(
                                                'ko-KR', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit'
                                            })}
                                        </TableCell>
                                        <TableCell align='center' style={{ color: sign.yeState === '신청' ? 'blue' : sign.yeState === '해지' || sign.yeState === '반려' ? 'red' : 'black' }}>
                                            {sign.yeState}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {sign.yeState === '정상' ? (
                                                <DoDisturbOnIcon onClick={() => this.depositEnd(sign.num, sign.yeSignNo)} />
                                            ) : sign.yeState === '해지' ? (
                                                new Date(sign.yeCancelDate).toLocaleDateString('ko-KR', {
                                                    year: 'numeric',
                                                    month: '2-digit',
                                                    day: '2-digit'
                                                })
                                            ) : null}
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
           
          </div>
        );
    }
}

const style = {
    display: 'flex',
    justifyContent: 'center'
}

export default depositSignList;