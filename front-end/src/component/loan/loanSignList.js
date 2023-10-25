import React, { Component } from 'react';
import { Typography, Container, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import LoanSignApi from "../../api/loanSign";
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';
import LaunchIcon from '@mui/icons-material/Launch';
import LoanDetailModal from './loanDetailModal';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import Modal from 'react-modal';
import LoanSignConfrimApi from "../../api/loanSignConfirm";

class LoanSignList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            signs: [],
            repayments: [],
            id: window.localStorage.getItem("id"),
            loanNum: '',
            loanPeriod: '',
            message: null,
            page: 0,
            rPage: 5,
            isModalOpen: false,
            selectedLoan: null
        }
    }

    // 라이프사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 렌더링
    componentDidMount() {
        this.loadLoanSignConfirmList();
    }

    // list 정보
    loadLoanSignConfirmList = () => {
        const id = window.localStorage.getItem("id")
        LoanSignApi.fetchSignConfirms(id)
            .then((res) => {
                this.setState({
                    signs: res.data
                })
            })
            .catch(err => {
                console.log('loadLoanSignConfirmList() Error!!', err);
            })
    }
    // 대출 금액 리스트
    openModal = (loanNum) => {
        LoanSignConfrimApi.calRepayment(loanNum)
            .then((res) => {
                const repayments = res.data;
                this.setState({
                    isModalOpen: true,
                    selectedLoan: res.data,
                });
                console.log('대출금액리스트 : ', repayments)
                console.log('대출금액리스트 : ', this.state.selectedLoan)


            })
            .catch(err => {
                console.log('loadRepaymentList() Error!!', err);
            });
    };

    // 모달 닫기
    closeModal = () => {
        this.setState({
            isModalOpen: false,
            selectedLoan: null,
        });
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
    loanEnd = (num,loanNum) => {
        window.localStorage.setItem("num", num);
        window.localStorage.setItem("loanNum", loanNum);
        this.props.history.push("/endDetail")
    }


    render() {
        const { page } = this.state;
        const { rPage } = this.state;


        return (

            <Container component="main" maxWidth="md">
                <PaidOutlinedIcon fontSize='large' color='primary' />
                <Typography variant="h4" style={style}> Sign Confirm </Typography>

                <TableContainer >

                    <Table md={{ minWidth: 900 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" width="30">No.</TableCell>
                                <TableCell align="center" width="240">상품명</TableCell>
                                <TableCell align="center" width="140">대출원금</TableCell>
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
                                    <TableRow hover key={sign.loanNum}>
                                        <TableCell align='center'>{sign.loanNum}</TableCell>
                                        <TableCell align='center'>
                                            <MDBAccordion>
                                                <MDBAccordionItem collapseId={sign.loanNum} headerTitle={<>{sign.loanProductName}</>}>
                                                    <p>금리 : {sign.interestRate}%</p>
                                                    <p>상환방법 : {sign.repayment}</p>
                                                </MDBAccordionItem>
                                            </MDBAccordion>
                                        </TableCell>
                                        <TableCell align='center'>{sign.loanAmount}원<LaunchIcon onClick={() => this.openModal(sign.loanNum)} /></TableCell>
                                        <TableCell align='center'>{sign.loanAccountNum}</TableCell>
                                        <TableCell align='center'>
                                            {new Date(sign.loanExecution).toLocaleDateString(
                                                'ko-KR', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit'
                                            })}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {new Date(sign.loanExpiration).toLocaleDateString(
                                                'ko-KR', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit'
                                            })}
                                        </TableCell>
                                        <TableCell align='center' style={{ color: sign.loanState === '신청' ? 'blue' : sign.loanState === '해지' || sign.loanState === '반려' ? 'red' : 'black' }}>
                                            {sign.loanState}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {sign.loanState === '정상' ? (
                                                <DoDisturbOnIcon onClick={() => this.loanEnd(sign.num, sign.loanNum)} />
                                            ) : sign.loanState === '해지' ? (
                                                new Date(sign.loanTermination).toLocaleDateString('ko-KR', {
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
                {/* 모달 */}
                <Modal isOpen={this.state.isModalOpen} onRequestClose={this.closeModal}>
                    <LoanDetailModal
                        isModalOpen={this.state.isModalOpen}
                        selectedLoan={this.state.selectedLoan}
                        onClose={this.closeModal}
                    />
                </Modal>
            </Container>

        );
    }
}

const style = {
    display: 'flex',
    justifyContent: 'center'
}

export default LoanSignList;