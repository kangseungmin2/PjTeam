import React, { Component } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, Container , TableContainer, TablePagination } from '@mui/material';
import member from "../../../api/member";


class management extends Component{
    constructor(props) {
        super(props);
        this.state = {
            members: [],
            page: 0,
            rPage: 5,
            message: null
            // page: 0,
            // rPage:5
        }
    }

    componentDidMount() {
        this.memeberList();
    }

    memeberList = () => {
        //회원정보
        member.memberList()
            .then(res => {
                console.log('data', res.data);
                this.setState({
                    members: res.data,
                })

            })
            .catch(err => {
                console.log('memberList Errror', err)
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

    render() {
        const { page } = this.state;
        const { rPage } = this.state;
        
        return (
            <Container maxWidth="md">
                <br/><br/>
                <Typography variant="h4">회원 관리</Typography>

                <TableContainer >
                    <Table md={{ minWidth: 900 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center' style={{ color: 'navy' }}><b>이름</b></TableCell>
                                <TableCell align='center' style={{ color: 'navy' }}><b>아이디</b></TableCell>
                                <TableCell align='center' style={{ color: 'navy' }}><b>전화번호</b></TableCell>
                                <TableCell align='center' style={{ color: 'navy' }}><b>주소</b></TableCell>
                                <TableCell align='center' style={{ color: 'navy' }}><b>이메일</b></TableCell>
                                <TableCell align='center' style={{ color: 'navy' }}><b>회원상태</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.members.slice(page * rPage, page *
                            rPage + rPage).map(memberList =>
                                <TableRow key={memberList.id}>
                                    <TableCell component="th" scope="member">{memberList.name}</TableCell>
                                    <TableCell align='center'>{memberList.id}</TableCell>
                                    <TableCell align='center'>{memberList.hp}</TableCell>
                                    <TableCell align='center'>{memberList.address}</TableCell>
                                    <TableCell align='center'>{memberList.email}</TableCell>
                                    <TableCell align='center'>정상</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <br/><br/>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={this.state.members.length}
                    rowsPerPage={rPage}
                    page={page}
                    onPageChange={this.handleChangePage}
                    onRowsPerPageChange={this.handleChangeRowsPerPage}
                />
            </Container>
        );
    }
}


export default management;