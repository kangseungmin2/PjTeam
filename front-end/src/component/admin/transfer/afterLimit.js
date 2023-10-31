import React, { Component } from 'react';
import { Button, Typography, Container, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import API from "../../../api/transferAuto";
import { Create, Delete } from '@mui/icons-material'
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';

function Unix_timestamp(t){
    const date = new Date(t); //date객체는 UTC로부터 지난시간을 밀리초로 나타내는 UNIX 타임스탬프를 담는다.(밀리초를 초로 변환하려면 *1000)
  	//console.log(date) //2023-02-28T05:36:35.000Z 출력됨
   const year = date.getFullYear(); //년도 구하기
    const month = "0" + (date.getMonth()+1);
    const day = "0" + date.getDate();
    const hour = "0" + date.getHours();
    const minute = "0" + date.getMinutes();
    const second = "0" + date.getSeconds();
    return year + "-" + month.substr(-2) + "-" + day.substr(-2);
}

class afterLimit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            limits: [],
            message: null,
            page: 0,
            rPage: 5
        }
    }

    // 라이프사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 렌더링
    componentDidMount() {
        this.transferLimit();
    }

    // list 정보
    transferLimit = () => {
        API.afterLimit()
            .then(res => {
                this.setState({
                    limits: res.data
                })
            })
            .catch(err => {
                console.log('transferLimit() Error!!', err);
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

                <PaidOutlinedIcon fontSize='large' color='primary' />
                <Typography variant="h4" style={style}> 심사완료 목록 </Typography>

                <br/>
                <TableContainer >
                    <br/>
                    <Table md={{ minWidth: 900 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" width="50">No.</TableCell>
                                <TableCell align="center" width="100">고객아이디</TableCell>
                                <TableCell align="center" width="120">기존한도</TableCell>
                                <TableCell align="center" width="120">희망한도</TableCell>
                                <TableCell align="center" width="100">요청날짜</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {this.state.limits.slice(page * rPage, page *
                                rPage + rPage).map((limit) => (
                                    <TableRow hover key={limit.limitNum}>
                                        <TableCell align='center'>{limit.limitNum}</TableCell>
                                        <TableCell align='center'>{limit.id}</TableCell>
                                        <TableCell align='center'>{limit.accountLimit}원</TableCell>
                                        <TableCell align='center'>{limit.wantLimit}원</TableCell>
                                        <TableCell align='center'>{Unix_timestamp(limit.limitDate)}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={this.state.limits.length}
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

export default afterLimit;